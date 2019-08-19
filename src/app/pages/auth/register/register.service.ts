import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRegister from './store/register.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { RegionResponse, Region, BussinessTypeResponse, BussinessType } from './store/register.state';

const log = new Logger('AuthenticationGuard');

const routes = {
  businesstypes: '/businesstypes',
  regions: '/regions'
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRegister.RegisterState>
  ) {}

  /**
   * Get Business Types.
   * @return Array of Business Types.
   */
  getBusinessTypes(): Observable<any> {
    return this.httpClient.cache(false).get<BussinessTypeResponse>(routes.businesstypes).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  /**
   * Get Regions.
   * @return Array of Regions.
   */
  getRegions(): Observable<any> {
    return this.httpClient.cache(false).get<RegionResponse>(routes.regions).pipe(
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
