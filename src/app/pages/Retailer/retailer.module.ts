import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RetailerPage } from './retailer.page';
import { SharedModule } from '@app/shared';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: RetailerPage,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab/request'
      },
      {
        path: 'tab/add',
        loadChildren:
          './add-distributor/add-distributor.module#AddDistributorPageModule',
        data: { title: 'Add Distributor', preload: false, delay: true }
      },
      {
        path: 'tab/request',
        loadChildren:
          './request-distributor/request-distributor.module#RequestDistributorPageModule',
        data: { title: 'Add Distributor', preload: true, delay: false }
      },
      {
        path: 'tab/status',
        loadChildren:
          './status-distributor/status-distributor.module#StatusDistributorPageModule',
        data: { title: 'Add Distributor', preload: false  , delay: true }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RetailerPage]
})
export class RetailerPageModule {}
