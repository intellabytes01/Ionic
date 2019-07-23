import { Action } from '@ngrx/store';

export enum ProductSearchAction {
  PRODUCTSEARCH = '[ProductSearch] Product Search',
  PRODUCTSEARCH_SUCCESS = '[ProductSearch] Product Search Success',
  PRODUCTSEARCH_FAILURE = '[ProductSearch] Product Search Failure',
  GENERICSEARCH = '[ProductSearch] Generic Search',
  GENERICSEARCH_SUCCESS = '[ProductSearch] Generic Search Success',
  GENERICSEARCH_FAILURE = '[ProductSearch] Generic Search Failure',
  GENERICDETAIL = '[ProductSearch] Generic Detail',
  GENERICDETAIL_SUCCESS = '[ProductSearch] Generic Detail Success',
  GENERICDETAIL_FAILURE = '[ProductSearch] Generic Detail Failure',
  COMPANYSEARCH = '[ProductSearch] Company Search',
  COMPANYSEARCH_SUCCESS = '[ProductSearch] Company Search Success',
  COMPANYSEARCH_FAILURE = '[ProductSearch] Company Search Failure',
}

export class ProductSearch implements Action {
  readonly type = ProductSearchAction.PRODUCTSEARCH;
  constructor(public payload: any) {}
}

export class ProductSearchSuccess implements Action {
  readonly type = ProductSearchAction.PRODUCTSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class ProductSearchFailure implements Action {
  readonly type = ProductSearchAction.PRODUCTSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class GenericSearch implements Action {
  readonly type = ProductSearchAction.GENERICSEARCH;
  constructor(public payload: any) {}
}

export class GenericSearchSuccess implements Action {
  readonly type = ProductSearchAction.GENERICSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class GenericSearchFailure implements Action {
  readonly type = ProductSearchAction.GENERICSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export class GenericDetail implements Action {
  readonly type = ProductSearchAction.GENERICDETAIL;
  constructor(public payload: any) {}
}

export class GenericDetailSuccess implements Action {
  readonly type = ProductSearchAction.GENERICDETAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class GenericDetailFailure implements Action {
  readonly type = ProductSearchAction.GENERICDETAIL_FAILURE;
  constructor(public payload: any) {}
}

export class CompanySearch implements Action {
  readonly type = ProductSearchAction.COMPANYSEARCH;
  constructor(public payload: any) {}
}

export class CompanySearchSuccess implements Action {
  readonly type = ProductSearchAction.COMPANYSEARCH_SUCCESS;
  constructor(public payload: any) {}
}

export class CompanySearchFailure implements Action {
  readonly type = ProductSearchAction.COMPANYSEARCH_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | ProductSearch
  | ProductSearchSuccess
  | ProductSearchFailure
  | GenericSearch
  | GenericSearchSuccess
  | GenericSearchFailure
  | GenericDetail
  | GenericDetailSuccess
  | GenericDetailFailure
  | CompanySearch
  | CompanySearchSuccess
  | CompanySearchFailure;
