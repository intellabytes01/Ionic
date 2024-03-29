import { createFeatureSelector, createSelector, select } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';

export interface AuthState {
  authState: auth.State;
}

export const authReducers = {
  auth: auth.authReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getUserDetailsFromState = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData'];
  }
);

export const getUserId = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['userSummary']['UserId'];
  }
);

export const getRetailerStoreParties = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['retailerSummary'][
      'retailerStoreParties'
    ];
  }
);

export const isUserExists = createSelector(
  selectAuthState,
  userData => userData['isUserExists']
);

export const getRetailerName = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['retailerSummary']['retailerInfo'][
      'RetailerName'
    ];
  }
);

export const getUserName = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['userSummary']['Username'];
  }
);

export const getRetailerStatus = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['retailerSummary'][
      'retailerStatus'
    ];
  }
);

export const getRetailerId = createSelector(
  selectAuthState,
  userData => {
    if (userData && userData['userData']) {
      return userData['userData']['userData']['retailerSummary'][
        'retailerInfo'
      ]['RetailerId'];
    } else {
      return null;
    }
  }
);

export const getRegionId = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['userSummary']['RegionId'];
  }
);

export const isUserAuthorized = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['retailerSummary'][
      'retailerStatus'
    ];
  }
);

export const mappedParties = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['retailerSummary'][
      'retailerStoreParties'
    ] ? userData['userData']['userData']['retailerSummary'][
      'retailerStoreParties'
    ] : [];
  }
);

export const getUserImage = createSelector(
  selectAuthState,
  userData => {
    if (userData && userData['userData']) {
      return userData['userData']['userData']['userSummary']['Userimage'];
    }
  }
);

export const drugLicenseImage = createSelector(
  selectAuthState,
  userData => {
    return userData['userData']['userData']['userSummary']['Druglicenseimage'];
  }
);

export const isAuthenticated = createSelector(
  selectAuthState,
  userData => {
    return userData['userRegistered'];
  }
);
