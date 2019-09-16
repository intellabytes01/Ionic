import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  InvoiceListSuccess,
  InvoiceListFailure,
  InvoiceAction,
  InvoiceList,
  InvoiceDetail,
  InvoiceDetailSuccess,
  InvoiceDetailFailure
} from './my-invoices.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { InvoiceService } from '../my-invoices.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class InvoiceEffects {
  constructor(
    private actions: Actions,
    private invoiceService: InvoiceService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Invoice List

  @Effect()
  InvoiceList: Observable<Action> = this.actions.pipe(
    ofType(InvoiceAction.INVOICELIST),
    map((action: InvoiceList) => action.payload),
    switchMap(payload => {
      return this.invoiceService.getInvoiceList(payload).pipe(
        map(data => {
          return new InvoiceListSuccess({ invoiceList: data['data'] });
        }),
        catchError(error => of(new InvoiceListFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  InvoiceListSuccess: Observable<any> = this.actions.pipe(
    ofType(InvoiceAction.INVOICELIST_SUCCESS)
  );

  @Effect({ dispatch: false })
  InvoiceListFailure: Observable<any> = this.actions.pipe(
    ofType(InvoiceAction.INVOICELIST_FAILURE)
  );

  // Invoice Detail

  @Effect()
  InvoiceDetail: Observable<Action> = this.actions.pipe(
    ofType(InvoiceAction.INVOICEDETAIL),
    map((action: InvoiceDetail) => action.payload),
    switchMap(payload => {
      return this.invoiceService.getInvoiceDetail(payload).pipe(
        map(data => {
          return new InvoiceDetailSuccess({ invoiceDetail: data['data'] });
        }),
        catchError(error => of(new InvoiceDetailFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  InvoiceDetailSuccess: Observable<any> = this.actions.pipe(
    ofType(InvoiceAction.INVOICEDETAIL_SUCCESS)
  );

  @Effect({ dispatch: false })
  InvoiceDetailFailure: Observable<any> = this.actions.pipe(
    ofType(InvoiceAction.INVOICEDETAIL_FAILURE)
  );
}
