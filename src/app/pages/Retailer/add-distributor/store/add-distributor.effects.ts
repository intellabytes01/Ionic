import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  GetStoresSuccess,
  GetStoresFailure,
  RequestSubmitSuccess,
  RequestSubmitFailure,
  AddDistributorAction,
  GetStores,
  RequestSubmit,
  GetStatus,
  GetStatusSuccess,
  GetStatusFailure,
  DistributorSubmit,
  DistributorSubmitSuccess,
  DistributorSubmitFailure
} from './add-distributor.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AddDistributorService } from '../add-distributor.service';
import { AlertService } from '@app/shared/services/alert.service';

@Injectable()
export class AddDistributorEffects {
  constructor(
    private actions: Actions,
    private addDistributorService: AddDistributorService,
    private alert: AlertService
  ) {}

  // Get Request

  @Effect()
  Getc: Observable<Action> = this.actions.pipe(
    ofType(AddDistributorAction.GETSTORES),
    map((action: GetStores) => action.payload),
    switchMap((payload: any) => {
      return this.addDistributorService.getGetStores(payload.retailerId).pipe(
        map(data => {
          return new GetStoresSuccess({ stores: data['data'] });
        }),
        catchError(error => of(new GetStoresFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  GetStoresSuccess: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.GETSTORES_SUCCESS)
  );

  @Effect({ dispatch: false })
  GetStoresFailure: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.GETSTORES_FAILURE)
  );

  // Request Submit

  @Effect()
  RequestSubmit: Observable<Action> = this.actions.pipe(
    ofType(AddDistributorAction.REQUESTSUBMIT),
    map((action: RequestSubmit) => action.payload),
    switchMap((payload) => {
      return this.addDistributorService.submitRequest(payload).pipe(
        map(data => {
          return new RequestSubmitSuccess({ requestSubmit: data['data'] });
        }),
        catchError(error => of(new RequestSubmitFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  RequestSubmitSuccess: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.REQUESTSUBMIT_SUCCESS),
    tap(() => {
      this.alert.presentToast('success', 'Request submitted successfully.');
    })
  );

  @Effect({ dispatch: false })
  RequestSubmitFailure: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.REQUESTSUBMIT_FAILURE),
    tap(() => {
      this.alert.presentToast('danger', 'Something went wrong, Please try again later.');
    })
  );

  // Get Status

  @Effect()
  GetStatus: Observable<Action> = this.actions.pipe(
    ofType(AddDistributorAction.GETSTATUS),
    map((action: GetStatus) => action.payload),
    switchMap((payload: any) => {
      return this.addDistributorService.getGetStatus(payload.retailerId).pipe(
        map(data => {
          return new GetStatusSuccess({ statusList: data['data'] });
        }),
        catchError(error => of(new GetStatusFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  GetStatusSuccess: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.GETSTATUS_SUCCESS)
  );

  @Effect({ dispatch: false })
  GetStatusFailure: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.GETSTATUS_FAILURE)
  );

  // Distributor Submit

  @Effect()
  DistributorSubmit: Observable<Action> = this.actions.pipe(
    ofType(AddDistributorAction.DISTRIBUTORSUBMIT),
    map((action: DistributorSubmit) => action.payload),
    switchMap((payload) => {
      return this.addDistributorService.submitDistributor(payload).pipe(
        map(data => {
          return new DistributorSubmitSuccess({ distributorSubmit: data['data'] });
        }),
        catchError(error => of(new DistributorSubmitFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  DistributorSubmitSuccess: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.DISTRIBUTORSUBMIT_SUCCESS),
    tap(() => {
      this.alert.presentToast('success', 'Distributor submitted successfully.');
    })
  );

  @Effect({ dispatch: false })
  DistributorSubmitFailure: Observable<any> = this.actions.pipe(
    ofType(AddDistributorAction.DISTRIBUTORSUBMIT_FAILURE),
    tap(() => {
      this.alert.presentToast('danger', 'Something went wrong, Please try again later.');
    })
  );
}
