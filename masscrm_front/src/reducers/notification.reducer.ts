import { handleActions } from 'redux-actions';
import { setNotificationAction } from 'src/actions';
import { INotificationStore } from 'src/interfaces/store';

type S = INotificationStore;

const initialState: INotificationStore = {
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
    })
  },
  initialState
);
