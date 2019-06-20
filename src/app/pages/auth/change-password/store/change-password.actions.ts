import { Action } from '@ngrx/store';


export enum ChangePasswordTypes {
  CHANGEPASSWORD = '[changePassword] Change Password',
  CHANGEPASSWORD_SUCCESS = '[changePassword] Change Password Success',
  CHANGEPASSWORD_FAILURE = '[changePassword] Change Password Failure'
}

export class ChangePassword implements Action {
  readonly type = ChangePasswordTypes.CHANGEPASSWORD;
  constructor(public payload: any) {}
}

export class ChangePasswordSuccess implements Action {
  readonly type = ChangePasswordTypes.CHANGEPASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ChangePasswordFailure implements Action {
  readonly type = ChangePasswordTypes.CHANGEPASSWORD_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailure;
