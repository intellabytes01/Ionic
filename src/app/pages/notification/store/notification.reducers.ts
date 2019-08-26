import { NotificationAction, All } from './notification.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface NotificationState {
  notificationListArray: any;
  errorMessage: string | null;
}

export const initialState: NotificationState = {
  errorMessage: null,
  notificationListArray: []
};

export function notificationReducer(
  state = initialState,
  action: All
): NotificationState {
  switch (action.type) {

    // Notification List

    case NotificationAction.NOTIFICATIONLIST_SUCCESS: {
      return {
        ...state,
        notificationListArray: action.payload.notificationList.data,
        errorMessage: null
      };
    }
    case NotificationAction.NOTIFICATIONLIST_FAILURE: {
      return {
        ...state,
        notificationListArray: [],
        errorMessage: null
      };
    }

    default: {
      return state;
    }
  }
}

const notificationListState = createFeatureSelector<NotificationState>('notification');

export const notificationListData = createSelector(
  notificationListState,
  coursesState => coursesState.notificationListArray
);
