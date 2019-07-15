import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromRequest from './store/add-distributor.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { StatusResponse, StoreResponse, RequestSubmitResponse, DistributorSubmitResponse } from './store/add-distributor.state';

const log = new Logger('RequestGuard');

export interface RequestContext {
  subject: string;
  message: string;
  requestTo: string;
  toStoreId: number;
}

export interface DistributorContext {
  retailerId: number;
  storeName: string;
  mobile: number;
}

const routes = {
  stores: '/stores/nonmapped?retailerId=',
  requestsubmit: '/stores/retailer/mappings',
  status: '/stores/nonmapped/status?retailerId=',
  distributorsubmit: '/stores/retailer/request'
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
    return this.httpClient.get<StoreResponse>(`${routes.stores}${retailerId}`).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  submitRequest(context: RequestContext): Observable<any> {
    return this.httpClient.post<RequestSubmitResponse>(routes.requestsubmit, context).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  /**
   * Get Status.
   * @return Array of Status.
   */
  getGetStatus(retailerId): Observable<any> {
    return this.httpClient.get<StatusResponse>(`${routes.status}${retailerId}`).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  submitDistributor(context: DistributorContext): Observable<any> {
    return this.httpClient.post<DistributorSubmitResponse>(routes.distributorsubmit, context).pipe(
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
