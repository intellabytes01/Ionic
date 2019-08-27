import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { environment } from '@env/environment';
import { merge } from 'rxjs';
import { filter, map, mergeMap, startWith, delay, tap } from 'rxjs/operators';
import { Logger, I18nService, untilDestroyed } from './core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxPermissionsService } from 'ngx-permissions';
import {
  SaveToken,
  TokenRefresh
} from './core/authentication/actions/auth.actions';
import { AuthState, selectAuthState } from './core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { TopLoaderService } from './shared/top-loader/top-loader.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import * as JWT from 'jwt-decode';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string;
  norecord: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private permissionsService: NgxPermissionsService,
    private store: Store<AuthState>,
    private oneSignal: OneSignal,
    private platform: Platform,
    private topLoaderService: TopLoaderService,
    public router: Router,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    if (this.platform.is('cordova')) {
      this.pushSetup();
    }

    // log.debug('init');

    // Setup translations
    this.i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages
    );

    const perm = ['VIEW'];
    this.permissionsService.loadPermissions(perm);

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        untilDestroyed(this)
      )
      .subscribe(event => {
        const title = event.title;
        if (title) {
          this.title = title;
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });

    this.router.events.subscribe(val => {
      this.topLoaderService.norecord.next(false);
    }, untilDestroyed(this));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.store.dispatch(new SaveToken());
    this.tokenExpiryCheck();
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  pushSetup() {
    this.oneSignal.startInit(
      '8c0d9b5c-ba78-4feb-a240-f708199f111a',
      '843743278051'
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.getIds().then(data => console.log(data));

    this.oneSignal.endInit();
  }

  ngAfterViewInit() {
    this.topLoaderService.norecord
      .pipe(
        // tslint:disable-next-line: deprecation
        startWith(null),
        delay(0),
        tap(value => (this.norecord = value))
      )
      .subscribe();
  }

  tokenExpiryCheck() {
    this.store
      .pipe(
        select(selectAuthState),
        untilDestroyed(this)
      )
      .subscribe(data => {
        if (
          data['userData'] &&
          data['userData']['token'] &&
          data['userData']['token']['token']
        ) {
          const decoded = JWT(data['userData']['token']['token']);

          // Unix Timestamp
          const currentTime = Math.round(new Date().getTime() / 1000);
          console.log(decoded['exp'] - currentTime);
          // Refresh token if expired otherwise refresh after expiry time
          if (decoded['exp'] <= currentTime) {
            this.store.dispatch(new TokenRefresh());
          } else {
            setTimeout(() => {
              this.tokenExpiryCheck();
            }, (decoded['exp'] - currentTime) * 1000);
          }
        }
      });
  }
}
