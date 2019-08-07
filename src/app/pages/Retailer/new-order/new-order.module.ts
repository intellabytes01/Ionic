import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewOrderPage } from './new-order.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { SimilarProductsModalPageModule } from './similar-products-modal/similar-products-modal.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NewOrderEffects } from './store/new-order.effects';
import * as newOrderReducer from './store/new-order.reducers'
import { NewOrderService } from './new-order.service';

const routes: Routes = [
  {
    path: '',
    component: NewOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    SharedModule,
    SimilarProductsModalPageModule,
    StoreModule.forFeature('newOrder', newOrderReducer.newOrderReducer),
    EffectsModule.forRoot([NewOrderEffects])
  ],
  declarations: [NewOrderPage],
  providers: [NewOrderService]
})
export class NewOrderPageModule {}
