import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('AdsGuard');

export interface AdsContext {
  userId: string;
  productId: string;
  slotId: number;
}

export interface AdsResponse {
  statusCode: number;
  success: boolean;
  data: AdsResponseData[];
  requestId: string;
  message: string;
}

export interface AdsResponseData {
  WebHtml: string;
  MobileHtml: string;
  TabHtml: string;
  IsActive: number;
}

const routes = {
  adsList: '/retailer/products/ads?'
};

@Injectable()
export class AdsService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get Ads List.
   * @return Array of Ads List.
   */
  getAdsList(context: AdsContext) {
    return this.httpClient
      .get<AdsResponse>(
        `${routes.adsList}userId=${context.userId}&productId=${context.productId}&slotId=${context.slotId}`
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
