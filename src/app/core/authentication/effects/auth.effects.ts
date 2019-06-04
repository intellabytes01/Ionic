import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure } from '../actions/auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage
  ) {}

  @Effect()
  LogIn: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.login(payload.cred).pipe(
        map((user) => {
          return new LogInSuccess({token: user.token, email: payload.cred.username});
        }), catchError((error) => of(new LogInFailure({ error }))));
    })
    );


  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.storage.set('token', user.payload.token);
      // localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.cred).pipe(
        map((user) => {
          of(new SignUpSuccess({token: user.token, email: payload.email}));
        }),
        catchError((error) => of(new SignUpFailure({ error }))));
    })
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.storage.set('token', user.payload.token);
      // localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      this.storage.remove('token');
      // localStorage.removeItem('token');
    })
  );

  // @Effect({ dispatch: false })
  // GetStatus: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.GET_STATUS),
  //   switchMap(payload => {
  //     return this.authService.getStatus();
  //   }));
}
