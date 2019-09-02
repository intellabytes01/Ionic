import { Action } from '@ngrx/store';

export enum InvoiceAction {
  INVOICELIST = '[Invoice] Invoice Types',
  INVOICELIST_SUCCESS = '[Invoice] Invoice Types Success',
  INVOICELIST_FAILURE = '[Invoice] Invoice Types Failure'
}

export class InvoiceList implements Action {
  readonly type = InvoiceAction.INVOICELIST;
  constructor(public payload: any) {}
}

export class InvoiceListSuccess implements Action {
  readonly type = InvoiceAction.INVOICELIST_SUCCESS;
  constructor(public payload: any) {}
}

export class InvoiceListFailure implements Action {
  readonly type = InvoiceAction.INVOICELIST_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | InvoiceList
  | InvoiceListSuccess
  | InvoiceListFailure;
