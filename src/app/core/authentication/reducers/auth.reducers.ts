import { User } from '../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  userData: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  userData: null,
  errorMessage: null
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
        errorMessage: action.payload.data.message
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
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    case AuthActionTypes.SAVETOKEN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        errorMessage: null
      };
    }
    case AuthActionTypes.SAVETOKEN_FAIL: {
      return {
        ...state,
        errorMessage: 'Error'
      };
    }
    
    default: {
      return state;
    }
  }
}
