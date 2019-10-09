import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  SendOtpSuccess,
  SendOtpFailure,
  OtpActionTypes,
  SendOtp,
  VerifyOtp,
  VerifyOtpSuccess,
  VerifyOtpFailure
} from './forgot-password.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { OtpService } from '../forgot-password.service';
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { addMinutes, differenceInMinutes } from 'date-fns';

@Injectable()
export class OtpEffects {
  constructor(
    private actions: Actions,
    private registerService: OtpService,
    private alert: AlertService,
    private translateService: TranslateService
  ) {}

  // Send Otp

  @Effect()
  SendOtp: Observable<Action> = this.actions.pipe(
    ofType(OtpActionTypes.SENDOTP),
    map((action: SendOtp) => action.payload),
    switchMap(payload => {
      return this.registerService.sendOtp(payload).pipe(
        map(data => {
          return new SendOtpSuccess({ sendOtp: data['data'] });
        }),
        catchError(error => of(new SendOtpFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SendOtpSuccess: Observable<any> = this.actions.pipe(
    ofType(OtpActionTypes.SENDOTP_SUCCESS)
  );

  @Effect({ dispatch: false })
  SendOtpFailure: Observable<any> = this.actions.pipe(
    ofType(OtpActionTypes.SENDOTP_FAILURE),
    tap(() => {
      this.alert.presentToast(
        'danger',
        'Supplied Mobile number does not match in our database.'
      );
    })
  );

  // Verify Otp

  @Effect()
  VerifyOtp: Observable<Action> = this.actions.pipe(
    ofType(OtpActionTypes.VERIFYOTP),
    map((action: VerifyOtp) => action.payload),
    switchMap(payload => {
      return this.registerService.verifyOtp(payload).pipe(
        map(data => {
          return new VerifyOtpSuccess({ verifyOtp: data['data'] });
        }),
        catchError(error => of(new VerifyOtpFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  VerifyOtpSuccess: Observable<any> = this.actions.pipe(
    ofType(OtpActionTypes.VERIFYOTP_SUCCESS)
  );

  @Effect({ dispatch: false })
  VerifyOtpFailure: Observable<any> = this.actions.pipe(
    ofType(OtpActionTypes.VERIFYOTP_FAILURE),
    tap(() => {
      this.alert.presentToast(
        'danger',
        this.translateService.instant('FORGOT_PASSWORD.INVALIDOTP')
      );
      const obj = { exp: addMinutes(new Date(), 15), count: 1 };

      if (localStorage.getItem('errorOtp')) {
        obj.count = JSON.parse(localStorage.getItem('errorOtp')).count;
        obj.count += 1;
        obj.exp = JSON.parse(localStorage.getItem('errorOtp')).exp;
      }

      localStorage.setItem(
        'errorOtp',
        JSON.stringify(obj)
      );
    })
  );
}
