import { Action } from '@ngrx/store';

export enum SalesReturnAction {
  SALESRETURNTYPES = '[SalesReturn] SalesReturn Types',
  SALESRETURNTYPES_SUCCESS = '[SalesReturn] SalesReturn Types Success',
  SALESRETURNTYPES_FAILURE = '[SalesReturn] SalesReturn Types Failure',
}

export class SalesReturnTypes implements Action {
  readonly type = SalesReturnAction.SALESRETURNTYPES;
  constructor() {}
}

export class SalesReturnTypesSuccess implements Action {
  readonly type = SalesReturnAction.SALESRETURNTYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class SalesReturnTypesFailure implements Action {
  readonly type = SalesReturnAction.SALESRETURNTYPES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | SalesReturnTypes
  | SalesReturnTypesSuccess
  | SalesReturnTypesFailure;
