import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';


export interface AuthState {
  authState: auth.State;
}

export const authReducers = {
  auth: auth.authReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');