import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  SAVETOKEN = '[Auth] Save Token',
  SAVETOKEN_SUCCESS = '[Auth] Save Token Success',
  SAVETOKEN_FAIL = '[Auth] Save Token Fail',
  PREVIOUS_URL = '[Route] Previous Url',
  USEREXISTS = '[Auth] User Exists',
  USEREXISTS_SUCCESS = '[Auth] User Exists Success',
  USEREXISTS_FAILURE = '[Auth] User Exists Failure',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export class SaveToken implements Action {
  readonly type = AuthActionTypes.SAVETOKEN;
  constructor() {}
}

export class SaveTokenSuccess implements Action {
  readonly type = AuthActionTypes.SAVETOKEN_SUCCESS;
  constructor(public payload: any) {}
}

export class SaveTokenFail implements Action {
  readonly type = AuthActionTypes.SAVETOKEN_FAIL;
  constructor(public payload: any) {}
}
export class GetPreviousUrl implements Action {
  readonly type = AuthActionTypes.PREVIOUS_URL;
  constructor(public payload: any) {}
}

export class UserExists implements Action {
  readonly type = AuthActionTypes.USEREXISTS;
  constructor(public payload: any) {}
}

export class UserExistsSuccess implements Action {
  readonly type = AuthActionTypes.USEREXISTS_SUCCESS;
  constructor(public payload: any) {}
}

export class UserExistsFailure implements Action {
  readonly type = AuthActionTypes.USEREXISTS_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | GetStatus
  | SaveToken
  | SaveTokenSuccess
  | SaveTokenFail
  | GetPreviousUrl
  | UserExists
  | UserExistsSuccess
  | UserExistsFailure;
