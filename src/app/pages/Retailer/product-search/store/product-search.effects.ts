import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ProductSearchSuccess,
  ProductSearchFailure,
  ProductSearchAction,
  ProductSearch
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
}
