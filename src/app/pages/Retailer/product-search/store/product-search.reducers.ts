import { ProductSearchAction, All } from './product-search.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductSearchState {
  productSearchArray: any;
  genericSearchArray: any;
  genericDetailArray: any;
  companySearchArray: any;
  companyStoresArray: any;
  companyProductsArray: any;
  errorMessage: string | null;
}

export const initialState: ProductSearchState = {
  errorMessage: null,
  productSearchArray: [],
  genericSearchArray: [],
  genericDetailArray: [],
  companySearchArray: [],
  companyStoresArray: [],
  companyProductsArray: []
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

    // Generic Search

    case ProductSearchAction.GENERICSEARCH_SUCCESS: {
      return {
        ...state,
        genericSearchArray: action.payload.genericSearch.data,
        errorMessage: null
      };
    }
    case ProductSearchAction.GENERICSEARCH_FAILURE: {
      return {
        ...state,
        genericSearchArray: [],
        errorMessage: null
      };
    }

    // Generic Detail

    case ProductSearchAction.GENERICDETAIL_SUCCESS: {
      return {
        ...state,
        genericDetailArray: action.payload.genericDetail.data,
        errorMessage: null
      };
    }
    case ProductSearchAction.GENERICDETAIL_FAILURE: {
      return {
        ...state,
        genericDetailArray: [],
        errorMessage: null
      };
    }

    // Company Search

    case ProductSearchAction.COMPANYSEARCH_SUCCESS: {
      return {
        ...state,
        companySearchArray: action.payload.companySearch.data,
        errorMessage: null
      };
    }
    case ProductSearchAction.COMPANYSEARCH_FAILURE: {
      return {
        ...state,
        companySearchArray: [],
        errorMessage: null
      };
    }

    // Company Stores

    case ProductSearchAction.COMPANYSTORES_SUCCESS: {
      return {
        ...state,
        companyStoresArray: action.payload.companyStores.data,
        errorMessage: null
      };
    }
    case ProductSearchAction.COMPANYSTORES_FAILURE: {
      return {
        ...state,
        companyStoresArray: [],
        errorMessage: null
      };
    }

    // Company Products

    case ProductSearchAction.COMPANYPRODUCTS_SUCCESS: {
      return {
        ...state,
        companyProductsArray: action.payload.companyProducts.data,
        errorMessage: null
      };
    }
    case ProductSearchAction.COMPANYPRODUCTS_FAILURE: {
      return {
        ...state,
        companyProductsArray: [],
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

export const genericSearchData = createSelector(
  productSearchState,
  coursesState => coursesState.genericSearchArray
);

export const genericDetailData = createSelector(
  productSearchState,
  coursesState => coursesState.genericDetailArray
);

export const companySearchData = createSelector(
  productSearchState,
  coursesState => coursesState.companySearchArray
);

export const companyStoresData = createSelector(
  productSearchState,
  coursesState => coursesState.companyStoresArray
);

export const companyProductsData = createSelector(
  productSearchState,
  coursesState => coursesState.companyProductsArray
);
