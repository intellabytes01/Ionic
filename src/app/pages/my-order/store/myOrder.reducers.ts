import { MyOrderAction, All } from './myOrder.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MyOrderState {
  myOrderArray: any;
  myOrderSubmitObject: any;
  errorMessage: string | null;
}

export const initialState: MyOrderState = {
  errorMessage: null,
  myOrderArray: [],
  myOrderSubmitObject: {}
};

export function myOrderReducer(
  state = initialState,
  action: All
): MyOrderState {
  switch (action.type) {
    case MyOrderAction.MYORDER_SUCCESS: {
      return {
        ...state,
        myOrderArray: action.payload.myOrders.data,
        errorMessage: null
      };
    }
    case MyOrderAction.MYORDER_FAILURE: {
      return {
        ...state,
        myOrderArray: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const myOrderState = createFeatureSelector<MyOrderState>('myOrder');

export const myOrderData = createSelector(
  myOrderState,
  orderState => orderState.myOrderArray
);
