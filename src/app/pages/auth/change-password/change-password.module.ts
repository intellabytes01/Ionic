import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPage } from './change-password.page';

import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationGuard } from '@app/core';
import { SharedModule } from '@app/shared';
import { ChangePasswordService } from './change-password.service';
import { StoreModule } from '@ngrx/store';
import * as fromPasswordReducer from './store/change-password.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ChangePasswordEffects } from './store/change-password.effects';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage,
    canActivate: [AuthenticationGuard],
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('changePassword', fromPasswordReducer.changePasswordReducer),
    EffectsModule.forRoot([ChangePasswordEffects]),
  ],
  providers: [ChangePasswordService],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
