import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentsPage } from './payments.page';
import { SharedModule } from '@app-shared/shared.module';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPage,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab/pay later'
      },
      {
        path: 'tab/pay later',
        loadChildren:
          './paylater-tab/paylater-tab.module#PaylaterTabPageModule',
          data: { title: 'Payment', preload: true, delay: false }
      },
      {
        path: 'tab/make payment',
        loadChildren:
          './makepayment-tab/makepayment-tab.module#MakepaymentTabPageModule',
          data: { title: 'Payment', preload: true, delay: false }
      },
      {
        path: 'tab/history',
        loadChildren:
          './history-tab/history-tab.module#HistoryTabPageModule',
          data: { title: 'Payment', preload: true, delay: false }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    PaymentsPage
  ]
})
export class PaymentsPageModule {}
