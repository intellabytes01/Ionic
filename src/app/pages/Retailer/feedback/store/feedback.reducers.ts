import { FeedbackActionTypes, All } from './feedback.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface FeedbackState {
  feedbackTypesArray: any;
  errorMessage: string | null;
}

export const initialState: FeedbackState = {
  errorMessage: null,
  feedbackTypesArray: []
};

export function feedbackReducer(
  state = initialState,
  action: All
): FeedbackState {
  switch (action.type) {
    // Feedback Types

    case FeedbackActionTypes.FEEDBACKTYPES_SUCCESS: {
      return {
        ...state,
        feedbackTypesArray: action.payload.feedbackTypes.data,
        errorMessage: null
      };
    }
    case FeedbackActionTypes.FEEDBACKTYPES_FAILURE: {
      return {
        ...state,
        feedbackTypesArray: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const feedbackTypesState = createFeatureSelector<FeedbackState>('feedback');

export const feedbackTypesData = createSelector(
  feedbackTypesState,
  coursesState => coursesState.feedbackTypesArray
);
