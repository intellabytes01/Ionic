import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ChangePassword, ChangePasswordSuccess, ChangePasswordFailure, ChangePasswordTypes
} from './change-password.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ChangePasswordService } from '../change-password.service';

@Injectable()
export class ChangePasswordEffects {
  constructor(private actions: Actions, private changePassword: ChangePasswordService) {}

  // Send ChangePassword

  @Effect()
  ChangePassword: Observable<Action> = this.actions.pipe(
    ofType(ChangePasswordTypes.CHANGEPASSWORD),
    map((action: ChangePassword) => action.payload),
    switchMap(payload => {
      return this.changePassword.changePassword(payload.cred).pipe(
        map(data => {
          return new ChangePasswordSuccess({ sendChangePassword: data['data'] });
        }),
        catchError(error => of(new ChangePasswordFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  ChangePasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(ChangePasswordTypes.CHANGEPASSWORD_SUCCESS),
    tap(() => {})
  );

  @Effect({ dispatch: false })
  ChangePasswordFailure: Observable<any> = this.actions.pipe(
    ofType(ChangePasswordTypes.CHANGEPASSWORD_FAILURE),
    tap(() => {
      // this.alert.presentToast('Incorrect mobile number');
    })
  );
}
