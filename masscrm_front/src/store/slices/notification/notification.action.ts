import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import HTTP from 'src/utils/http';

export const setNotificationAction = createAction('SET_NOTIFICATION');
export const setNotificationList = createAction('SET_NOTIFICATION_LIST');

export const setNotification = (information: any) => (dispatch: Dispatch) => {
  dispatch(setNotificationAction(information));
};

export const getNotification = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get('/users/notifications');
    dispatch(setNotificationList(data));
  } catch (error) {
    setNotification(error);
  }
};

export const changeViewed = async (id: number) => {
  try {
    await HTTP.put(`/users/notifications/${id}`);
  } catch (error) {
    setNotification(error);
  }
};
