import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedbackPage } from './feedback.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SharedModule } from '@app-shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FeedbackEffects } from './store/feedback.effects';
import * as fromfeedbackReducer from './store/feedback.reducers';

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicSelectableModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('feedback', fromfeedbackReducer.feedbackReducer),
    EffectsModule.forRoot([FeedbackEffects])
  ],
  declarations: [FeedbackPage]
})
export class FeedbackPageModule {}
