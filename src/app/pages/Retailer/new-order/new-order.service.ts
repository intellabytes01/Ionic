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
  retailerId: number;
}

export interface StoreConfigContext {
  retailerId: number;
}

const routes = {
  products: '/products?',
  neworder: '/retailer/orders/new',
  orderViaProduct: '/retailer/orders/products?',
  storeConfig: '/retailer/stores/configs?'
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
    return this.httpClient
      .get<ProductSearchResponse>(
        `${routes.products}query=${context.query}&storeId=${context.storeId}`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getProductsTab2(context: ProductSearchContext): Observable<any> {
    return this.httpClient
      .get<ProductSearchResponse>(
        `${routes.orderViaProduct}query=${context.query}&retailerId=${context.retailerId}`
      )
      .pipe(
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

  getStoreConfig(context: StoreConfigContext): Observable<any> {
    return this.httpClient
      .get<ProductSearchResponse>(
        `${routes.storeConfig}retailerId=${context.retailerId}`
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
