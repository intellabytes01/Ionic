import { Action } from '@ngrx/store';

export enum MyOrderAction {
  MYORDERLIST = '[MyOrder] MyOrder List',
  MYORDER_SUCCESS = '[MyOrder] MyOrder Success',
  MYORDER_FAILURE = '[MyOrder] MyOrder Failure',
  MYORDERDETAILS = '[MyOrder] MyOrder Details',
  MYORDERDETAILS_SUCCESS = '[MyOrder] MyOrder Details Success',
  MYORDERDETAILS_FAILURE = '[MyOrder] MyOrder Details Failure'
}

export class MyOrderList implements Action {
  readonly type = MyOrderAction.MYORDERLIST;
  constructor(public payload: any) {}
}

export class MyOrderSuccess implements Action {
  readonly type = MyOrderAction.MYORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class MyOrderFailure implements Action {
  readonly type = MyOrderAction.MYORDER_FAILURE;
  constructor(public payload: any) {}
}

export class MyOrderDetails implements Action {
  readonly type = MyOrderAction.MYORDERDETAILS;
  constructor(public payload: any) {}
}

export class MyOrderDetailsSuccess implements Action {
  readonly type = MyOrderAction.MYORDERDETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class MyOrderDetailsFailure implements Action {
  readonly type = MyOrderAction.MYORDERDETAILS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | MyOrderList
  | MyOrderSuccess
  | MyOrderFailure
  | MyOrderDetails
  | MyOrderDetailsSuccess
  | MyOrderDetailsFailure;
