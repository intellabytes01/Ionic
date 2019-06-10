import { Action } from '@ngrx/store';


export enum RegisterActionTypes {
  BUSINESSTYPES = '[Register] Business Types',
  BUSINESSTYPES_SUCCESS = '[Register] Business Types Success',
  BUSINESSTYPES_FAILURE = '[Register] Business Types Failure'
}

export class BusinessTypes implements Action {
  readonly type = RegisterActionTypes.BUSINESSTYPES;
  constructor() {}
}

export class BusinessTypesSuccess implements Action {
  readonly type = RegisterActionTypes.BUSINESSTYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class BusinessTypesFailure implements Action {
  readonly type = RegisterActionTypes.BUSINESSTYPES_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | BusinessTypes
  | BusinessTypesSuccess
  | BusinessTypesFailure;
