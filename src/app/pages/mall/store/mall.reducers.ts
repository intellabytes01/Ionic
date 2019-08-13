import { MallAction, All } from './mall.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface MallState {
  mallProductsArray: any;
  errorMessage: string | null;
}

export const initialState: MallState = {
  errorMessage: null,
  mallProductsArray: []
};

export function mallReducer(
  state = initialState,
  action: All
): MallState {
  switch (action.type) {

    // Mall Products

    case MallAction.PHARMAPRODUCTS_SUCCESS: {
      return {
        ...state,
        mallProductsArray: action.payload.mallProducts.data,
        errorMessage: null
      };
    }
    case MallAction.PHARMAPRODUCTS_FAILURE: {
      return {
        ...state,
        mallProductsArray: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const mallProductsState = createFeatureSelector<MallState>('mall');

export const mallProductsData = createSelector(
  mallProductsState,
  coursesState => coursesState.mallProductsArray
);
