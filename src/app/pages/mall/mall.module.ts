import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MallPage } from './mall.page';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MallEffects } from './store/mall.effects';
import * as frommallReducer from './store/mall.reducers';
import { MallService } from './mall.service';

const routes: Routes = [
  {
    path: '',
    component: MallPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('mall', frommallReducer.mallReducer),
    EffectsModule.forRoot([MallEffects])
  ],
  declarations: [MallPage],
  providers: [MallService]
})
export class MallPageModule {}
