import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyInvoicesPage } from './my-invoices.page';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceFilterModalPageModule } from './invoice-filter-modal/invoice-filter-modal.module';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: MyInvoicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    InvoiceFilterModalPageModule,
    SharedModule
  ],
  declarations: [MyInvoicesPage]
})
export class MyInvoicesPageModule {}
