import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPage } from './forgot-password.page';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OtpEffects } from './store/forgot-password.effects';
import * as fromOtpReducer from './store/forgot-password.reducers';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('otp', fromOtpReducer.otpReducer),
    EffectsModule.forRoot([OtpEffects])
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
