import { InvoiceAction, All } from './my-invoices.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './my-invoices.state';

export const initialState: InvoiceState = {
  errorMessage: null,
  invoiceArray: []
};

export function invoiceReducer(
  state = initialState,
  action: All
): InvoiceState {
  switch (action.type) {
    // Invoice

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
