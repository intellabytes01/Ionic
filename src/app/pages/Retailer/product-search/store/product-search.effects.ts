import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ProductSearch,
  ProductSearchSuccess,
  ProductSearchFailure,
  ProductSearchAction,
  GenericSearch,
  GenericSearchSuccess,
  GenericSearchFailure,
  GenericDetail,
  GenericDetailSuccess,
  GenericDetailFailure,
  CompanySearch,
  CompanySearchSuccess,
  CompanySearchFailure,
  CompanyStores,
  CompanyStoresSuccess,
  CompanyStoresFailure,
  CompanyProducts,
  CompanyProductsSuccess,
  CompanyProductsFailure,
  DistributorSearch,
  DistributorSearchSuccess,
  DistributorSearchFailure,
  DistributorCompanies,
  DistributorCompaniesSuccess,
  DistributorCompaniesFailure,
  GenericStores,
  GenericStoresSuccess,
  GenericStoresFailure
} from './product-search.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ProductSearchService } from '../product-search.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ProductSearchEffects {
  constructor(
    private actions: Actions,
    private productSearchService: ProductSearchService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Product Search

  @Effect()
  ProductSearch: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.PRODUCTSEARCH),
    map((action: ProductSearch) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getProducts(payload).pipe(
        map(data => {
          return new ProductSearchSuccess({ productSearch: data['data'] });
        }),
        catchError(error => of(new ProductSearchFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  ProductSearchSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.PRODUCTSEARCH_SUCCESS)
  );

  @Effect({ dispatch: false })
  ProductSearchFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.PRODUCTSEARCH_FAILURE)
  );

  // Generic Search

  @Effect()
  GenericSearch: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICSEARCH),
    map((action: GenericSearch) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getGeneric(payload).pipe(
        map(data => {
          return new GenericSearchSuccess({ genericSearch: data['data'] });
        }),
        catchError(error => of(new GenericSearchFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  GenericSearchSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICSEARCH_SUCCESS)
  );

  @Effect({ dispatch: false })
  GenericSearchFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICSEARCH_FAILURE)
  );

  // Generic Detail

  @Effect()
  GenericDetail: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICDETAIL),
    map((action: GenericDetail) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getGenericProducts(payload).pipe(
        map(data => {
          return new GenericDetailSuccess({ genericDetail: data['data'] });
        }),
        catchError(error => of(new GenericDetailFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  GenericDetailSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICDETAIL_SUCCESS)
  );

  @Effect({ dispatch: false })
  GenericDetailFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICDETAIL_FAILURE)
  );

  // Generic Stores

  @Effect()
  GenericStores: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICSTORES),
    map((action: GenericStores) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getGenericStores(payload).pipe(
        map(data => {
          return new GenericStoresSuccess({ genericStores: data['data'] });
        }),
        catchError(error => of(new GenericStoresFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  GenericStoresSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICSTORES_SUCCESS)
  );

  @Effect({ dispatch: false })
  GenericStoresFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.GENERICSTORES_FAILURE)
  );

  // Company Search

  @Effect()
  CompanySearch: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYSEARCH),
    map((action: CompanySearch) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getCompanies(payload).pipe(
        map(data => {
          return new CompanySearchSuccess({ companySearch: data['data'] });
        }),
        catchError(error => of(new CompanySearchFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  CompanySearchSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYSEARCH_SUCCESS)
  );

  @Effect({ dispatch: false })
  CompanySearchFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYSEARCH_FAILURE)
  );

  // Company Stores

  @Effect()
  CompanyStores: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYSTORES),
    map((action: CompanyStores) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getCompanyStores(payload).pipe(
        map(data => {
          return new CompanyStoresSuccess({ companyStores: data['data'] });
        }),
        catchError(error => of(new CompanyStoresFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  CompanyStoresSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYSTORES_SUCCESS)
  );

  @Effect({ dispatch: false })
  CompanyStoresFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYSTORES_FAILURE)
  );

  // Company Products

  @Effect()
  CompanyProducts: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYPRODUCTS),
    map((action: CompanyProducts) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getCompanyProducts(payload).pipe(
        map(data => {
          return new CompanyProductsSuccess({ companyProducts: data['data'] });
        }),
        catchError(error => of(new CompanyProductsFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  CompanyProductsSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYPRODUCTS_SUCCESS)
  );

  @Effect({ dispatch: false })
  CompanyProductsFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.COMPANYPRODUCTS_FAILURE)
  );

  // Distributor Search

  @Effect()
  DistributorSearch: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.DISTRIBUTORSEARCH),
    map((action: DistributorSearch) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getDistributors(payload).pipe(
        map(data => {
          return new DistributorSearchSuccess({ distributorSearch: data['data'] });
        }),
        catchError(error => of(new DistributorSearchFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  DistributorSearchSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.DISTRIBUTORSEARCH_SUCCESS)
  );

  @Effect({ dispatch: false })
  DistributorSearchFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.DISTRIBUTORSEARCH_FAILURE)
  );

  // Distributor Companies

  @Effect()
  DistributorCompanies: Observable<Action> = this.actions.pipe(
    ofType(ProductSearchAction.DISTRIBUTORCOMPANIES),
    map((action: DistributorCompanies) => action.payload),
    switchMap((payload) => {
      return this.productSearchService.getDistributorCompanies(payload).pipe(
        map(data => {
          return new DistributorCompaniesSuccess({ distributorCompanies: data['data'] });
        }),
        catchError(error => of(new DistributorCompaniesFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  DistributorCompaniesSuccess: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.DISTRIBUTORCOMPANIES_SUCCESS)
  );

  @Effect({ dispatch: false })
  DistributorCompaniesFailure: Observable<any> = this.actions.pipe(
    ofType(ProductSearchAction.DISTRIBUTORCOMPANIES_FAILURE)
  );
}
