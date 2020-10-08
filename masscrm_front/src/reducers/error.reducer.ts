import { handleActions } from 'redux-actions';
import { setErrorHTTPRequestAction } from 'src/actions';
import { IErrorStore } from 'src/interfaces/store';

type S = IErrorStore;

const initialState: IErrorStore = {
  data: undefined
};

export const errorReducer = handleActions(
  {
    [`${setErrorHTTPRequestAction}`]: (
      state: S,
      { payload }: { payload: string }
    ): S => ({
      ...state,
      data: payload
    })
  },
  initialState
);
