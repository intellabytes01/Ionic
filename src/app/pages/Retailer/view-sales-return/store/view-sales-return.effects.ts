import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  SalesReturnTypesSuccess,
  SalesReturnTypesFailure,
  SalesReturnAction,
  SalesReturnTypes,
  SalesReturnStores,
  SalesReturnStoresSuccess,
  SalesReturnStoresFailure,
  SalesReturnList,
  SalesReturnListSuccess,
  SalesReturnListFailure,
  SalesReturnDetails,
  SalesReturnDetailsSuccess,
  SalesReturnDetailsFailure
} from './view-sales-return.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { SalesReturnService } from '../view-sales-return.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class SalesReturnEffects {
  constructor(
    private actions: Actions,
    private salesReturnService: SalesReturnService,
    private alert: AlertService,
    private router: Router
  ) {}

  // SalesReturn Types

  @Effect()
  SalesReturnTypes: Observable<Action> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNTYPES),
    map((action: SalesReturnTypes) => {}),
    switchMap(() => {
      return this.salesReturnService.getSalesReturnTypes().pipe(
        map(data => {
          return new SalesReturnTypesSuccess({ salesReturnTypes: data['data'] });
        }),
        catchError(error => of(new SalesReturnTypesFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SalesReturnTypesSuccess: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNTYPES_SUCCESS)
  );

  @Effect({ dispatch: false })
  SalesReturnTypesFailure: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNTYPES_FAILURE)
  );

  // SalesReturn Stores

  @Effect()
  SalesReturnStores: Observable<Action> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNSTORES),
    map((action: SalesReturnStores) => {}),
    switchMap(() => {
      return this.salesReturnService.getSalesReturnStores().pipe(
        map(data => {
          return new SalesReturnStoresSuccess({ salesReturnStores: data['data'] });
        }),
        catchError(error => of(new SalesReturnStoresFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SalesReturnStoresSuccess: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNSTORES_SUCCESS)
  );

  @Effect({ dispatch: false })
  SalesReturnStoresFailure: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNSTORES_FAILURE)
  );

  // SalesReturn List

  @Effect()
  SalesReturnList: Observable<Action> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNLIST),
    map((action: SalesReturnList) => action.payload),
    switchMap((payload) => {
      return this.salesReturnService.getSalesReturnList(payload).pipe(
        map(data => {
          return new SalesReturnListSuccess({ salesReturnList: data['data'] });
        }),
        catchError(error => of(new SalesReturnListFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SalesReturnListSuccess: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNLIST_SUCCESS)
  );

  @Effect({ dispatch: false })
  SalesReturnListFailure: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNLIST_FAILURE)
  );

  // SalesReturn Details

  @Effect()
  SalesReturnDetails: Observable<Action> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNDETAILS),
    map((action: SalesReturnDetails) => action.payload),
    switchMap((payload) => {
      return this.salesReturnService.getSalesReturnDetails(payload).pipe(
        map(data => {
          return new SalesReturnDetailsSuccess({ salesReturnDetails: data['data'] });
        }),
        catchError(error => of(new SalesReturnDetailsFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SalesReturnDetailsSuccess: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNDETAILS_SUCCESS)
  );

  @Effect({ dispatch: false })
  SalesReturnDetailsFailure: Observable<any> = this.actions.pipe(
    ofType(SalesReturnAction.SALESRETURNDETAILS_FAILURE)
  );

}
