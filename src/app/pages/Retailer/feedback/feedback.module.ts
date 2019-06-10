import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedbackPage } from './feedback.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SharedModule } from '@app-shared/shared.module';
import { SelectStorePageModule } from '@app/shared/select-store/select-store.module';

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
    SelectStorePageModule,
    SharedModule
  ],
  declarations: [FeedbackPage]
})
export class FeedbackPageModule {}
