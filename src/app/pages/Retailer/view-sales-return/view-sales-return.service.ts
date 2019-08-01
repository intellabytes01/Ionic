import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromSalesReturn from './store/view-sales-return.state';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { SalesReturnTypeResponse } from './store/view-sales-return.state';

const log = new Logger('SalesReturnGuard');

const routes = {
  salesReturntypes: '/salesreturn/types'
};

@Injectable()
export class SalesReturnService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromSalesReturn.SalesReturnState>
  ) {}

  getSalesReturnTypes(): Observable<any> {
    return this.httpClient.get<SalesReturnTypeResponse>(routes.salesReturntypes).pipe(
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
