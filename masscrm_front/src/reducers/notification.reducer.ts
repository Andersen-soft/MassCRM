import { handleActions } from 'redux-actions';
import { setNotificationAction, setNotificationList } from 'src/actions';
import { INotificationStore } from 'src/interfaces/store';

type S = INotificationStore;

const initialState: INotificationStore = {
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
