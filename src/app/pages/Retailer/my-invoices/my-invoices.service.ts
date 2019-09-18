import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromInvoice from './store/my-invoices.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import {
  InvoiceListResponse,
  InvoiceState,
  InvoiceDetailResponse
} from './store/my-invoices.state';

const log = new Logger('InvoiceGuard');

export interface InvoiceContext {
  storeId: number;
  retailerId: number;
  toDate: string;
  fromDate: string;
  query: string;
  invoiceId: string;
}

const routes = {
  invoiceList: '/retailer/invoices'
};

@Injectable()
export class InvoiceService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<InvoiceState>
  ) {}

  /**
   * Get Invoice Types.
   * @return Array of Invoice Types.
   */

  getInvoiceList(context: InvoiceContext): Observable<any> {
    let url = `retailerId=${context.retailerId}&toDate=${context.toDate}&fromDate=${context.fromDate}`;
    if (context.query) {
      url += `&query=${context.query}`;
    }
    if (context.storeId) {
      url += `&storeId=${context.storeId}`;
    }
    return this.httpClient
      .get<InvoiceListResponse>(
        `${routes.invoiceList}?${url}
    `
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getInvoiceDetail(context: InvoiceContext): Observable<any> {
    return this.httpClient
      .post<InvoiceDetailResponse>(`${routes.invoiceList}`, context)
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
