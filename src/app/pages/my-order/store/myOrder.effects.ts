import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { MyOrderAction, MyOrderList, MyOrderSuccess, MyOrderFailure } from './myOrder.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AlertService } from '@app/shared/services/alert.service';
import { MyOrderService } from '../my-order.service';

@Injectable()
export class MyOrderEffects {
  constructor(
    private actions: Actions,
    private alert: AlertService,
    private myOrderService: MyOrderService
  ) {}

  // Feedback Types

  @Effect()
  myOrder: Observable<Action> = this.actions.pipe(
    ofType(MyOrderAction.MYORDERLIST),
    map((action: MyOrderList) => {}),
    switchMap(() => {
      return this.myOrderService.getMyOrders().pipe(
        map(data => {
          return new MyOrderSuccess({ myOrders: data['data'] });
        }),
        catchError(error => of(new MyOrderFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  MyOrderSuccess: Observable<any> = this.actions.pipe(
    ofType(MyOrderAction.MYORDER_SUCCESS)
  );

  @Effect({ dispatch: false })
  MyOrderFailure: Observable<any> = this.actions.pipe(
    ofType(MyOrderAction.MYORDER_FAILURE)
  );
}
