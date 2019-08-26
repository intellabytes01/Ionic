import { Action } from '@ngrx/store';

export enum NotificationAction {
  NOTIFICATIONLIST = '[Notification] Notification List',
  NOTIFICATIONLIST_SUCCESS = '[Notification] Notification List Success',
  NOTIFICATIONLIST_FAILURE = '[Notification] Notification List Failure'
}

export class NotificationList implements Action {
  readonly type = NotificationAction.NOTIFICATIONLIST;
  constructor(public payload: any) {}
}

export class NotificationListSuccess implements Action {
  readonly type = NotificationAction.NOTIFICATIONLIST_SUCCESS;
  constructor(public payload: any) {}
}

export class NotificationListFailure implements Action {
  readonly type = NotificationAction.NOTIFICATIONLIST_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | NotificationList
  | NotificationListSuccess
  | NotificationListFailure;
