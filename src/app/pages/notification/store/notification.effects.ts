import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  NotificationListSuccess,
  NotificationListFailure,
  NotificationAction,
  NotificationList
} from './notification.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { NotificationService } from '../notification.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions: Actions,
    private notificationService: NotificationService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Notification List

  @Effect()
  NotificationList: Observable<Action> = this.actions.pipe(
    ofType(NotificationAction.NOTIFICATIONLIST),
    map((action: NotificationList) => action.payload),
    switchMap((payload) => {
      return this.notificationService.getNotificationList(payload).pipe(
        map(data => {
          return new NotificationListSuccess({ notificationList: data['data'] });
        }),
        catchError(error => of(new NotificationListFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  NotificationListSuccess: Observable<any> = this.actions.pipe(
    ofType(NotificationAction.NOTIFICATIONLIST_SUCCESS)
  );

  @Effect({ dispatch: false })
  NotificationListFailure: Observable<any> = this.actions.pipe(
    ofType(NotificationAction.NOTIFICATIONLIST_FAILURE)
  );
}
