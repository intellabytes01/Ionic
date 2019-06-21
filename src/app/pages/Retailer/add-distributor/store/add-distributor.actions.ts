import { Action } from '@ngrx/store';

export enum AddDistributorAction {
  GETSTORES = '[Request] Get Request',
  GETSTORES_SUCCESS = '[Request] Get Request Success',
  GETSTORES_FAILURE = '[Request] Get Request Failure',
  REQUESTSUBMIT = '[Request] Request Submit',
  REQUESTSUBMIT_SUCCESS = '[Request] Request Submit Success',
  REQUESTSUBMIT_FAILURE = '[Request] Request Submit Failure',
  GETSTATUS = '[Status] Get Status',
  GETSTATUS_SUCCESS = '[Status] Get Status Success',
  GETSTATUS_FAILURE = '[Status] Get Status Failure',
}

export class GetStores implements Action {
  readonly type = AddDistributorAction.GETSTORES;
  constructor(public payload: any) {}
}

export class GetStoresSuccess implements Action {
  readonly type = AddDistributorAction.GETSTORES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetStoresFailure implements Action {
  readonly type = AddDistributorAction.GETSTORES_FAILURE;
  constructor(public payload: any) {}
}

export class RequestSubmit implements Action {
  readonly type = AddDistributorAction.REQUESTSUBMIT;
  constructor(public payload: any) {}
}

export class RequestSubmitSuccess implements Action {
  readonly type = AddDistributorAction.REQUESTSUBMIT_SUCCESS;
  constructor(public payload: any) {}
}

export class RequestSubmitFailure implements Action {
  readonly type = AddDistributorAction.REQUESTSUBMIT_FAILURE;
  constructor(public payload: any) {}
}

export class GetStatus implements Action {
  readonly type = AddDistributorAction.GETSTATUS;
  constructor(public payload: any) {}
}

export class GetStatusSuccess implements Action {
  readonly type = AddDistributorAction.GETSTATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetStatusFailure implements Action {
  readonly type = AddDistributorAction.GETSTATUS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | GetStores
  | GetStoresSuccess
  | GetStoresFailure
  | RequestSubmit
  | RequestSubmitSuccess
  | RequestSubmitFailure
  | GetStatus
  | GetStatusSuccess
  | GetStatusFailure;
