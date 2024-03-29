import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ProductSearch,
  ProductSearchSuccess,
  ProductSearchFailure,
  NewOrderAction,
  NewOrderSubmit,
  NewOrderSubmitSuccess,
  NewOrderSubmitFailure,
  NewOrderStoreConfig,
  NewOrderGetStoreConfigSucess,
  NewOrderGetStoreConfigFailure,
  NewOrderHistory,
  NewOrderHistorySucess,
  NewOrderHistoryFailure
} from './new-order.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { NewOrderService } from '../new-order.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NewOrderEffects {
  constructor(
    private actions: Actions,
    private newOrderService: NewOrderService,
    private alert: AlertService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  // Product Search

  @Effect()
  ProductSearch: Observable<Action> = this.actions.pipe(
    ofType(NewOrderAction.PRODUCTSEARCH),
    map((action: ProductSearch) => action.payload),
    switchMap(payload => {
      if (payload.storeId) {
        return this.newOrderService.getProducts(payload).pipe(
          map(data => {
            return new ProductSearchSuccess({ productSearch: data['data'] });
          }),
          catchError(error => of(new ProductSearchFailure({ error })))
        );
      } else {
        return this.newOrderService.getProductsTab2(payload).pipe(
          map(data => {
            return new ProductSearchSuccess({ productSearch: data['data'] });
          }),
          catchError(error => of(new ProductSearchFailure({ error })))
        );
      }
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
    switchMap(payload => {
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
    ofType(NewOrderAction.NEWORDERSUBMIT_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  NewOrderSubmitFailure: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSUBMIT_FAILURE),
    tap(() => {
      this.alert.presentToast(
        'danger',
        this.translateService.instant('NEW_ORDER.ERROR_TEXT')
      );
    })
  );

  // Get Store Config
  @Effect()
  StoreConfig: Observable<Action> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSTORECONFIG),
    map((action: NewOrderStoreConfig) => action.payload),
    switchMap(payload => {
      return this.newOrderService.getStoreConfig(payload).pipe(
        map(data => {
          return new NewOrderGetStoreConfigSucess({
            storeConfig: data['data']['data']
          });
        }),
        catchError(error => of(new NewOrderGetStoreConfigFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  NewOrderGetStoreConfigSucess: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSTORECONFIG_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  NewOrderGetStoreConfigFailure: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERSTORECONFIG_FAILURE),
    tap(() => {
      this.alert.presentToast(
        'danger',
        this.translateService.instant('NEW_ORDER.STORE_CONFIG_ERR')
      );
    })
  );


  // Get Order History
  @Effect()
  OrderHistory: Observable<Action> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERHISTOY),
    map((action: NewOrderHistory) => action.payload),
    switchMap(payload => {
      return this.newOrderService.getOrderHistory(payload).pipe(
        map(data => {
          return new NewOrderHistorySucess({
            orderHistory: data['data']['data']
          });
        }),
        catchError(error => of(new NewOrderHistoryFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  NewOrderHistorySucess: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERHISTOY_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  NewOrderHistoryFailure: Observable<any> = this.actions.pipe(
    ofType(NewOrderAction.NEWORDERHISTOY_FAILURE),
    tap(() => {
      // this.alert.presentToast(
      //   'danger',
      //   this.translateService.instant('NEW_ORDER.STORE_CONFIG_ERR')
      // );
    })
  );
}
