import { ProfileActionTypes, All } from './profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProfileState {
  imageUploadObject: any;
  errorMessage: string | null;
}

export const initialState: ProfileState = {
  errorMessage: null,
  imageUploadObject: {}
};

export function profileReducer(
  state = initialState,
  action: All
): ProfileState {
  switch (action.type) {

    // ImageUpload

    case ProfileActionTypes.IMAGEUPLOAD_SUCCESS: {
      return {
        ...state,
        imageUploadObject: action.payload.imageUpload.data,
        errorMessage: null
      };
    }
    case ProfileActionTypes.IMAGEUPLOAD_FAILURE: {
      return {
        ...state,
        imageUploadObject: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const imageUploadState = createFeatureSelector<ProfileState>('profile');

export const imageUploadData = createSelector(
  imageUploadState,
  coursesState => coursesState.imageUploadObject
);
