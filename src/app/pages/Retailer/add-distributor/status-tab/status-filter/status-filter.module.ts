import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatusFilterPage } from './status-filter.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: 'status-filter',
    component: StatusFilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    SharedModule
  ],
  declarations: [StatusFilterPage]
})
export class StatusFilterPageModule {}
