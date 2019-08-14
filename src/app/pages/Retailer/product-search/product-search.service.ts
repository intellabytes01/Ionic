import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { ProductSearchResponse, GenericSearchResponse, GenericDetailResponse,
  CompanySearchResponse, CompanyStoresResponse, CompanyProductsResponse,
  DistributorSearchResponse, DistributorListResponse, GenericStoresResponse } from './store/product-search.state';

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

export interface GenericStoreContext {
  retailerId: number;
  regionId: number;
  productId: number;
  page: number;
}

export interface CompanyStoresContext {
  regionId: number;
  retailerId: number;
  slot: number;
  companyId: number;
}

export interface CompanyProductsContext {
  storeId: number;
  page: number;
  companyId: number;
}

export interface DistributorSearchContext {
  retailerId: number;
  regionId: number;
  query: string;
  page: number;
}

export interface DistributorCompaniesContext {
  storeId: number;
}

const routes = {
  products: '/global/products?',
  generic: '/global/generics?',
  genericProducts: '/global/generics/',
  genericStores: '/global/generics/products/stores?',
  companies: '/global/companies?',
  companyStores: '/global/companies/',
  distributors: '/global/stores?',
  distributorCompanies: '/global/stores/'
};

@Injectable()
export class ProductSearchService {
  constructor(private httpClient: HttpClient) { }

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

  getGenericStores(context: GenericStoreContext): Observable<any> {
    return this.httpClient
      .get<GenericStoresResponse>(
        `${routes.genericStores}productId=${context.productId}&regionId=${context.regionId}
        &retailerId=${context.retailerId}&page=${context.page}`
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
      .get<CompanySearchResponse>(
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

  getCompanyStores(context: CompanyStoresContext): Observable<any> {
    return this.httpClient
      .get<CompanyStoresResponse>(
        `${routes.companyStores}${context.companyId}?regionId=${context.regionId}&retailerId=${
        context.retailerId
        }&slot=${context.slot}`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getCompanyProducts(context: CompanyProductsContext): Observable<any> {
    return this.httpClient
      .get<CompanyProductsResponse>(
        `${routes.companyStores}${context.companyId}/products?storeId=${context.storeId}&page=${
        context.page}`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getDistributors(context: DistributorSearchContext): Observable<any> {
    return this.httpClient
      .get<DistributorSearchResponse>(
        `${routes.distributors}retailerId=${context.retailerId}&regionId=${context.regionId}&query=${
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

  getDistributorCompanies(context: DistributorCompaniesContext): Observable<any> {
    return this.httpClient
      .get<DistributorListResponse>(
        `${routes.distributorCompanies}${context.storeId}/companies`
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
