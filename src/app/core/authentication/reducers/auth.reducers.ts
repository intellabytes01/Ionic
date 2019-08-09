import { User } from '../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';
import { createSelector } from '@ngrx/store';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  userData: User | null;
  // error message
  errorMessage: string | null;

  previousUrl: string | null;

  userId: string | null;

  isUserExists: boolean | null;
}

export const initialState: State = {
  isAuthenticated: false,
  userData: null,
  errorMessage: null,
  previousUrl: null,
  userId: null,
  isUserExists: null
};

export function authReducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.PREVIOUS_URL: {
      return {
        ...state,
        previousUrl: action.payload.previousUrl
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    case AuthActionTypes.SAVETOKEN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        userId: action.payload ? action.payload.userData.userSummary.UserId : null,
        errorMessage: null
      };
    }
    case AuthActionTypes.SAVETOKEN_FAIL: {
      return {
        ...state,
        errorMessage: 'Error'
      };
    }

    case AuthActionTypes.USEREXISTS_SUCCESS: {
      return {
        ...state,
        isUserExists: true
      };
    }
    case AuthActionTypes.USEREXISTS_FAILURE: {
      return {
        ...state,
        isUserExists: false,
        errorMessage: 'User is not Exists'
      };
    }

    case AuthActionTypes.TOKENREFRESH_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        errorMessage: null
      };
    }
    case AuthActionTypes.TOKENREFRESH_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}
