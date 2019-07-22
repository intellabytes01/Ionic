import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { ProductSearchResponse } from './store/product-search.state';

const log = new Logger('ProductSearch');
export interface ProductSearchContext {
  regionId: number;
  query: string;
  page: number;
}

const routes = {
  products: '/global/products?'
};

@Injectable()
export class ProductSearchService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get Products.
   * @return Array of Products.
   */
  getProducts(context: ProductSearchContext): Observable<any> {
    return this.httpClient
      .get<ProductSearchResponse>(
        `${routes.products}regionId=${context.regionId}&query=${
          context.query
        }&page=${context.page}`
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
