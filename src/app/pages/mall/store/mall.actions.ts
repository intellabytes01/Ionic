import { Action } from '@ngrx/store';

export enum MallAction {
  PHARMAPRODUCTS = '[Mall] Mall Products',
  PHARMAPRODUCTS_SUCCESS = '[Mall] Mall Products Success',
  PHARMAPRODUCTS_FAILURE = '[Mall] Mall Products Failure'
}

export class PharmaProducts implements Action {
  readonly type = MallAction.PHARMAPRODUCTS;
  constructor() {}
}

export class PharmaProductsSuccess implements Action {
  readonly type = MallAction.PHARMAPRODUCTS_SUCCESS;
  constructor(public payload: any) {}
}

export class PharmaProductsFailure implements Action {
  readonly type = MallAction.PHARMAPRODUCTS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | PharmaProducts
  | PharmaProductsSuccess
  | PharmaProductsFailure;
