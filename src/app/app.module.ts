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
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppPreloadingStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
