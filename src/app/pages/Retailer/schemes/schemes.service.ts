import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { SchemesResponse, SchemeCompaniesResponse, SchemeProductsResponse } from './store/schemes.state';

const log = new Logger('Schemes');
export interface SchemesContext {
  regionId: number;
  companyId: number;
  query: number;
}

const routes = {
  schemes: '/schemes/company?',
  schemeCompanies: '/schemes/company/',
  schemeProducts: '/schemes/products'
};

@Injectable()
export class SchemeService {
  constructor(private httpClient: HttpClient) { }

  getSchemes(context: SchemesContext): Observable<any> {
    return this.httpClient
      .get<SchemesResponse>(
        `${routes.schemes}regionId=${context.regionId}`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getSchemeCompanies(context: SchemesContext): Observable<any> {
    return this.httpClient
      .get<SchemeCompaniesResponse>(
        `${routes.schemeCompanies}${context.companyId}?regionId=${context.regionId}`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  getSchemeProducts(context: SchemesContext): Observable<any> {
    return this.httpClient
      .get<SchemeProductsResponse>(
        `${routes.schemeProducts}regionId=${context.regionId}&query=${context.query}`
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
