import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export const setErrorHTTPRequestAction = createAction('SET_HTTP_REQUEST_ERROR');

export const setErrorHTTPRequest = (data?: string | JSX.Element) => (
  dispatch: Dispatch
) => {
  dispatch(setErrorHTTPRequestAction({ data }));
};
