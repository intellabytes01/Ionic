import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  SalesReturnTypesSuccess,
  SalesReturnTypesFailure,
  SalesReturnAction,
  SalesReturnTypes,
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

}
