import { DeliveryTrackerAction, All } from './delivery-tracker.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeliveryTrackerState } from './delivery-tracker.state';

export const initialState: DeliveryTrackerState = {
  deliveryTrackerArray: [],
  statusUpdate: false,
  errorMessage: null
};

export function deliveryTrackerReducer(
  state = initialState,
  action: All
): DeliveryTrackerState {
  switch (action.type) {
    // DeliveryTracker List

    case DeliveryTrackerAction.DELIVERYTRACKER_SUCCESS: {
      return {
        ...state,
        deliveryTrackerArray: action.payload.deliveryTracker.data,
        errorMessage: null
      };
    }
    case DeliveryTrackerAction.DELIVERYTRACKER_FAILURE: {
      return {
        ...state,
        deliveryTrackerArray: [],
        errorMessage: null
      };
    }

    // StatusUpdate List

    case DeliveryTrackerAction.STATUSUPDATE_SUCCESS: {
      return {
        ...state,
        statusUpdate: action.payload.statusUpdate.data,
        errorMessage: null
      };
    }
    case DeliveryTrackerAction.STATUSUPDATE_FAILURE: {
      return {
        ...state,
        statusUpdate: false,
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const deliveryTrackerState = createFeatureSelector<DeliveryTrackerState>(
  'deliveryTracker'
);

export const deliveryTrackerData = createSelector(
  deliveryTrackerState,
  coursesState => coursesState.deliveryTrackerArray
);

export const statusUpdateData = createSelector(
  deliveryTrackerState,
  coursesState => coursesState.statusUpdate
);
