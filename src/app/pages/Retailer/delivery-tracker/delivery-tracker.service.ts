import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromDeliveryTracker from './store/delivery-tracker.state';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { DeliveryTrackerResponse } from './store/delivery-tracker.state';

const log = new Logger('delivery-trackerGuard');

export interface DeliveryTrackerContext {
  fromDate: string;
  toDate: string;
  status: string;
  query: string;
  store: string;
}

export interface StatusUpdateContext {
  invoiceDate: string;
  invoiceNumber: string;
  latitude: number;
  longitude: number;
  userId: number;
  partyCode: string;
  status: string;
  remarks: string;
}

const routes = {
  deliveryTracker: '/delivery_tracker'
};

@Injectable()
export class DeliveryTrackerService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromDeliveryTracker.DeliveryTrackerState>
  ) {}

  /**
   * Get DeliveryTracker List.
   * @return Array of DeliveryTracker List.
   */
  getDeliveryTrackerList(context: DeliveryTrackerContext): Observable<any> {
    return this.httpClient
      .get<DeliveryTrackerResponse>(
        `${routes.deliveryTracker}?fromDate=${context.fromDate}&toDate=${
          context.toDate
        }&status=${context.status}&query=${context.query}&store=${
          context.store
        }`
      )
      .pipe(
        map((data: any) => ({
          data
        })),
        catchError(error => this.errorHandler(error))
      );
  }

  updateStatus(context: StatusUpdateContext): Observable<any> {
    return this.httpClient
      .put<DeliveryTrackerResponse>(
        `${routes.deliveryTracker}`, context
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
