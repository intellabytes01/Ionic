import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromOtp from './store/forgot-password.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('AuthenticationGuard');

const routes = {
  sendotp: '/otp',
  verifyotp: '/otp/verify'
};

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromOtp.OtpState>
  ) {}

  /**
   * Send Otp.
   * @return Object.
   */
  sendOtp(body): Observable<any> {
    return this.httpClient.post(routes.sendotp, body).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  /**
   * Verify Otp.
   * @return Object.
   */
  verifyOtp(body): Observable<any> {
    return this.httpClient.post(routes.verifyotp, body).pipe(
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
    // }
    throw response;
  }
}
