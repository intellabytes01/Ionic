import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRequest from './store/add-distributor.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('RequestGuard');

export interface RequestContext {
  subject: string;
  message: string;
  requestTo: string;
  toStoreId: number;
}

const routes = {
  stores: '/stores/nonmapped?retailerId=',
  requestsubmit: '/stores/retailer/mappings'
};

@Injectable()
export class AddDistributorService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRequest.AddDistributorState>
  ) {}

  /**
   * Get Request Types.
   * @return Array of Request Types.
   */
  getGetStores(retailerId): Observable<any> {
    return this.httpClient.get(`${routes.stores}${retailerId}`).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  submitRequest(context: RequestContext): Observable<any> {
    return this.httpClient.post(routes.requestsubmit, context).pipe(
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
