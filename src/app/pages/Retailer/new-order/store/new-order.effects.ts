import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ProductSearch,
  ProductSearchSuccess,
  ProductSearchFailure,
  NewOrderAction,
  NewOrderSubmit,
  NewOrderSubmitSuccess,
  NewOrderSubmitFailure
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
    private newOrderService: NewOrderService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Product Search

  @Effect()
  ProductSearch: Observable<Action> = this.actions.pipe(
    ofType(NewOrderAction.PRODUCTSEARCH),
    map((action: ProductSearch) => action.payload),
    switchMap((payload) => {
      return this.newOrderService.getProducts(payload).pipe(
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

  // New Order Submit

  @Effect()
  NewOrderSubmit: Observable<Action> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSUBMIT),
    map((action: NewOrderSubmit) => action.payload),
    switchMap((payload) => {
      return this.newOrderService.submitNewOrder(payload).pipe(
        map(data => {
          return new NewOrderSubmitSuccess({ newOrder: data['data'] });
        }),
        catchError(error => of(new NewOrderSubmitFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  NewOrderSubmitSuccess: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSUBMIT_SUCCESS)
  );

  @Effect({ dispatch: false })
  NewOrderSubmitFailure: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSUBMIT_FAILURE)
  );
}
