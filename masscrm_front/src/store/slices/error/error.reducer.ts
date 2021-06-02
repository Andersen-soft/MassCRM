import { handleActions } from 'redux-actions';
import { IErrorStore } from 'src/interfaces';
import { setErrorHTTPRequestAction } from '.';

type S = IErrorStore;

const initialState: IErrorStore = {
  data: ''
};

export const errorReducer = handleActions(
  {
    [`${setErrorHTTPRequestAction}`]: (
      state: S,
      { payload }: { payload: any }
    ): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
