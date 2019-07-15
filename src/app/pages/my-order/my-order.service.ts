import { Injectable } from '@angular/core';
import { Logger } from '@app/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MyOrderResponse } from './store/myOrder.state';

const log = new Logger('MyOrder');

export interface MyOrderContext {
  fromDate: string;
  toDate: string;
  storeId: string;
  orderNo: number;
  pagination: {
    currentPage: number;
    limit: number;
    maxDateTime: string;
  };
}

const routes = {
  getOrder: '/retailer/orders'
};

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {
  constructor(private httpClient: HttpClient) {}

   /**
    * Get My Orders.
    * @return object of orders.
    */
  getMyOrders(context: MyOrderContext): Observable<any> {
    return this.httpClient.post<MyOrderResponse>(routes.getOrder, context).pipe(
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
