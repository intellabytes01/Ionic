import { Action } from '@ngrx/store';

export enum SalesReturnAction {
  SALESRETURNTYPES = '[SalesReturn] SalesReturn Types',
  SALESRETURNTYPES_SUCCESS = '[SalesReturn] SalesReturn Types Success',
  SALESRETURNTYPES_FAILURE = '[SalesReturn] SalesReturn Types Failure',
  SALESRETURNSTORES = '[SalesReturn] SalesReturn Stores',
  SALESRETURNSTORES_SUCCESS = '[SalesReturn] SalesReturn Stores Success',
  SALESRETURNSTORES_FAILURE = '[SalesReturn] SalesReturn Stores Failure',
  SALESRETURNLIST = '[SalesReturn] SalesReturn List',
  SALESRETURNLIST_SUCCESS = '[SalesReturn] SalesReturn List Success',
  SALESRETURNLIST_FAILURE = '[SalesReturn] SalesReturn List Failure',
  SALESRETURNDETAILS = '[SalesReturn] SalesReturn Details',
  SALESRETURNDETAILS_SUCCESS = '[SalesReturn] SalesReturn Details Success',
  SALESRETURNDETAILS_FAILURE = '[SalesReturn] SalesReturn Details Failure',
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

export class SalesReturnStores implements Action {
  readonly type = SalesReturnAction.SALESRETURNSTORES;
  constructor() {}
}

export class SalesReturnStoresSuccess implements Action {
  readonly type = SalesReturnAction.SALESRETURNSTORES_SUCCESS;
  constructor(public payload: any) {}
}

export class SalesReturnStoresFailure implements Action {
  readonly type = SalesReturnAction.SALESRETURNSTORES_FAILURE;
  constructor(public payload: any) {}
}

export class SalesReturnList implements Action {
  readonly type = SalesReturnAction.SALESRETURNLIST;
  constructor(public payload: any) {}
}

export class SalesReturnListSuccess implements Action {
  readonly type = SalesReturnAction.SALESRETURNLIST_SUCCESS;
  constructor(public payload: any) {}
}

export class SalesReturnListFailure implements Action {
  readonly type = SalesReturnAction.SALESRETURNLIST_FAILURE;
  constructor(public payload: any) {}
}

export class SalesReturnDetails implements Action {
  readonly type = SalesReturnAction.SALESRETURNDETAILS;
  constructor(public payload: any) {}
}

export class SalesReturnDetailsSuccess implements Action {
  readonly type = SalesReturnAction.SALESRETURNDETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class SalesReturnDetailsFailure implements Action {
  readonly type = SalesReturnAction.SALESRETURNDETAILS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | SalesReturnTypes
  | SalesReturnTypesSuccess
  | SalesReturnTypesFailure
  | SalesReturnStores
  | SalesReturnStoresSuccess
  | SalesReturnStoresFailure
  | SalesReturnList
  | SalesReturnListSuccess
  | SalesReturnListFailure
  | SalesReturnDetails
  | SalesReturnDetailsSuccess
  | SalesReturnDetailsFailure;
