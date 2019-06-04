import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as businessType from './reducers/business-types.reducers';


export interface BusinessTypeState {
  businessTypeState: businessType.State;
}

export const businessTypeReducers = {
  businessType: businessType.businessTypeReducer
};

export const selectBusinessTypeState = createFeatureSelector<BusinessTypeState>('businessType');
