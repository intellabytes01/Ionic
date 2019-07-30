import { Action } from '@ngrx/store';

export enum SchemeAction {
  SCHEMES = '[Scheme] Scheme Search',
  SCHEMES_SUCCESS = '[Scheme] Scheme Search Success',
  SCHEMES_FAILURE = '[Scheme] Scheme Search Failure',
  SCHEMECOMPANIES = '[Scheme] Scheme Stores',
  SCHEMECOMPANIES_SUCCESS = '[Scheme] Scheme Stores Success',
  SCHEMECOMPANIES_FAILURE = '[Scheme] Scheme Stores Failure',
  SCHEMEPRODUCTS = '[Scheme] Scheme Products',
  SCHEMEPRODUCTS_SUCCESS = '[Scheme] Scheme Products Success',
  SCHEMEPRODUCTS_FAILURE = '[Scheme] Scheme Products Failure',
}

export class Schemes implements Action {
  readonly type = SchemeAction.SCHEMES;
  constructor(public payload: any) {}
}

export class SchemesSuccess implements Action {
  readonly type = SchemeAction.SCHEMES_SUCCESS;
  constructor(public payload: any) {}
}

export class SchemesFailure implements Action {
  readonly type = SchemeAction.SCHEMES_FAILURE;
  constructor(public payload: any) {}
}

export class SchemeCompanies implements Action {
  readonly type = SchemeAction.SCHEMECOMPANIES;
  constructor(public payload: any) {}
}

export class SchemeCompaniesSuccess implements Action {
  readonly type = SchemeAction.SCHEMECOMPANIES_SUCCESS;
  constructor(public payload: any) {}
}

export class SchemeCompaniesFailure implements Action {
  readonly type = SchemeAction.SCHEMECOMPANIES_FAILURE;
  constructor(public payload: any) {}
}

export class SchemeProducts implements Action {
  readonly type = SchemeAction.SCHEMEPRODUCTS;
  constructor(public payload: any) {}
}

export class SchemeProductsSuccess implements Action {
  readonly type = SchemeAction.SCHEMEPRODUCTS_SUCCESS;
  constructor(public payload: any) {}
}

export class SchemeProductsFailure implements Action {
  readonly type = SchemeAction.SCHEMEPRODUCTS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | Schemes
  | SchemesSuccess
  | SchemesFailure
  | SchemeCompanies
  | SchemeCompaniesSuccess
  | SchemeCompaniesFailure
  | SchemeProducts
  | SchemeProductsSuccess
  | SchemeProductsFailure;
