import { BusinessType } from '../models/business-types';
import { BusinessTypeActionTypes, All } from '../actions/business-types.actions';


export interface State {
  businessType: BusinessType | {};
  errorMessage: string | null;
}

export const initialState: State = {
  businessType: {},
  errorMessage: null
};

export function businessTypeReducer(state = initialState, action: All): State {
  switch (action.type) {
    case BusinessTypeActionTypes.GETBUSSINESSTYPES_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case BusinessTypeActionTypes.GETBUSSINESSTYPES_FAILURE: {
      return {
        ...state,
        errorMessage: ''
      };
    }

  }
}
