import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import {
  BusinessTypeActionTypes,
  GetBusinessType,
  GetBusinessTypeSuccess,
  GetBusinessTypeFailure
} from '../actions/business-types.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { BusinessTypeService } from '../business-type.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private businessTypeService: BusinessTypeService,
    private router: Router,
    private storage: Storage
  ) {}

  @Effect()
  GetBusinessType: Observable<Action> = this.actions.pipe(
    ofType(BusinessTypeActionTypes.GETBUSSINESSTYPES),
    map((action: GetBusinessType) => action),
    switchMap(() => {
      return this.businessTypeService.getBusinessTypes().pipe(
        map(businessType => {
          return new GetBusinessTypeSuccess(businessType);
        }),
        catchError(error => of(new GetBusinessTypeFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  GetBusinessTypeSuccess: Observable<any> = this.actions.pipe(
    ofType(BusinessTypeActionTypes.GETBUSSINESSTYPES_SUCCESS),
    tap(businessType => {})
  );

  @Effect({ dispatch: false })
  GetBusinessTypeFailure: Observable<any> = this.actions.pipe(
    ofType(BusinessTypeActionTypes.GETBUSSINESSTYPES_FAILURE)
  );
}
