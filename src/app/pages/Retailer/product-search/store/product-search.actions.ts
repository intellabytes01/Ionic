import { Action } from '@ngrx/store';

export enum ProductSearchAction {
  PRODUCTSEARCH = '[ProductSearch] Product Search',
  PRODUCTSEARCH_SUCCESS = '[ProductSearch] Product Search Success',
  PRODUCTSEARCH_FAILURE = '[ProductSearch] Product Search Failure'
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

export type All =
  | ProductSearch
  | ProductSearchSuccess
  | ProductSearchFailure;
