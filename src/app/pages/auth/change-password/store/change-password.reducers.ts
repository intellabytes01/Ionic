import { ChangePasswordTypes, All } from './change-password.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ChangePasswordState {
  changePasswordObject: any;
  verifychangePasswordObject: any;
  errorMessage: string | null;
}

export const initialState: ChangePasswordState = {
  errorMessage: null,
  changePasswordObject: {},
  verifychangePasswordObject: {}
};

export function changePasswordReducer(
  state = initialState,
  action: All
): ChangePasswordState {
  switch (action.type) {
    // Send changePassword

    case ChangePasswordTypes.CHANGEPASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordObject: action.payload,
        errorMessage: null
      };
    }
    case ChangePasswordTypes.CHANGEPASSWORD_FAILURE: {
      return {
        ...state,
        changePasswordObject: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const changePasswordState = createFeatureSelector<ChangePasswordState>('changePassword');

export const changePasswordData = createSelector(
  changePasswordState,
  cPasswordState => cPasswordState.changePasswordObject
);
