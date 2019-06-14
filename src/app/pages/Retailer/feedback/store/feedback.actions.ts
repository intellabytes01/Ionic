import { Action } from '@ngrx/store';


export enum FeedbackActionTypes {
  FEEDBACKTYPES = '[Feedback] Feedback Types',
  FEEDBACKTYPES_SUCCESS = '[Feedback] Feedback Types Success',
  FEEDBACKTYPES_FAILURE = '[Feedback] Feedback Types Failure',
}

export class FeedbackTypes implements Action {
  readonly type = FeedbackActionTypes.FEEDBACKTYPES;
  constructor() {}
}

export class FeedbackTypesSuccess implements Action {
  readonly type = FeedbackActionTypes.FEEDBACKTYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class FeedbackTypesFailure implements Action {
  readonly type = FeedbackActionTypes.FEEDBACKTYPES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | FeedbackTypes
  | FeedbackTypesSuccess
  | FeedbackTypesFailure;
