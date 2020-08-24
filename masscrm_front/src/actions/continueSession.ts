import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import fetchUser from 'src/services/fetchUser';
import { setError } from './user.action';

export const setUserDataAction = createAction('SET_USER_DATA');

export const continueSession = () => async (dispatch: Dispatch) => {
  try {
    const userData = await fetchUser();

    dispatch(setUserDataAction({ userData }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.payload.message }));
  }
};
