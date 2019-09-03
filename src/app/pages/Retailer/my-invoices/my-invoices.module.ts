import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyInvoicesPage } from './my-invoices.page';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceFilterModalPageModule } from './invoice-filter-modal/invoice-filter-modal.module';
import { SharedModule } from '@app/shared';
import { InvoiceService } from './my-invoices.service';
import { InvoiceEffects } from './store/my-invoices.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as frominvoiceReducer from './store/my-invoices.reducers';

const routes: Routes = [
  {
    path: '',
    component: MyInvoicesPage
  },
  {
    path: 'invoice-details',
    loadChildren:
      './invoice-details/invoice-details.module#InvoiceDetailsPageModule',
    data: { title: 'My Invoice Details', preload: false, delay: true }
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
    SharedModule,
    StoreModule.forFeature('invoice', frominvoiceReducer.invoiceReducer),
    EffectsModule.forRoot([InvoiceEffects])
  ],
  declarations: [MyInvoicesPage],
  providers: [InvoiceService]
})
export class MyInvoicesPageModule {}
