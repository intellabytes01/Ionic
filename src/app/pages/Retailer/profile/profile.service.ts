import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromProfile from './store/profile.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('AuthenticationGuard');

const routes = {
  imageupload: '/retailer/upload'
};
export interface BusinessTypeContext {
  // The quote's category: 'dev', 'explicit'...
  endPoint: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromProfile.ProfileState>
  ) {}

  /**
   * Upload Image
   * @return 
   */
  uploadImage(params): Observable<any> {
    return this.httpClient.get(`${routes.imageupload}?retailerId=${params.retailerId}&type=${params.type}`).pipe(
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
