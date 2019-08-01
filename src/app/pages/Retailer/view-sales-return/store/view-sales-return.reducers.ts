import { SalesReturnAction, All } from './view-sales-return.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesReturnState } from './view-sales-return.state';

export const initialState: SalesReturnState = {
  errorMessage: null,
  salesReturnTypesArray: []
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

    default: {
      return state;
    }
  }
}

const salesReturnTypesState = createFeatureSelector<SalesReturnState>('salesReturn');

export const salesReturnTypesData = createSelector(
  salesReturnTypesState,
  coursesState => coursesState.salesReturnTypesArray
);
