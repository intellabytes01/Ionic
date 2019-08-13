import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromMall from './store/mall.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { MallTypeResponse } from './store/mall.state';

const log = new Logger('MallGuard');

export interface MallContext {
  subject: string;
  message: string;
  mallTo: string;
  toStoreId: number;
}

const routes = {
  mallProducts: '/pharmamall/products'
};

@Injectable()
export class MallService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromMall.MallState>
  ) {}

  /**
   * Get Mall Products.
   * @return Array of Mall Products.
   */
  getPharmaProducts(): Observable<any> {
    return this.httpClient.get<MallTypeResponse>(routes.mallProducts).pipe(
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
