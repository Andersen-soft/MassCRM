import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export const setNotificationAction = createAction('SET_NOTIFICATION');

export const setNotification = (information: {}) => (dispatch: Dispatch) => {
  dispatch(setNotificationAction(information));
};
