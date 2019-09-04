import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ShellModule } from '@app/pages/shell/shell.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AuthEffects } from './core/authentication/effects/auth.effects';
import { authReducers } from './core/authentication/auth.states';
import { AppPreloadingStrategy } from './app-preloading.module';
import { Camera } from '@ionic-native/camera/ngx';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NoComponentPageModule } from './pages/no-component/no-component.module';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    CoreModule,
    SharedModule,
    ShellModule,
    StoreModule.forRoot(authReducers),
    IonicStorageModule.forRoot({
      name: '__prdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }),
    EffectsModule.forRoot([AuthEffects]),
    NgxPermissionsModule.forRoot(),
    NoComponentPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppPreloadingStrategy,
    Camera,
    NgxPermissionsService,
    OneSignal,
    InAppBrowser,
    Device,
    File,
    FirebaseAnalytics,
    EmailComposer,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
