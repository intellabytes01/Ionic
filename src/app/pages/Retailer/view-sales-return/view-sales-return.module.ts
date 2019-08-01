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
import { SalesReturnService } from './view-sales-return.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SalesReturnEffects } from './store/view-sales-return.effects';
import * as fromSalesReturnReducer from './store/view-sales-return.reducers';

const routes: Routes = [
  {
    path: '',
    component: ViewSalesReturnPage
  },
  {
    path: "sales-detail",
    loadChildren:
      "./sales-detail/sales-detail.module#SalesDetailPageModule",
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
    SharedModule,
    StoreModule.forFeature('salesReturn', fromSalesReturnReducer.salesReturnReducer),
    EffectsModule.forRoot([SalesReturnEffects]),
  ],
  declarations: [ViewSalesReturnPage],
  providers:[SalesReturnService]
})
export class ViewSalesReturnPageModule {}
