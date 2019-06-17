import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromFeedback from './store/feedback.reducers';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('FeedbackGuard');

export interface FeedbackContext {
  subject: string;
  message: string;
  feedbackTo: string;
  toStoreId: number;
}

const routes = {
  feedbacktypes: '/feedback/types',
  feedbacksubmit: '/feedback'
};

@Injectable()
export class FeedbackService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromFeedback.FeedbackState>
  ) {}

  /**
   * Get Feedback Types.
   * @return Array of Feedback Types.
   */
  getFeedbackTypes(): Observable<any> {
    return this.httpClient.get(routes.feedbacktypes).pipe(
      map((data: any) => ({
        data
      })),
      tap(data => {}),
      catchError(error => this.errorHandler(error))
    );
  }

  submitFeedback(context: FeedbackContext): Observable<any> {
    return this.httpClient.post(routes.feedbacksubmit, context).pipe(
      map((data: any) => ({
        data
      })),
      tap(data => {
        console.log(data);
      }),
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
