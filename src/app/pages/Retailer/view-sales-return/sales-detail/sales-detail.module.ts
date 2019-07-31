import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalesDetailPage } from './sales-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: SalesDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    SharedModule
  ],
  declarations: [SalesDetailPage]
})
export class SalesDetailPageModule {}
