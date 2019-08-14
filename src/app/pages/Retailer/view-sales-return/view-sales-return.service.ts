import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import {
  SalesReturnState,
  SalesReturnTypeResponse,
  SalesReturnStoreResponse,
  SalesReturnDetailsResponse,
  SalesReturnListResponse
} from './store/view-sales-return.state';

const log = new Logger('SalesReturnGuard');

const routes = {
  salesReturntypes: '/salesreturn/types',
  salesReturnStores: '/salesreturn/stores',
  salesReturnList: '/salesreturn?',
  salesReturnDetails: '/salesreturn/status/'
};

// tslint:disable-next-line: class-name
export interface salesReturnListContext {
  fromDate: string;
  toDate: string;
  query: string;
  store: string;
  type: string;
}

// tslint:disable-next-line: class-name
export interface salesReturnDetailsContext {
  salesreturnId: number;
}

@Injectable()
export class SalesReturnService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<SalesReturnState>
  ) {}

  getSalesReturnTypes(): Observable<any> {
    return this.httpClient
      .get<SalesReturnTypeResponse>(routes.salesReturntypes)
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getSalesReturnStores(): Observable<any> {
    return this.httpClient
      .get<SalesReturnStoreResponse>(routes.salesReturnStores)
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getSalesReturnList(context: salesReturnListContext): Observable<any> {
    return this.httpClient
      .get<SalesReturnListResponse>(
        `${routes.salesReturnList}fromDate=${context.fromDate}&toDate=${
          context.toDate
        }&query=${context.query}&store=${context.store}&type=${context.type}`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getSalesReturnDetails(context: salesReturnDetailsContext): Observable<any> {
    return this.httpClient
      .get<SalesReturnDetailsResponse>(
        `${routes.salesReturnDetails}${context.salesreturnId}`
      )
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
