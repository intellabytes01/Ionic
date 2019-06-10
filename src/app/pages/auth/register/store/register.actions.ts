import { Action } from '@ngrx/store';


export enum RegisterActionTypes {
  BUSINESSTYPES = '[Register] Business Types',
  BUSINESSTYPES_SUCCESS = '[Register] Business Types Success',
  BUSINESSTYPES_FAILURE = '[Register] Business Types Failure',
  REGIONS = '[Register] Region Types',
  REGIONS_SUCCESS = '[Register] Region Types Success',
  REGIONS_FAILURE = '[Register] Region Types Failure'
}

export class Regions implements Action {
  readonly type = RegisterActionTypes.REGIONS;
  constructor() {}
}

export class RegionsSuccess implements Action {
  readonly type = RegisterActionTypes.REGIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class RegionsFailure implements Action {
  readonly type = RegisterActionTypes.REGIONS_FAILURE;
  constructor(public payload: any) {}
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
  | BusinessTypesFailure
  | Regions
  | RegionsSuccess
  | RegionsFailure;
