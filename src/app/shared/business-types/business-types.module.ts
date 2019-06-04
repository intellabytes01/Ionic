import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BusinessTypesPage } from './business-types.page';
import { StoreModule } from '@ngrx/store';
import { businessTypeReducer } from './reducers/business-types.reducers';

const routes: Routes = [
  {
    path: '',
    component: BusinessTypesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('businessTypes', businessTypeReducer)
  ],
  declarations: [BusinessTypesPage]
})
export class BusinessTypesPageModule {}
