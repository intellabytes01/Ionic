import { Action } from '@ngrx/store';


export enum ProfileActionTypes {
  IMAGEUPLOAD = '[Profile] ImageUpload Types',
  IMAGEUPLOAD_SUCCESS = '[Profile] ImageUpload Types Success',
  IMAGEUPLOAD_FAILURE = '[Profile] ImageUpload Types Failure'
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
  | ImageUpload
  | ImageUploadSuccess
  | ImageUploadFailure;
