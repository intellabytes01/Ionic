import { Action } from '@ngrx/store';

export enum NewOrderAction {
  PRODUCTSEARCH = '[ProductSearch] Product Search',
  PRODUCTSEARCH_SUCCESS = '[ProductSearch] Product Search Success',
  PRODUCTSEARCH_FAILURE = '[ProductSearch] Product Search Failure',
  NEWORDERSUBMIT = '[NewOrderSubmit] New Order Submit',
  NEWORDERSUBMIT_SUCCESS = '[NewOrderSubmit] New Order Submit Success',
  NEWORDERSUBMIT_FAILURE = '[NewOrderSubmit] New Order Submit Failure',
  NEWORDERSTORECONFIG = '[NewOrderStoreConfig] New Order Get Store Config',
  NEWORDERSTORECONFIG_SUCCESS = '[NewOrderStoreConfig] New Order Get Store Config Success',
  NEWORDERSTORECONFIG_FAILURE = '[NewOrderStoreConfig] New Order Get Store Config Failure'
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

export class NewOrderStoreConfig implements Action {
  readonly type = NewOrderAction.NEWORDERSTORECONFIG;
  constructor(public payload: any) {}
}

export class NewOrderGetStoreConfigSucess implements Action {
  readonly type = NewOrderAction.NEWORDERSTORECONFIG_SUCCESS;
  constructor(public payload: any) {}
}

export class NewOrderGetStoreConfigFailure implements Action {
  readonly type = NewOrderAction.NEWORDERSTORECONFIG_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | ProductSearch
  | ProductSearchSuccess
  | ProductSearchFailure
  | NewOrderSubmit
  | NewOrderSubmitSuccess
  | NewOrderSubmitFailure
  | NewOrderStoreConfig
  | NewOrderGetStoreConfigSucess
  | NewOrderGetStoreConfigFailure;
