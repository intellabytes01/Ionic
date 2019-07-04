import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryTabPage } from './history-tab.page';
import { SharedModule } from '@app-shared/shared.module';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: HistoryTabPage,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab/myoutstanding'
      },
      {
        path: 'tab/myoutstanding',
        loadChildren:
          './myoutstanding-tab/myoutstanding-tab.module#MyoutstandingTabPageModule',
          data: { title: 'Payment', preload: true, delay: false }
      },
      {
        path: 'tab/mypayments',
        loadChildren:
          './mypayments-tab/mypayments-tab.module#MypaymentsTabPageModule',
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
    HistoryTabPage
  ]
})
export class HistoryTabPageModule {}
