import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { SharedModule } from '@app-shared/shared.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileService } from './profile.service';
import * as fromProfileReducer from './store/profile.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/profile.effects';

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
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    TranslateModule,
    SharedModule,
    IonicSelectableModule,
    StoreModule.forFeature('profile', fromProfileReducer.profileReducer),
    EffectsModule.forRoot([ProfileEffects])
  ],
  declarations: [ProfilePage],
  providers: [ProfileService]
})
export class ProfilePageModule {}
