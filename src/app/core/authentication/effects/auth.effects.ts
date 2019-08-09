import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Storage } from '@ionic/storage';
// tslint:disable-next-line: max-line-length
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, SaveToken, SaveTokenSuccess, SaveTokenFail, UserExists, UserExistsSuccess, UserExistsFailure, TokenRefresh, TokenRefreshSuccess, TokenRefreshFailure } from '../actions/auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AlertService } from '@app/shared/services/alert.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    private alert: AlertService
  ) {}

  @Effect()
  LogIn: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.login(payload.cred).pipe(
        map((user) => {
          return new LogInSuccess(user['data']);
        }), catchError((error) => of(new LogInFailure({ error }))));
    })
    );


  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.storage.set('userData', JSON.stringify(user.payload));
      this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((res) => {
      this.alert.presentToast('danger', 'Please provide valid credentials.');
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.cred).pipe(
        map((user) => {
          if (user['success']) {
          return new SignUpSuccess(user['data']);
          } else {
            return new SignUpFailure(user);
          }
        }), catchError((error) => of(new SignUpFailure({ error }))));
    })
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      if (user && user.payload) {
        this.storage.set('userData', JSON.stringify(user.payload));
        this.router.navigateByUrl('/dashboard');
      }
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap((user) => {
      this.alert.presentToast('danger', user.payload.message);
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      this.storage.clear();
    })
  );

  @Effect()
  SaveToken = this.actions.pipe(
    ofType(AuthActionTypes.SAVETOKEN),
    map((action: SaveToken) => {}),
    switchMap(payload => {
      return this.authService.saveToken().
        then((user) => {
          return new SaveTokenSuccess(JSON.parse(user));
        }, (error) => of(new SaveTokenFail({ error })));
    })
    );

  @Effect({ dispatch: false })
  SaveTokenSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SAVETOKEN_SUCCESS)
  );

  @Effect({ dispatch: false })
  SaveTokenFail: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SAVETOKEN_FAIL)
  );
  @Effect({ dispatch: false })
  public PreviousUrl: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.PREVIOUS_URL),
    tap(url => {
    }));


  @Effect()
  UserExists: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.USEREXISTS),
    map((action: UserExists) => action.payload),
    switchMap(payload => {
      return this.authService.userExists(payload.cred).pipe(
        map((user) => {
          if (user['success']) {
          return new UserExistsSuccess(user['success']);
          } else {
            return new UserExistsFailure(user);
          }
        }), catchError((error) => {
          return of({
            type: AuthActionTypes.USEREXISTS_FAILURE,
            payload: { error }
          });
        }
          // of(new SignUpFailure({ error }))
      ));
    })
    );

  @Effect({ dispatch: false })
  UserExistsSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.USEREXISTS_SUCCESS),
    tap((user) => {
      if (user && user.payload) {
        console.log(user);
      }
    })
  );

  @Effect({ dispatch: false })
  UserExistsFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.USEREXISTS_FAILURE),
    tap((user) => {
      console.log(user);
    })
  );

  @Effect()
  TokenRefresh: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.TOKENREFRESH),
    map((action: TokenRefresh) => {}),
    switchMap(() => {
      return this.authService.getRefreshToken().pipe(
        map((user) => {
          return new TokenRefreshSuccess(user['data']);
        }), catchError((error) => of(new TokenRefreshFailure({ error }))));
    })
    );


  @Effect({ dispatch: false })
  TokenRefreshSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.TOKENREFRESH_SUCCESS),
    tap((user) => {
      this.storage.set('userData', JSON.stringify(user.payload));
    })
  );

  @Effect({ dispatch: false })
  TokenRefreshFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.TOKENREFRESH_FAILURE),
    tap((res) => {
      this.alert.presentToast('danger', 'Token refresh failed');
    })
  );
}
