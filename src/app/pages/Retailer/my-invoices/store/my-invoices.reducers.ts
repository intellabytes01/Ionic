import { InvoiceAction, All } from './my-invoices.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './my-invoices.state';

export const initialState: InvoiceState = {
  errorMessage: null,
  invoiceArray: [],
  invoiceDetail: []
};

export function invoiceReducer(
  state = initialState,
  action: All
): InvoiceState {
  switch (action.type) {
    // Invoice List

    case InvoiceAction.INVOICELIST_SUCCESS: {
      return {
        ...state,
        invoiceArray: action.payload.invoiceList.data,
        errorMessage: null
      };
    }
    case InvoiceAction.INVOICELIST_FAILURE: {
      return {
        ...state,
        invoiceArray: [],
        errorMessage: null
      };
    }

    // Invoice Detail

    case InvoiceAction.INVOICEDETAIL_SUCCESS: {
      return {
        ...state,
        invoiceDetail: action.payload.invoiceDetail.data,
        errorMessage: null
      };
    }
    case InvoiceAction.INVOICEDETAIL_FAILURE: {
      return {
        ...state,
        invoiceDetail: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const invoiceState = createFeatureSelector<InvoiceState>('invoice');

export const invoiceData = createSelector(
  invoiceState,
  coursesState => coursesState.invoiceArray
);

export const invoiceDetailData = createSelector(
  invoiceState,
  coursesState => coursesState.invoiceDetail
);
