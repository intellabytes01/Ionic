import { Action } from '@ngrx/store';

export enum NewOrderAction {
  PRODUCTSEARCH = '[ProductSearch] Product Search',
  PRODUCTSEARCH_SUCCESS = '[ProductSearch] Product Search Success',
  PRODUCTSEARCH_FAILURE = '[ProductSearch] Product Search Failure',
  NEWORDERSUBMIT = '[NewOrderSubmit] New Order Submit',
  NEWORDERSUBMIT_SUCCESS = '[NewOrderSubmit] New Order Submit Success',
  NEWORDERSUBMIT_FAILURE = '[NewOrderSubmit] New Order Submit Failure',
}

export class ProductSearch implements Action {
  readonly type = NewOrderAction.PRODUCTSEARCH;
  constructor(public payload: any) {}
}

export class ProductSearchSuccess implements Action {
  readonly type = NewOrderAction.PRODUCTSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class ProductSearchFailure implements Action {
  readonly type = NewOrderAction.PRODUCTSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class NewOrderSubmit implements Action {
  readonly type = NewOrderAction.NEWORDERSUBMIT;
  constructor(public payload: any) {}
}

export class NewOrderSubmitSuccess implements Action {
  readonly type = NewOrderAction.NEWORDERSUBMIT_SUCCESS;
  constructor(public payload: any) {}
}

export class NewOrderSubmitFailure implements Action {
  readonly type = NewOrderAction.NEWORDERSUBMIT_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | ProductSearch
  | ProductSearchSuccess
  | ProductSearchFailure
  | NewOrderSubmit
  | NewOrderSubmitSuccess
  | NewOrderSubmitFailure;
