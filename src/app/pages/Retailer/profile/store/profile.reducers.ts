import { ProfileActionTypes, All } from './profile.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProfileState {
  saveProfileDetails: any;
  getProfileDetails: any;
  businessTypesArray: any;
  regionsArray: any;
  errorMessage: string | null;
}

export const initialState: ProfileState = {
  saveProfileDetails: {},
  getProfileDetails: {},
  businessTypesArray: {},
  regionsArray: {},
  errorMessage: null
};

export function profileReducer(
  state = initialState,
  action: All
): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.SAVEPROFILE_SUCCESS: {
      return {
        ...state,
        saveProfileDetails: action.payload.userProfile.message,
        errorMessage: null
      };
    }
    case ProfileActionTypes.SAVEPROFILE_FAILURE: {
      return {
        ...state,
        saveProfileDetails: [],
        errorMessage: null
      };
    }
    case ProfileActionTypes.BUSINESSTYPES_SUCCESS: {
      return {
        ...state,
        businessTypesArray: action.payload.businessTypes.data,
        errorMessage: null
      };
    }
    case ProfileActionTypes.BUSINESSTYPES_FAILURE: {
      return {
        ...state,
        businessTypesArray: [],
        errorMessage: null
      };
    }

    // Regions

    case ProfileActionTypes.REGIONS_SUCCESS: {
      return {
        ...state,
        regionsArray: action.payload.regions.data,
        errorMessage: null
      };
    }
    case ProfileActionTypes.REGIONS_FAILURE: {
      return {
        ...state,
        regionsArray: [],
        errorMessage: null
      };
    }

    // Get Profile Details

    case ProfileActionTypes.GETPROFILE_SUCCESS: {
      return {
        ...state,
        getProfileDetails: action.payload.userProfile,
        errorMessage: null
      };
    }
    case ProfileActionTypes.GETPROFILE_FAILURE: {
      return {
        ...state,
        getProfileDetails: [],
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}

const ProfileState = createFeatureSelector<ProfileState>('profile');

export const saveProfileDetails = createSelector(
  ProfileState,
  profilDetailState => profilDetailState.saveProfileDetails
);

export const getProfileDetails = createSelector(
  ProfileState,
  profileGetDetailState => profileGetDetailState.getProfileDetails.data
);

export const businessTypesData = createSelector(
  ProfileState,
  profileBusinessState => profileBusinessState.businessTypesArray
);

export const regionsData = createSelector(
  ProfileState,
  profileState2 => profileState2.regionsArray
);
