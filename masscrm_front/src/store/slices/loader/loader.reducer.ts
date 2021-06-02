import { handleActions } from 'redux-actions';
import { ILoaderStore } from 'src/interfaces';
import { setLoaderAction } from '.';

type S = ILoaderStore;

const initialState: ILoaderStore = {
  isLoading: false
};

export const loaderReducer = handleActions(
  {
    [`${setLoaderAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
