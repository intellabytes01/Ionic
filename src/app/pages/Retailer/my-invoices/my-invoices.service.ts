import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromInvoice from './store/my-invoices.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { InvoiceTypeResponse, InvoiceState } from './store/my-invoices.state';

const log = new Logger('InvoiceGuard');

export interface InvoiceContext {
  storeId: number;
  partyCode: string;
}

const routes = {
  invoiceList: '/retailer/order/outstanding/invoices '
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
    return this.httpClient.post<InvoiceTypeResponse>(routes.invoiceList, context).pipe(
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
