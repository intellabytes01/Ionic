import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderFilterModalPage } from './order-filter-modal.page';
import { SharedModule } from '@app-shared/shared.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'order-filter',
    component: OrderFilterModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [OrderFilterModalPage]
})
export class OrderFilterModalPageModule {}
