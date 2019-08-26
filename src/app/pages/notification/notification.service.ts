import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromNotification from './store/notification.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';
import { NotificationTypeResponse } from './store/notification.state';

const log = new Logger('NotificationGuard');

export interface NotificationContext {
  userId: string;
}

const routes = {
  notificationList: '/notifications?'
};

@Injectable()
export class NotificationService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromNotification.NotificationState>
  ) {}

  /**
   * Get Notification List.
   * @return Array of Notification List.
   */
  getNotificationList(context: NotificationContext): Observable<any> {
    return this.httpClient
      .cache(false)
      .get<NotificationTypeResponse>(
        `${routes.notificationList}userId=${context.userId}`
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
