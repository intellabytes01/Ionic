import { NewOrderAction, All } from './new-order.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewOrderState } from './new-order.state';

export const initialState: NewOrderState = {
  errorMessage: null,
  productSearchArray: [],
  newOrderArray: [],
  storeConfigArray: []
};

export function newOrderReducer(
  state = initialState,
  action: All
): NewOrderState {
  switch (action.type) {

    // Product Search

    case NewOrderAction.PRODUCTSEARCH_SUCCESS: {
      return {
        ...state,
        productSearchArray: action.payload.productSearch.data,
        errorMessage: null
      };
    }
    case NewOrderAction.PRODUCTSEARCH_FAILURE: {
      return {
        ...state,
        productSearchArray: [],
        errorMessage: null
      };
    }

    // New Order Submit

    case NewOrderAction.NEWORDERSUBMIT_SUCCESS: {
      return {
        ...state,
        newOrderArray: action.payload.newOrder,
        errorMessage: null
      };
    }
    case NewOrderAction.NEWORDERSUBMIT_FAILURE: {
      return {
        ...state,
        newOrderArray: [],
        errorMessage: null
      };
    }

    case NewOrderAction.NEWORDERSTORECONFIG_SUCCESS: {
      return {
        ...state,
        storeConfigArray: action.payload.storeConfig,
        errorMessage: null
      };
    }
    case NewOrderAction.NEWORDERSTORECONFIG_FAILURE: {
      return {
        ...state,
        storeConfigArray: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}
