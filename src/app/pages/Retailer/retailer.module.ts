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
