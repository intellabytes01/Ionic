import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '@env/environment';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Logger, I18nService, untilDestroyed, AuthenticationService } from './core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxPermissionsService } from 'ngx-permissions';
import { Storage } from '@ionic/storage';
import { SaveToken } from './core/authentication/actions/auth.actions';
import { AuthState } from './core/authentication/auth.states';
import { Store } from '@ngrx/store';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;
  // title$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private permissionsService: NgxPermissionsService,
    private storage: Storage,
    private authService: AuthenticationService,
    private store: Store<AuthState>
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
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
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
    this.storage.get('userData').then((data)=>{
      //this.store.dispatch(new SaveToken(JSON.parse(data)));
    })
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
