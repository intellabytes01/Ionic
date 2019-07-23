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
  CompanySearchFailure
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
}
