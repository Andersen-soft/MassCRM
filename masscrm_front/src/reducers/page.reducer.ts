import { handleActions } from 'redux-actions';
import { IPageStore } from 'src/interfaces/store';
import { setPageAction } from '../actions';

const initialState: IPageStore = { currentPage: 1 };

export const pageReducer = handleActions(
  {
    [`${setPageAction}`]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
