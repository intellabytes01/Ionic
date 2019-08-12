import { Action } from '@ngrx/store';


export enum ProfileActionTypes {
  SAVEPROFILE = '[Profile] User Profile',
  SAVEPROFILE_SUCCESS = '[Profile] User Profile Success',
  SAVEPROFILE_FAILURE = '[Profile] User Profile Failure',
  GETPROFILE = '[Profile] Get User Profile',
  GETPROFILE_SUCCESS = '[Profile] Get User Profile Success',
  GETPROFILE_FAILURE = '[Profile] Get User Profile Failure',
  BUSINESSTYPES = '[Profile] Business Types',
  BUSINESSTYPES_SUCCESS = '[Profile] Business Types Success',
  BUSINESSTYPES_FAILURE = '[Profile] Business Types Failure',
  REGIONS = '[Profile] Region Types',
  REGIONS_SUCCESS = '[Profile] Region Types Success',
  REGIONS_FAILURE = '[Profile] Region Types Failure',
  IMAGEUPLOAD = '[Profile] Image Upload',
  IMAGEUPLOAD_SUCCESS = '[Profile] Image Upload Success',
  IMAGEUPLOAD_FAILURE = '[Profile] Image Upload Failure',
}

export class SaveProfileDetails implements Action {
  readonly type = ProfileActionTypes.SAVEPROFILE;
  constructor(public payload: any) {}
}

export class SaveProfileSuccess implements Action {
  readonly type = ProfileActionTypes.SAVEPROFILE_SUCCESS;
  constructor(public payload: any) {}
}

export class SaveProfileFailure implements Action {
  readonly type = ProfileActionTypes.SAVEPROFILE_FAILURE;
  constructor(public payload: any) {}
}


export class GetProfileDetails implements Action {
  readonly type = ProfileActionTypes.GETPROFILE;
  constructor(public payload: any) {}
}

export class GetProfileSuccess implements Action {
  readonly type = ProfileActionTypes.GETPROFILE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProfileFailure implements Action {
  readonly type = ProfileActionTypes.GETPROFILE_FAILURE;
  constructor(public payload: any) {}
}


export class Regions implements Action {
  readonly type = ProfileActionTypes.REGIONS;
  constructor() {}
}

export class RegionsSuccess implements Action {
  readonly type = ProfileActionTypes.REGIONS_SUCCESS;
  constructor(public payload: any) {}
}

export class RegionsFailure implements Action {
  readonly type = ProfileActionTypes.REGIONS_FAILURE;
  constructor(public payload: any) {}
}

export class BusinessTypes implements Action {
  readonly type = ProfileActionTypes.BUSINESSTYPES;
  constructor() {}
}

export class BusinessTypesSuccess implements Action {
  readonly type = ProfileActionTypes.BUSINESSTYPES_SUCCESS;
  constructor(public payload: any) {}
}

export class BusinessTypesFailure implements Action {
  readonly type = ProfileActionTypes.BUSINESSTYPES_FAILURE;
  constructor(public payload: any) {}
}

export class ImageUpload implements Action {
  readonly type = ProfileActionTypes.IMAGEUPLOAD;
  constructor(public payload: any) {}
}

export class ImageUploadSuccess implements Action {
  readonly type = ProfileActionTypes.IMAGEUPLOAD_SUCCESS;
  constructor(public payload: any) {}
}

export class ImageUploadFailure implements Action {
  readonly type = ProfileActionTypes.IMAGEUPLOAD_FAILURE;
  constructor(public payload: any) {}
}

export type All =
  | SaveProfileDetails
  | SaveProfileSuccess
  | SaveProfileFailure
  | BusinessTypes
  | BusinessTypesSuccess
  | BusinessTypesFailure
  | Regions
  | RegionsSuccess
  | RegionsFailure
  | GetProfileDetails
  | GetProfileSuccess
  | GetProfileFailure
  | ImageUpload
  | ImageUploadSuccess
  | ImageUploadFailure;
