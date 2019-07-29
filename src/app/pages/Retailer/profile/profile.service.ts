import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Logger } from '@app/core';
import { HttpEvent, HttpClient } from '@angular/common/http';

const log = new Logger('ProfileDetails');

export interface ProfileContext {
  saveObj: {};
}

export interface GetProfileContext {
  userId: number;
}

const routes = {
  profileRoute: (c: ProfileContext) => `/retailer`,
  businesstypes: '/businesstypes',
  regions: '/regions'
};

const routes1 = {
  userDetails: (c: GetProfileContext) => `/retailer?userId=${c.userId}`
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  /**
   * GetProfileContext: userId
   */
  getProfileDetails(context: GetProfileContext): Observable<any> {
    return this.httpClient
    .cache(true)
      .get(routes1.userDetails(context))
      .pipe(
        tap(),
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

  /**
   * Get Business Types.
   * @return Array of Business Types.
   */
  getBusinessTypes(): Observable<any> {
    return this.httpClient
    .cache(true)
    .get(routes.businesstypes).pipe(
      tap(),
      catchError(error => this.errorHandler(error))
    );
  }

  /**
   * Get Regions.
   * @return Array of Regions.
   */
  getRegions(): Observable<any> {
    return this.httpClient.get(routes.regions).pipe(
      tap(),
      catchError(error => this.errorHandler(error))
    );
  }

  /**
   * ChangePasswordContext: oldpassword and new password
   */
  saveProfileDetails(context: ProfileContext): Observable<any> {
    return this.httpClient
    .cache(true)
      .put(routes.profileRoute(context), JSON.stringify(context.saveObj))
      .pipe(
       tap(),
        catchError(error => this.errorHandler(error))
      );
  }
}
