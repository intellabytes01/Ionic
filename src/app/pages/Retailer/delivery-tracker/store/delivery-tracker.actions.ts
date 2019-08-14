import { Action } from '@ngrx/store';

export enum DeliveryTrackerAction {
  DELIVERYTRACKER = '[DeliveryTracker] DeliveryTracker List',
  DELIVERYTRACKER_SUCCESS = '[DeliveryTracker] DeliveryTracker List Success',
  DELIVERYTRACKER_FAILURE = '[DeliveryTracker] DeliveryTracker List Failure',
  STATUSUPDATE = '[StatusUpdate] StatusUpdate',
  STATUSUPDATE_SUCCESS = '[StatusUpdate] StatusUpdate Success',
  STATUSUPDATE_FAILURE = '[StatusUpdate] StatusUpdate Failure',
}

export class DeliveryTracker implements Action {
  readonly type = DeliveryTrackerAction.DELIVERYTRACKER;
  constructor(public payload: any) {}
}

export class DeliveryTrackerSuccess implements Action {
  readonly type = DeliveryTrackerAction.DELIVERYTRACKER_SUCCESS;
  constructor(public payload: any) {}
}

export class DeliveryTrackerFailure implements Action {
  readonly type = DeliveryTrackerAction.DELIVERYTRACKER_FAILURE;
  constructor(public payload: any) {}
}

export class StatusUpdate implements Action {
  readonly type = DeliveryTrackerAction.STATUSUPDATE;
  constructor(public payload: any) {}
}

export class StatusUpdateSuccess implements Action {
  readonly type = DeliveryTrackerAction.STATUSUPDATE_SUCCESS;
  constructor(public payload: any) {}
}

export class StatusUpdateFailure implements Action {
  readonly type = DeliveryTrackerAction.STATUSUPDATE_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | DeliveryTracker
  | DeliveryTrackerSuccess
  | DeliveryTrackerFailure
  | StatusUpdate
  | StatusUpdateSuccess
  | StatusUpdateFailure;
