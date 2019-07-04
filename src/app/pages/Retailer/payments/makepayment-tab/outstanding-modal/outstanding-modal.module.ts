import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OutstandingModalPage } from './outstanding-modal.page';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'outstanding-modal',
    component: OutstandingModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  declarations: [OutstandingModalPage]
})
export class OutstandingModalPageModule {}
