import { OtpActionTypes, All } from './forgot-password.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface OtpState {
  sendOtpObject: any;
  verifyOtpObject: any;
  errorMessage: string | null;
}

export const initialState: OtpState = {
  errorMessage: null,
  sendOtpObject: {},
  verifyOtpObject: {}
};

export function otpReducer(
  state = initialState,
  action: All
): OtpState {
  switch (action.type) {
    // Send Otp

    case OtpActionTypes.SENDOTP_SUCCESS: {
      return {
        ...state,
        sendOtpObject: action.payload.sendOtp.data,
        errorMessage: null
      };
    }
    case OtpActionTypes.SENDOTP_FAILURE: {
      return {
        ...state,
        sendOtpObject: [],
        errorMessage: null
      };
    }

    // Verify Otp

    case OtpActionTypes.VERIFYOTP_SUCCESS: {
      return {
        ...state,
        verifyOtpObject: action.payload.verifyOtp.data,
        errorMessage: null
      };
    }
    case OtpActionTypes.VERIFYOTP_FAILURE: {
      return {
        ...state,
        verifyOtpObject: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const sendOtpState = createFeatureSelector<OtpState>('otp');

const verifyOtpState = createFeatureSelector<OtpState>('otp');

export const sendOtpData = createSelector(
  sendOtpState,
  coursesState => coursesState.sendOtpObject
);

export const verifyOtpData = createSelector(
  verifyOtpState,
  coursesState => coursesState.verifyOtpObject
);
