import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ProductSearch,
  ProductSearchSuccess,
  ProductSearchFailure,
  NewOrderAction,
} from './new-order.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { NewOrderService } from '../new-order.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class NewOrderEffects {
  constructor(
    private actions: Actions,
    private NewOrderService: NewOrderService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Product Search

  @Effect()
  ProductSearch: Observable<Action> = this.actions.pipe(
    ofType(NewOrderAction.PRODUCTSEARCH),
    map((action: ProductSearch) => action.payload),
    switchMap((payload) => {
      return this.NewOrderService.getProducts(payload).pipe(
        map(data => {
          return new ProductSearchSuccess({ productSearch: data['data'] });
        }),
        catchError(error => of(new ProductSearchFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  ProductSearchSuccess: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.PRODUCTSEARCH_SUCCESS)
  );

  @Effect({ dispatch: false })
  ProductSearchFailure: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.PRODUCTSEARCH_FAILURE)
  );
}
