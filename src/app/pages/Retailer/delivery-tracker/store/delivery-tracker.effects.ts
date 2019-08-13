import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  DeliveryTrackerSuccess,
  DeliveryTrackerFailure,
  DeliveryTrackerAction,
  DeliveryTracker
} from './delivery-tracker.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { DeliveryTrackerService } from '../delivery-tracker.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class DeliveryTrackerEffects {
  constructor(
    private actions: Actions,
    private deliveryTrackerService: DeliveryTrackerService,
    private alert: AlertService,
    private router: Router
  ) {}

  // DeliveryTracker

  @Effect()
  DeliveryTracker: Observable<Action> = this.actions.pipe(
    ofType(DeliveryTrackerAction.DELIVERYTRACKER),
    map((action: DeliveryTracker) => action.payload),
    switchMap((payload) => {
      return this.deliveryTrackerService.getDeliveryTrackerList(payload).pipe(
        map(data => {
          return new DeliveryTrackerSuccess({ deliveryTracker: data['data'] });
        }),
        catchError(error => of(new DeliveryTrackerFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  DeliveryTrackerSuccess: Observable<any> = this.actions.pipe(
    ofType(DeliveryTrackerAction.DELIVERYTRACKER_SUCCESS)
  );

  @Effect({ dispatch: false })
  DeliveryTrackerFailure: Observable<any> = this.actions.pipe(
    ofType(DeliveryTrackerAction.DELIVERYTRACKER_FAILURE)
  );
}
