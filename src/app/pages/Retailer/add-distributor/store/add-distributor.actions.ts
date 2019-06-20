import { Action } from '@ngrx/store';

export enum AddDistributorAction {
  GETSTORES = '[Request] Get Request',
  GETSTORES_SUCCESS = '[Request] Get Request Success',
  GETSTORES_FAILURE = '[Request] Get Request Failure',
  REQUESTSUBMIT = '[Request] Request Submit',
  REQUESTSUBMIT_SUCCESS = '[Request] Request Submit Success',
  REQUESTSUBMIT_FAILURE = '[Request] Request Submit Failure'
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

export type All =
  | GetStores
  | GetStoresSuccess
  | GetStoresFailure
  | RequestSubmit
  | RequestSubmitSuccess
  | RequestSubmitFailure;
