import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationFilterModalPage } from './notification-filter-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: 'notification-filter',
    component: NotificationFilterModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [NotificationFilterModalPage]
})
export class NotificationFilterModalPageModule {}
