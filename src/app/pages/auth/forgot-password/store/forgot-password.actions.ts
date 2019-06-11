import { Action } from '@ngrx/store';


export enum OtpActionTypes {
  SENDOTP = '[Otp] Send Otp',
  SENDOTP_SUCCESS = '[Otp] Send Otp Success',
  SENDOTP_FAILURE = '[Otp] Send Otp Failure',
  VERIFYOTP = '[Otp] Verify Otp',
  VERIFYOTP_SUCCESS = '[Otp] Verify Otp Success',
  VERIFYOTP_FAILURE = '[Otp] Verify Otp Failure'
}

export class SendOtp implements Action {
  readonly type = OtpActionTypes.SENDOTP;
  constructor(public payload: any) {}
}

export class SendOtpSuccess implements Action {
  readonly type = OtpActionTypes.SENDOTP_SUCCESS;
  constructor(public payload: any) {}
}

export class SendOtpFailure implements Action {
  readonly type = OtpActionTypes.SENDOTP_FAILURE;
  constructor(public payload: any) {}
}

export class VerifyOtp implements Action {
  readonly type = OtpActionTypes.VERIFYOTP;
  constructor(public payload: any) {}
}

export class VerifyOtpSuccess implements Action {
  readonly type = OtpActionTypes.VERIFYOTP_SUCCESS;
  constructor(public payload: any) {}
}

export class VerifyOtpFailure implements Action {
  readonly type = OtpActionTypes.VERIFYOTP_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | SendOtp
  | SendOtpSuccess
  | SendOtpFailure
  | VerifyOtp
  | VerifyOtpSuccess
  | VerifyOtpFailure;
