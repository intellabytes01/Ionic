import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewSalesReturnPage } from './view-sales-return.page';
import { FilterSalesModalPageModule } from './filter-sales-modal/filter-sales-modal.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { AuthenticationGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: ViewSalesReturnPage
  },
  {
    path: "sales-detail",
    loadChildren:
      "./pages/Retailer/view-sales-return/sales-detail/sales-detail.module#SalesDetailPageModule",
      data: { title: "My Sales Return Details", preload: false, delay: false },
      canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FilterSalesModalPageModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [ViewSalesReturnPage]
})
export class ViewSalesReturnPageModule {}
