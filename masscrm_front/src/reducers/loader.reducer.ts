import { handleActions } from 'redux-actions';
import { setLoaderAction } from 'src/actions';
import { ILoaderStore } from 'src/interfaces/store';

type S = ILoaderStore;

const initialState: ILoaderStore = {
  isLoading: false
};

export const loaderReducer = handleActions(
  {
    [`${setLoaderAction}`]: (state, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
