import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificationPage } from './notification.page';
import { NotificationFilterModalPageModule } from './notification-filter-modal/notification-filter-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromnotificationReducer from './store/notification.reducers';
import { NotificationEffects } from './store/notification.effects';
import { NotificationService } from './notification.service';

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
    TranslateModule,
    StoreModule.forFeature('notification', fromnotificationReducer.notificationReducer),
    EffectsModule.forRoot([NotificationEffects]),
  ],
  declarations: [NotificationPage],
  providers: [NotificationService]
})
export class NotificationPageModule {}
