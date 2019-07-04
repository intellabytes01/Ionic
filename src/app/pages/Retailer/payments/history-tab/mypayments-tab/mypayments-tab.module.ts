import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MypaymentsTabPage } from './mypayments-tab.page';
import { SharedModule } from '@app-shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentFilterModalPageModule } from './payment-filter-modal/payment-filter-modal.module';

const routes: Routes = [
  {
    path: '',
    component: MypaymentsTabPage
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
    PaymentFilterModalPageModule
  ],
  declarations: [MypaymentsTabPage]
})
export class MypaymentsTabPageModule {}
