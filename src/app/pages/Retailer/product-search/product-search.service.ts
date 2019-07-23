import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { ProductSearchResponse, GenericSearchResponse, GenericDetailResponse } from './store/product-search.state';

const log = new Logger('ProductSearch');
export interface ProductSearchContext {
  regionId: number;
  query: string;
  page: number;
}

export interface GenericSearchContext {
  query: string;
  page: number;
}

export interface GenericDetailContext {
  GenericId: string;
}

const routes = {
  products: '/global/products?',
  generic: '/global/generics?',
  genericProducts: '/global/generic/',
  companies: '/global/companies?'
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

  getGeneric(context: GenericSearchContext): Observable<any> {
    return this.httpClient
      .get<GenericSearchResponse>(
        `${routes.generic}&query=${
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

  getGenericProducts(context: GenericDetailContext): Observable<any> {
    return this.httpClient
      .get<GenericDetailResponse>(
        `${routes.genericProducts}${
          context.GenericId
        }/products`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getCompanies(context: ProductSearchContext): Observable<any> {
    return this.httpClient
      .get<ProductSearchResponse>(
        `${routes.companies}regionId=${context.regionId}&query=${
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
