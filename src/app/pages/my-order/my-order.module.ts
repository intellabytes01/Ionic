import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyOrderPage } from './my-order.page';
import { StoreModule } from '@ngrx/store';

import * as fromMyOrderReducer from './store/myOrder.reducers';
import { EffectsModule } from '@ngrx/effects';
import { MyOrderEffects } from './store/myOrder.effects';
import { TranslateModule } from '@ngx-translate/core';
import { OrderFilterModalPageModule } from './order-filter-modal/order-filter-modal.module';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: MyOrderPage
  },
  {
    path: 'my-order-details',
    loadChildren:
      './my-order-details/my-order-details.module#MyOrderDetailsPageModule',
    data: { title: 'My Order Details', preload: false, delay: true }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('myOrder', fromMyOrderReducer.myOrderReducer),
    EffectsModule.forRoot([MyOrderEffects]),
    TranslateModule,
    OrderFilterModalPageModule,
    SharedModule
  ],
  declarations: [MyOrderPage]
})
export class MyOrderPageModule {}
