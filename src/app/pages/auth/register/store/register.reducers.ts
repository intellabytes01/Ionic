import { RegisterActionTypes, All } from "./register.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface RegisterState {
  businessTypesArray: any;
  regionsArray: any;
  errorMessage: string | null;
}

export const initialState: RegisterState = {
  errorMessage: null,
  businessTypesArray: [],
  regionsArray: []
};

export function registerReducer(
  state = initialState,
  action: All
): RegisterState {
  switch (action.type) {
    //Business Types

    case RegisterActionTypes.BUSINESSTYPES_SUCCESS: {
      return {
        ...state,
        businessTypesArray: action.payload.businessTypes.data,
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

    //Regions

    case RegisterActionTypes.REGIONS_SUCCESS: {
      return {
        ...state,
        regionsArray: action.payload.regions.data,
        errorMessage: null
      };
    }
    case RegisterActionTypes.REGIONS_FAILURE: {
      return {
        ...state,
        regionsArray: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const businessTypesState = createFeatureSelector<RegisterState>("register");

const regionsState = createFeatureSelector<RegisterState>("register");

export const businessTypesData = createSelector(
  businessTypesState,
  coursesState => coursesState.businessTypesArray
);

export const regionsData = createSelector(
  regionsState,
  coursesState => coursesState.regionsArray
);
