import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import { NotificationFilterModalPageModule } from './notification-filter-modal/notification-filter-modal.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NotificationFilterModalPageModule,
    TranslateModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
