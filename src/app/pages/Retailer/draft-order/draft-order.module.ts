import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DraftOrderPage } from './draft-order.page';
import { SharedModule } from '@app-shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DraftOrderPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab/draft'
      },
      {
        path: 'tab/draft',
        loadChildren:
          './draft-tab/draft-tab.module#DraftTabPageModule',
          data: { title: 'Draft Order', preload: true, delay: false }
      },
      {
        path: 'tab/confirmed',
        loadChildren:
          './confirmed-tab/confirmed-tab.module#ConfirmedTabPageModule',
          data: { title: 'Draft Order', preload: true, delay: false }
      },
      {
        path: 'tab/deleted',
        loadChildren:
          './deleted-tab/deleted-tab.module#DeletedTabPageModule',
          data: { title: 'Draft Order', preload: true, delay: false }
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
    DraftOrderPage
  ]
})
export class DraftOrderPageModule {}
