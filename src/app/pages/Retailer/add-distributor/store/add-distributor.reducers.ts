import { AddDistributorAction, All } from './add-distributor.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AddDistributorState {
  storesArray: any;
  requestSubmitObject: any;
  statusArray: any;
  distributorSubmitObject: any;
  errorMessage: string | null;
}

export const initialState: AddDistributorState = {
  errorMessage: null,
  storesArray: [],
  requestSubmitObject: {},
  distributorSubmitObject: {},
  statusArray: []
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

    // Status

    case AddDistributorAction.GETSTATUS_SUCCESS: {
      return {
        ...state,
        statusArray: action.payload.statusList.data,
        errorMessage: null
      };
    }
    case AddDistributorAction.GETSTATUS_FAILURE: {
      return {
        ...state,
        statusArray: [],
        errorMessage: null
      };
    }

    // Distributor Submit

    case AddDistributorAction.DISTRIBUTORSUBMIT_SUCCESS: {
      return {
        ...state,
        distributorSubmitObject: action.payload.distributorSubmit,
        errorMessage: null
      };
    }
    case AddDistributorAction.DISTRIBUTORSUBMIT_FAILURE: {
      return {
        ...state,
        distributorSubmitObject: {},
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

const statusState = createFeatureSelector<AddDistributorState>('AddDistributor');

export const statusData = createSelector(
  statusState,
  coursesState => coursesState.statusArray
);
