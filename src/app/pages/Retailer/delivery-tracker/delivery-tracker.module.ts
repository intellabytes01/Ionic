import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryTrackerPage } from './delivery-tracker.page';
import { FilterModalPageModule } from './filter-modal/filter-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: DeliveryTrackerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FilterModalPageModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [DeliveryTrackerPage]
})
export class DeliveryTrackerPageModule {}
