import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export const setLoaderAction = createAction('SET_LOADER');

export const setLoader = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setLoaderAction(value));
};
