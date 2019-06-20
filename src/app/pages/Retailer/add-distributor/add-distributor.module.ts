import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddDistributorPage } from './add-distributor.page';
import { AuthenticationGuard } from '@app/core';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddDistributorEffects } from './store/add-distributor.effects';
import * as fromAddDistributorReducer from './store/add-distributor.reducers';
import { AddDistributorService } from './add-distributor.service';

const routes: Routes = [
  {
    path: '',
    component: AddDistributorPage,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab/request'
      },
      {
        path: 'tab/request',
        loadChildren:
          './request-tab/request-tab.module#RequestTabModule',
        data: { title: 'Add Distributor', preload: true, delay: false }
      },
      {
        path: 'tab/status',
        loadChildren:
          './status-tab/status-tab.module#StatusTabModule',
        data: { title: 'Add Distributor', preload: true  , delay: false }
      },
      {
        path: 'tab/add',
        loadChildren:
          './add-tab/add-tab.module#AddTabModule',
        data: { title: 'Add Distributor', preload: true, delay: false }
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
    SharedModule,
    TranslateModule,
    StoreModule.forFeature('AddDistributor', fromAddDistributorReducer.addDistributorReducer),
    EffectsModule.forRoot([AddDistributorEffects])
  ],
  declarations: [AddDistributorPage],
  providers: [AddDistributorService]
})
export class AddDistributorPageModule {}
