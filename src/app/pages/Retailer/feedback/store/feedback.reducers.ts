import { FeedbackAction, All } from './feedback.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface FeedbackState {
  feedbackTypesArray: any;
  feedbackSubmitObject: any;
  errorMessage: string | null;
}

export const initialState: FeedbackState = {
  errorMessage: null,
  feedbackTypesArray: [],
  feedbackSubmitObject: {}
};

export function feedbackReducer(
  state = initialState,
  action: All
): FeedbackState {
  switch (action.type) {

    // Feedback Types

    case FeedbackAction.FEEDBACKTYPES_SUCCESS: {
      return {
        ...state,
        feedbackTypesArray: action.payload.feedbackTypes.data,
        errorMessage: null
      };
    }
    case FeedbackAction.FEEDBACKTYPES_FAILURE: {
      return {
        ...state,
        feedbackTypesArray: [],
        errorMessage: null
      };
    }

    // Feedback Submit

    case FeedbackAction.FEEDBACKSUBMIT_SUCCESS: {
      return {
        ...state,
        feedbackSubmitObject: action.payload.feedbackSubmit,
        errorMessage: null
      };
    }
    case FeedbackAction.FEEDBACKSUBMIT_FAILURE: {
      return {
        ...state,
        feedbackSubmitObject: {},
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
