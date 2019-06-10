import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { BusinessTypesSuccess, BusinessTypesFailure, RegisterActionTypes, BusinessTypes } from './register.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { RegisterService } from '../register.service';

@Injectable()
export class RegisterEffects {

  constructor(
    private actions: Actions,
    private registerService: RegisterService  ) {}


  @Effect()
  BusinessTypes: Observable<Action> = this.actions.pipe(
    ofType(RegisterActionTypes.BUSINESSTYPES),
    map((action: BusinessTypes) => {}),
    switchMap(() => {
      return this.registerService.getBusinessTypes().pipe(
        map((data) => {
          return new BusinessTypesSuccess({businessTypes: data['data']});
        }), catchError((error) => of(new BusinessTypesFailure({ error }))));
    })
    );


  @Effect({ dispatch: false })
  BusinessTypesSuccess: Observable<any> = this.actions.pipe(
    ofType(RegisterActionTypes.BUSINESSTYPES_SUCCESS),
    tap(() => {
      // this.storage.set('token', user.payload.token);
      // localStorage.setItem('token', user.payload.token);
    })
  );

  @Effect({ dispatch: false })
  BusinessTypesFailure: Observable<any> = this.actions.pipe(
    ofType(RegisterActionTypes.BUSINESSTYPES_FAILURE)
  );

  // @Effect({ dispatch: false })
  // GetStatus: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.GET_STATUS),
  //   switchMap(payload => {
  //     return this.authService.getStatus();
  //   }));
}
