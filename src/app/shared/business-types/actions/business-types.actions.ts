import { Action } from '@ngrx/store';


export enum BusinessTypeActionTypes {
  GETBUSSINESSTYPES = '[BusinessType] GetBussinessTypes',
  GETBUSSINESSTYPES_SUCCESS = '[BusinessType] GetBussinessTypes Success',
  GETBUSSINESSTYPES_FAILURE = '[BusinessType] GetBussinessTypes Failure'
}

export class GetBusinessType implements Action {
  readonly type = BusinessTypeActionTypes.GETBUSSINESSTYPES;
  constructor() {}
}

export class GetBusinessTypeSuccess implements Action {
  readonly type = BusinessTypeActionTypes.GETBUSSINESSTYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBusinessTypeFailure implements Action {
  readonly type = BusinessTypeActionTypes.GETBUSSINESSTYPES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | GetBusinessType
  | GetBusinessTypeSuccess
  | GetBusinessTypeFailure;
