import { Action } from '@ngrx/store';

export enum InvoiceAction {
  INVOICELIST = '[Invoice] Invoice Types',
  INVOICELIST_SUCCESS = '[Invoice] Invoice Types Success',
  INVOICELIST_FAILURE = '[Invoice] Invoice Types Failure',
  INVOICEDETAIL = '[Invoice] Invoice Details',
  INVOICEDETAIL_SUCCESS = '[Invoice] Invoice Details Success',
  INVOICEDETAIL_FAILURE = '[Invoice] Invoice Details Failure'
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

export class InvoiceDetail implements Action {
  readonly type = InvoiceAction.INVOICEDETAIL;
  constructor(public payload: any) {}
}

export class InvoiceDetailSuccess implements Action {
  readonly type = InvoiceAction.INVOICEDETAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class InvoiceDetailFailure implements Action {
  readonly type = InvoiceAction.INVOICEDETAIL_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | InvoiceList
  | InvoiceListSuccess
  | InvoiceListFailure
  | InvoiceDetail
  | InvoiceDetailSuccess
  | InvoiceDetailFailure;
