import { Action } from '@ngrx/store';

export enum MyOrderAction {
  MYORDERLIST = '[MyOrder] MyOrder List',
  MYORDER_SUCCESS = '[MyOrder] MyOrder Success',
  MYORDER_FAILURE = '[MyOrder] MyOrder Failure'
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

export type All =
  | MyOrderList
  | MyOrderSuccess
  | MyOrderFailure;
