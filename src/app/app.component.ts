import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '@env/environment';
import { merge } from 'rxjs';
import { filter, map, mergeMap, startWith, delay, tap } from 'rxjs/operators';
import {
  Logger,
  I18nService,
  untilDestroyed,
  AuthenticationService
} from './core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxPermissionsService } from 'ngx-permissions';
import { Storage } from '@ionic/storage';
import { SaveToken } from './core/authentication/actions/auth.actions';
import { AuthState } from './core/authentication/auth.states';
import { Store } from '@ngrx/store';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { TopLoaderService } from './shared/top-loader/top-loader.service';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;
  norecord: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private permissionsService: NgxPermissionsService,
    private storage: Storage,
    private authService: AuthenticationService,
    private store: Store<AuthState>,
    private oneSignal: OneSignal,
    private platform: Platform,
    private topLoaderService: TopLoaderService,
    public router: Router
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

    const perm = ['ADMIN'];
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

      this.router.events.subscribe((val)=>{
        this.topLoaderService.norecord.next(false);
      },
      untilDestroyed(this))
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });

    this.store.dispatch(new SaveToken());
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

    this.oneSignal.endInit();
  }

  ngAfterViewInit() {
    this.topLoaderService.norecord
        .pipe(
            startWith(null),
            delay(0),
            tap((value) => this.norecord = value)
        ).subscribe();
  }
  
}
