import { RegisterActionTypes, All } from './register.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RegisterState {
  businessTypesArray: any;
  errorMessage: string | null;
}

export const initialState: RegisterState = {
  errorMessage: null,
  businessTypesArray: []
};

export function registerReducer(state = initialState, action: All): RegisterState {
  switch (action.type) {
    case RegisterActionTypes.BUSINESSTYPES_SUCCESS: {
      return {
        ...state,
        businessTypesArray:  action.payload.businessTypes.data,
        errorMessage: null
      };
    }
    case RegisterActionTypes.BUSINESSTYPES_FAILURE: {
      return {
        ...state,
        businessTypesArray: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const businessTypesState = createFeatureSelector<RegisterState>('register');

export const businessTypesData = createSelector(
  businessTypesState,
  coursesState => coursesState.businessTypesArray

);
