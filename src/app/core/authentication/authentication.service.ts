import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Logger } from '../logger.service';

const log = new Logger('AuthenticationGuard');

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface SignupContext {
  mobile: string;
  password: string;
  regionId: number;
  businessTypeId: number;
}

const routes = {
  login: (c: LoginContext) => `/login`,
  signup: (c: SignupContext) => '/register/retailer',
  savetoken: ''
};

/**
 * Provides a base for authentication workflow.
 */
@Injectable()
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient,
    private store: Store<fromRoot.State>
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.httpClient
      .post(routes.login(context), JSON.stringify(context))
      .pipe(
        map((data: any) => ({
          data
        })),
        tap((data: any) => {
          // this.store.dispatch(new Auth.SetAuthenticated());
          this.credentialsService.setCredentials(data, true);
        }),
        catchError(error => this.errorHandler(error))
      );
  }

  /**
   * Creates new user in App
   * @param context SignUpContext
   */

  signUp(context: SignupContext): Observable<Credentials> {
    return (
      this.httpClient
        // .cache()
        .post(routes.signup(context), JSON.stringify(context))
        .pipe(
          map((data: any) => ({
            data
          })),
          tap((data: any) => {
            // this.store.dispatch(new Auth.SetAuthenticated());
            this.credentialsService.setCredentials(data, true);
          }),
          catchError(error => this.errorHandler(error))
        )
    );
  }


  // Save Token

  saveToken(userData): Observable<Credentials> {
    return this.httpClient
      .get('/businesstypes')
      .pipe(
        map((data: any) => ({
          userData
        })),
        tap((data: any) => {
        }),
        catchError(error => this.errorHandler(error))
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    // if (!environment.production) {
    // Do something with the error
    log.error('Request error', response);
    this.store.dispatch(new UI.StopLoading());
    // }
    throw response;
  }

  // getToken(): string {
  //   return localStorage.getItem('token');
  // }
}
