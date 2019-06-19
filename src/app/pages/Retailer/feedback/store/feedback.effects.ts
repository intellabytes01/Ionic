import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  FeedbackTypesSuccess,
  FeedbackTypesFailure,
  FeedbackSubmitSuccess,
  FeedbackSubmitFailure,
  FeedbackAction,
  FeedbackTypes,
  FeedbackSubmit
} from './feedback.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { FeedbackService } from '../feedback.service';
import { AlertService } from '@app/shared/services/alert.service';

@Injectable()
export class FeedbackEffects {
  constructor(
    private actions: Actions,
    private feedbackService: FeedbackService,
    private alert: AlertService
  ) {}

  // Feedback Types

  @Effect()
  FeedbackTypes: Observable<Action> = this.actions.pipe(
    ofType(FeedbackAction.FEEDBACKTYPES),
    map((action: FeedbackTypes) => {}),
    switchMap(() => {
      return this.feedbackService.getFeedbackTypes().pipe(
        map(data => {
          return new FeedbackTypesSuccess({ feedbackTypes: data['data'] });
        }),
        catchError(error => of(new FeedbackTypesFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  FeedbackTypesSuccess: Observable<any> = this.actions.pipe(
    ofType(FeedbackAction.FEEDBACKTYPES_SUCCESS)
  );

  @Effect({ dispatch: false })
  FeedbackTypesFailure: Observable<any> = this.actions.pipe(
    ofType(FeedbackAction.FEEDBACKTYPES_FAILURE)
  );

  // Feedback Submit

  @Effect()
  FeedbackSubmit: Observable<Action> = this.actions.pipe(
    ofType(FeedbackAction.FEEDBACKSUBMIT),
    map((action: FeedbackSubmit) => action.payload),
    switchMap((payload) => {
      return this.feedbackService.submitFeedback(payload).pipe(
        map(data => {
          return new FeedbackSubmitSuccess({ feedbackSubmit: data['data'] });
        }),
        catchError(error => of(new FeedbackSubmitFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  FeedbackSubmitSuccess: Observable<any> = this.actions.pipe(
    ofType(FeedbackAction.FEEDBACKSUBMIT_SUCCESS),
    tap(() => {
      this.alert.presentToast('Feedback submitted successfully.');
    })
  );

  @Effect({ dispatch: false })
  FeedbackSubmitFailure: Observable<any> = this.actions.pipe(
    ofType(FeedbackAction.FEEDBACKSUBMIT_FAILURE),
    tap(() => {
      this.alert.presentToast('Something went wrong, Please try again later.');
    })
  );
}
