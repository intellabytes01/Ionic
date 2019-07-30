import { SchemeAction, All } from './schemes.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchemesState } from './schemes.state';

export const initialState: SchemesState = {
  errorMessage: null,
  schemesArray: [],
  schemeCompaniesArray: [],
  schemeProductsArray: []
};

export function schemeReducer(
  state = initialState,
  action: All
): SchemesState {
  switch (action.type) {

    // Scheme

    case SchemeAction.SCHEMES_SUCCESS: {
      return {
        ...state,
        schemesArray: action.payload.schemes.data,
        errorMessage: null
      };
    }
    case SchemeAction.SCHEMES_FAILURE: {
      return {
        ...state,
        schemesArray: [],
        errorMessage: null
      };
    }

    // Scheme

    case SchemeAction.SCHEMECOMPANIES_SUCCESS: {
      return {
        ...state,
        schemeCompaniesArray: action.payload.schemeCompanies.data,
        errorMessage: null
      };
    }
    case SchemeAction.SCHEMECOMPANIES_FAILURE: {
      return {
        ...state,
        schemeCompaniesArray: [],
        errorMessage: null
      };
    }

    // Scheme Products

    case SchemeAction.SCHEMEPRODUCTS_SUCCESS: {
      return {
        ...state,
        schemeProductsArray: action.payload.schemeProducts.data,
        errorMessage: null
      };
    }
    case SchemeAction.SCHEMEPRODUCTS_FAILURE: {
      return {
        ...state,
        schemeProductsArray: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const schemeState = createFeatureSelector<SchemesState>('scheme');

export const schemesData = createSelector(
  schemeState,
  coursesState => coursesState.schemesArray
);

export const schemeCompaniesData = createSelector(
  schemeState,
  coursesState => coursesState.schemeCompaniesArray
);

export const schemeProductsData = createSelector(
  schemeState,
  coursesState => coursesState.schemeProductsArray
);
