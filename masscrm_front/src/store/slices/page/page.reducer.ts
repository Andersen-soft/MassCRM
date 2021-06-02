import { handleActions } from 'redux-actions';
import { IPageStore } from 'src/interfaces';
import { setPageAction } from '.';

type S = IPageStore;

const initialState: S = { currentPage: 1 };

export const pageReducer = handleActions(
  {
    [`${setPageAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
