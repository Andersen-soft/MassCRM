import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import HTTP from '../utils/http';
import { SnackErrorBarData } from '../utils/errors';

export const setUserDataAction = createAction('SET_USER_DATA');

export const sendTokenGetUser = (
  token: string,
  errorsEventEmitter: any
) => async (dispatch: Dispatch) => {
  try {
    const {
      data: [tokenUser]
    } = await HTTP.get(`users/token?token=${token}`);
    dispatch(setUserDataAction({ userData: tokenUser }));
  } catch (errors) {
    const { error } = errors;
    errorsEventEmitter.emit('snackBarErrors', {
      errorsArray: SnackErrorBarData(error || ['Please try again'])
    });
  }
};
