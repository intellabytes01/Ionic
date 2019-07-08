import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ChangePassword, ChangePasswordSuccess, ChangePasswordFailure, ChangePasswordTypes
} from './change-password.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ChangePasswordService } from '../change-password.service';
import { AlertService } from '@app/shared/services/alert.service';
import { CredentialsService } from '@app/core';
import { Router } from '@angular/router';

@Injectable()
export class ChangePasswordEffects {
  constructor(private actions: Actions, private changePassword: ChangePasswordService,
              private alert: AlertService, private credentialsService: CredentialsService,
              private router: Router) {}

  // Send ChangePassword

  @Effect()
  ChangePassword: Observable<Action> = this.actions.pipe(
    ofType(ChangePasswordTypes.CHANGEPASSWORD),
    map((action: ChangePassword) => action.payload),
    switchMap(payload => {
      return this.changePassword.changePassword(payload.cred).pipe(
        map(data => {
          if (data.data.success) {
          return new ChangePasswordSuccess({ sendChangePassword: data['data'] });
          } else {
            return new ChangePasswordFailure({ data });
          }
        }),
        catchError(error => of(new ChangePasswordFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  ChangePasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(ChangePasswordTypes.CHANGEPASSWORD_SUCCESS),
    tap((res) => {
      this.alert.presentToast('success', res.payload['sendChangePassword']['message']);
      this.credentialsService.setCredentials();
      this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  ChangePasswordFailure: Observable<any> = this.actions.pipe(
    ofType(ChangePasswordTypes.CHANGEPASSWORD_FAILURE),
    tap((res) => {
      this.alert.presentToast('danger',
      res.payload['data'] ? res.payload['data']['data']['message']
      : (res.payload['error'] ? res.payload['error']['error']['message'] : null));
    })
  );
}
