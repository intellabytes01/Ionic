import { DeliveryTrackerAction, All } from './delivery-tracker.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeliveryTrackerState } from './delivery-tracker.state';

export const initialState: DeliveryTrackerState = {
  deliveryTrackerArray: [],
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

    default: {
      return state;
    }
  }
}

const deliveryTrackerState = createFeatureSelector<DeliveryTrackerState>('deliveryTracker');

export const deliveryTrackerData = createSelector(
  deliveryTrackerState,
  coursesState => coursesState.deliveryTrackerArray
);
