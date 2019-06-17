import { Action } from '@ngrx/store';

export enum FeedbackAction {
  FEEDBACKTYPES = '[Feedback] Feedback Types',
  FEEDBACKTYPES_SUCCESS = '[Feedback] Feedback Types Success',
  FEEDBACKTYPES_FAILURE = '[Feedback] Feedback Types Failure',
  FEEDBACKSUBMIT = '[Feedback] Feedback Submit',
  FEEDBACKSUBMIT_SUCCESS = '[Feedback] Feedback Submit Success',
  FEEDBACKSUBMIT_FAILURE = '[Feedback] Feedback Submit Failure'
}

export class FeedbackTypes implements Action {
  readonly type = FeedbackAction.FEEDBACKTYPES;
  constructor() {}
}

export class FeedbackTypesSuccess implements Action {
  readonly type = FeedbackAction.FEEDBACKTYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class FeedbackTypesFailure implements Action {
  readonly type = FeedbackAction.FEEDBACKTYPES_FAILURE;
  constructor(public payload: any) {}
}

export class FeedbackSubmit implements Action {
  readonly type = FeedbackAction.FEEDBACKSUBMIT;
  constructor(public payload: any) {}
}

export class FeedbackSubmitSuccess implements Action {
  readonly type = FeedbackAction.FEEDBACKSUBMIT_SUCCESS;
  constructor(public payload: any) {}
}

export class FeedbackSubmitFailure implements Action {
  readonly type = FeedbackAction.FEEDBACKSUBMIT_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FeedbackTypes
  | FeedbackTypesSuccess
  | FeedbackTypesFailure
  | FeedbackSubmit
  | FeedbackSubmitSuccess
  | FeedbackSubmitFailure;
