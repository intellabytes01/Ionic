import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Logger } from '../../../core/logger.service';

const log = new Logger('AuthenticationGuard');

export interface ChangePasswordContext {
  oldPassword: string;
  newPassword: string;
}

const routes = {
  cPassword: (c: ChangePasswordContext) => `/user/password`
};

@Injectable({
  providedIn: 'root'
})

export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }

  /**
   * ChangePasswordContext: oldpassword and new password
   */
  changePassword(context: ChangePasswordContext): Observable<any> {
    return this.httpClient
      .patch(routes.cPassword(context), JSON.stringify(context))
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
    // }
    throw response;
  }
}
