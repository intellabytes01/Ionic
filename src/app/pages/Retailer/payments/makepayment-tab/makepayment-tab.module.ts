import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MakepaymentTabPage } from './makepayment-tab.page';
import { SharedModule } from '@app-shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { OutstandingModalPageModule } from './outstanding-modal/outstanding-modal.module';

const routes: Routes = [
  {
    path: '',
    component: MakepaymentTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    OutstandingModalPageModule,
    ReactiveFormsModule
  ],
  declarations: [MakepaymentTabPage]
})
export class MakepaymentTabPageModule {}
