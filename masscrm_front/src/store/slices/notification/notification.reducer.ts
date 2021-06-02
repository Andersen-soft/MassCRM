import { handleActions } from 'redux-actions';
import { INotificationStore } from 'src/interfaces';
import { setNotificationAction, setNotificationList } from '.';

type S = INotificationStore;

const initialState: S = {
  data: [],
  notification: ''
};

export const notificationReducer = handleActions(
  {
    [`${setNotificationAction}`]: (
      state: S,
      { payload }: { payload: string }
    ): S => ({
      ...state,
      notification: payload
    }),
    [`${setNotificationList}`]: (
      state: S,
      { payload }: { payload: any }
    ): S => ({
      ...state,
      data: [...payload]
    })
  },
  initialState
);
