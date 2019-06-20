import { AddDistributorAction, All } from './add-distributor.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AddDistributorState {
  storesArray: any;
  requestSubmitObject: any;
  errorMessage: string | null;
}

export const initialState: AddDistributorState = {
  errorMessage: null,
  storesArray: [],
  requestSubmitObject: {}
};

export function addDistributorReducer(
  state = initialState,
  action: All
): AddDistributorState {
  switch (action.type) {

    // Request Types

    case AddDistributorAction.GETSTORES_SUCCESS: {
      return {
        ...state,
        storesArray: action.payload.stores.data,
        errorMessage: null
      };
    }
    case AddDistributorAction.GETSTORES_FAILURE: {
      return {
        ...state,
        storesArray: [],
        errorMessage: null
      };
    }

    // Request Submit

    case AddDistributorAction.REQUESTSUBMIT_SUCCESS: {
      return {
        ...state,
        requestSubmitObject: action.payload.requestSubmit,
        errorMessage: null
      };
    }
    case AddDistributorAction.REQUESTSUBMIT_FAILURE: {
      return {
        ...state,
        requestSubmitObject: {},
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const storesState = createFeatureSelector<AddDistributorState>('AddDistributor');

export const storesData = createSelector(
  storesState,
  coursesState => coursesState.storesArray
);
