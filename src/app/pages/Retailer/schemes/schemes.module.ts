import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SchemesPage } from './schemes.page';
import { SharedModule } from '@app-shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SchemeEffects } from './store/schemes.effects';
import * as schemesReducer from './store/schemes.reducers';
import { SchemeService } from './schemes.service';

const routes: Routes = [
  {
    path: '',
    component: SchemesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    StoreModule.forFeature('scheme', schemesReducer.schemeReducer),
    EffectsModule.forRoot([SchemeEffects])
  ],
  declarations: [SchemesPage],
  providers: [SchemeService]
})
export class SchemesPageModule {}
