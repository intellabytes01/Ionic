import { Injectable } from '@angular/core';
import { Logger } from '@app/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  ProductSearchResponse,
  NewOrderBody,
  NewOrderResponse
} from './store/new-order.state';

const log = new Logger('NewOrder');
export interface ProductSearchContext {
  query: string;
  storeId: number;
  regionId: number;
  page: number;
}

const routes = {
  productsGlobal: '/global/products?',
  products: '/products?',
  neworder: '/retailer/orders/new'
};

@Injectable({
  providedIn: 'root'
})
export class NewOrderService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get Products.
   * @return Array of Products.
   */
  getProducts(context: ProductSearchContext): Observable<any> {
    let url = ``;
    if (context.storeId) {
      url = `${routes.products}query=${context.query}&storeId=${
        context.storeId
      }`;
    } else {
      url = `${routes.productsGlobal}query=${context.query}&regionId=${
        context.regionId
      }&page=${context.page}`;
    }
    return this.httpClient.get<ProductSearchResponse>(url).pipe(
      map((data: any) => ({
        data
      })),
      catchError(error => this.errorHandler(error))
    );
  }

  submitNewOrder(context: NewOrderBody): Observable<any> {
    return this.httpClient
      .post<NewOrderResponse>(`${routes.neworder}`, context)
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
