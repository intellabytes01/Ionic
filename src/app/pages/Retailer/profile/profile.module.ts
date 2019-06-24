import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { SharedModule } from '@app-shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromprofileReducer from './store/profile.reducers';
import { ProfileEffects } from './store/profile.effects';
import * as fromregisterReducer from '@app/pages/auth/register/store/register.reducers';
import { RegisterEffects } from '@app/pages/auth/register/store/register.effects';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('profile', fromprofileReducer.profileReducer),
    StoreModule.forFeature('register', fromregisterReducer.registerReducer),
    EffectsModule.forRoot([ProfileEffects, RegisterEffects])
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
