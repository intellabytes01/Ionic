import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilterModalPage } from './filter-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: 'delivery-filter',
    component: FilterModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FilterModalPage]
})
export class FilterModalPageModule {}
