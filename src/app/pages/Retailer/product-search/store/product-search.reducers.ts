import { ProductSearchAction, All } from './product-search.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductSearchState {
  productSearchArray: any;
  errorMessage: string | null;
}

export const initialState: ProductSearchState = {
  errorMessage: null,
  productSearchArray: []
};

export function productSearchReducer(
  state = initialState,
  action: All
): ProductSearchState {
  switch (action.type) {

    // Product Search

    case ProductSearchAction.PRODUCTSEARCH_SUCCESS: {
      return {
        ...state,
        productSearchArray: action.payload.productSearch.data,
        errorMessage: null
      };
    }
    case ProductSearchAction.PRODUCTSEARCH_FAILURE: {
      return {
        ...state,
        productSearchArray: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const productSearchState = createFeatureSelector<ProductSearchState>('productSearch');

export const productSearchData = createSelector(
  productSearchState,
  coursesState => coursesState.productSearchArray
);
