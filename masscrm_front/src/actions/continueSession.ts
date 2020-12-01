import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { setError } from './user.action';
import HTTP from '../utils/http';

export const setUserDataAction = createAction('SET_USER_DATA');

export const continueSession = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: [userData]
    } = await HTTP.get('auth/user');
    dispatch(setUserDataAction({ userData }));
  } catch (e) {
    dispatch(setError({ errorText: e.response?.data.error }));
  }
};
