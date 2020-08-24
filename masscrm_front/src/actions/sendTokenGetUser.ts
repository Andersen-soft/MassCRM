import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import sendToken from 'src/services/sendToken';

export const setUserDataAction = createAction('SET_USER_DATA');

export const sendTokenGetUser = (token: string) => async (
  dispatch: Dispatch
) => {
  try {
    const user = await sendToken(token);
    dispatch(setUserDataAction({ userData: user }));
  } catch (e) {
    dispatch(setUserDataAction({ userData: e.response.data.payload }));
  }
};
