import { Injectable, ContentChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Logger } from '../logger.service';
import { Storage } from '@ionic/storage';
import { LoginResponse, User } from './models/user';

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
  OneSignalId: string;
  DevicePlatform: string;
}

export interface UserExistsContext {
  mobile: string;
}

export interface ImageContext {
  file: File;
  type: string;
  retailerId: number;
}

const routes = {
  login: (c: LoginContext) => '/login',
  signup: (c: SignupContext) => '/register/retailer',
  userExists: (c: UserExistsContext) => '/user/exists',
  refreshToken: '/token/refresh',
  savetoken: '',
  upload: '/retailer/upload'
};

/**
 * Provides a base for authentication workflow.
 */
@Injectable()
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient,
    private store: Store<fromRoot.State>,
    private storage: Storage
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<User> {
    return this.httpClient
      .post<LoginResponse>(routes.login(context), JSON.stringify(context))
      .pipe(
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

  signUp(context: SignupContext): Observable<User> {
    return (
      this.httpClient
        // .cache()
        .post<LoginResponse>(routes.signup(context), JSON.stringify(context))
        .pipe(
          tap((data: any) => {
            // this.store.dispatch(new Auth.SetAuthenticated());
            this.credentialsService.setCredentials(data, true);
          }),
          catchError(error => this.errorHandler(error))
        )
    );
  }

  // Save Token

  saveToken() {
    return this.storage.get('userData');
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

  /**
   * context: user mobile number object
   */
  userExists(context: UserExistsContext): Observable<any> {
    return this.httpClient
      .cache(true)
      .post(routes.userExists(context), JSON.stringify(context))
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError(error => this.errorHandler(error))
      );
  }

  getRefreshToken(): Observable<any> {
    return this.httpClient.get<LoginResponse>(routes.refreshToken).pipe(
      tap((data: any) => {
        // this.store.dispatch(new Auth.SetAuthenticated());
        this.credentialsService.setCredentials(data, true);
      }),
      catchError(error => this.errorHandler(error))
    );
  }

  uploadImage(context: ImageContext): Observable<any> {
    console.log('imageContext: ' + JSON.stringify(context));
    return this.httpClient
      .post(`${routes.upload}`, JSON.stringify(context))
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    // if (!environment.production) {
    // Do something with the error
    log.error('Request error', response);
    this.store.dispatch(new UI.StopLoading());
    // }
    throw response['error'];
  }

  // getToken(): string {
  //   return localStorage.getItem('token');
  // }
}
