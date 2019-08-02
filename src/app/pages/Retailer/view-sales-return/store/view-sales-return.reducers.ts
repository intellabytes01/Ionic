import { SalesReturnAction, All } from './view-sales-return.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesReturnState } from './view-sales-return.state';

export const initialState: SalesReturnState = {
  errorMessage: null,
  salesReturnTypesArray: [],
  salesReturnStoresArray: [],
  salesReturnListArray: [],
  salesReturnDetailsObject: {}
};

export function salesReturnReducer(
  state = initialState,
  action: All
): SalesReturnState {
  switch (action.type) {

    // SalesReturn Types

    case SalesReturnAction.SALESRETURNTYPES_SUCCESS: {
      return {
        ...state,
        salesReturnTypesArray: action.payload.salesReturnTypes.data,
        errorMessage: null
      };
    }
    case SalesReturnAction.SALESRETURNTYPES_FAILURE: {
      return {
        ...state,
        salesReturnTypesArray: [],
        errorMessage: null
      };
    }

    // SalesReturn Stores

    case SalesReturnAction.SALESRETURNSTORES_SUCCESS: {
      return {
        ...state,
        salesReturnStoresArray: action.payload.salesReturnStores.data,
        errorMessage: null
      };
    }
    case SalesReturnAction.SALESRETURNSTORES_FAILURE: {
      return {
        ...state,
        salesReturnStoresArray: [],
        errorMessage: null
      };
    }

    // SalesReturn List

    case SalesReturnAction.SALESRETURNLIST_SUCCESS: {
      return {
        ...state,
        salesReturnListArray: action.payload.salesReturnList.data,
        errorMessage: null
      };
    }
    case SalesReturnAction.SALESRETURNLIST_FAILURE: {
      return {
        ...state,
        salesReturnListArray: [],
        errorMessage: null
      };
    }

    // SalesReturn Details

    case SalesReturnAction.SALESRETURNDETAILS_SUCCESS: {
      return {
        ...state,
        salesReturnDetailsObject: action.payload.salesReturnDetails.data,
        errorMessage: null
      };
    }
    case SalesReturnAction.SALESRETURNDETAILS_FAILURE: {
      return {
        ...state,
        salesReturnDetailsObject: {},
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const salesReturnState = createFeatureSelector<SalesReturnState>('salesReturn');

export const salesReturnTypesData = createSelector(
  salesReturnState,
  coursesState => coursesState.salesReturnTypesArray
);

export const salesReturnStoresData = createSelector(
  salesReturnState,
  coursesState => coursesState.salesReturnStoresArray
);

export const salesReturnListData = createSelector(
  salesReturnState,
  coursesState => coursesState.salesReturnListArray
);

export const salesReturnDetailsData = createSelector(
  salesReturnState,
  coursesState => coursesState.salesReturnDetailsObject
);
