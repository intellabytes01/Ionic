import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductSearchPage } from './product-search.page';
import { SharedModule } from '@app-shared/shared.module';
import { AuthenticationGuard } from '@app/core';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductSearchEffects } from './store/product-search.effects';
import * as productSearchReducer from './store/product-search.reducers';
import { ProductSearchService } from './product-search.service';

const routes: Routes = [
  {
    path: '',
    component: ProductSearchPage,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tab/product'
      },
      {
        path: 'tab/product',
        loadChildren: './product-tab/product-tab.module#ProductTabPageModule',
        data: { title: 'Product Search', preload: true, delay: false }
      },
      {
        path: 'tab/generic',
        loadChildren: './generic-tab/generic-tab.module#GenericTabPageModule',
        data: { title: 'Product Search', preload: true, delay: false }
      },
      {
        path: 'tab/company',
        loadChildren: './company-tab/company-tab.module#CompanyTabPageModule',
        data: { title: 'Product Search', preload: true, delay: false }
      },
      {
        path: 'tab/distributor',
        loadChildren:
          './distributor-tab/distributor-tab.module#DistributorTabPageModule',
        data: { title: 'Product Search', preload: true, delay: false }
      }
    ]
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
    StoreModule.forFeature('productSearch', productSearchReducer.productSearchReducer),
    EffectsModule.forRoot([ProductSearchEffects]),
  ],
  declarations: [ProductSearchPage],
  providers: [ProductSearchService]
})
export class ProductSearchPageModule {}
