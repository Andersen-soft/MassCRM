import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import getToken from 'src/services/getToken';
import fetchUser from 'src/services/fetchUser';
import ldapUser from 'src/services/ldapUser';
import sendAddUser from 'src/services/sendAddUser';
import patchEditUser from 'src/services/patchEditUser';
import getRolesReq from 'src/services/getRolesReq';
import { setToken } from 'src/services/setTokenToCookies';
import qs from 'qs';
import HTTP from '../utils/http';
import { IFilter } from '../interfaces';
import { IAddUserFormInputs } from '../components/UsersCRM/AddUserForm';

export const setUserDataAction = createAction('SET_USER_DATA');
export const setError = createAction('SET_ERROR');
export const getUsersAction = createAction('GET_USERS');
export const getUsersRolesAction = createAction('GET_USERS_ROLES');
export const getLdapUserAction = createAction('GET_LDAP_USER');
export const onClearFilter = createAction('CLEAR_FILTER_USERS');
export const getRolesAction = createAction('GET_ROLES');

export const getUserData = (payload: {
  login: string;
  password: string;
  handle: Function;
}) => async (dispatch: Dispatch) => {
  try {
    const tokenData = await getToken(payload.login, payload.password);
    setToken(String(tokenData));
    const userData = await fetchUser();
    dispatch(setUserDataAction({ userData }));
  } catch (e) {
    payload.handle();
    dispatch(setError({ errorText: 'Incorrect login or password.' }));
  }
};

export const clearFilter = (dispatch: Dispatch) => {
  dispatch(onClearFilter());
};

export const getUsers = (filter: IFilter) => async (dispatch: Dispatch) => {
  const response = await HTTP.get(`users`, {
    params: filter,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  const name: number = filter.page || 1;
  const { data, total }: any = response;
  dispatch(getUsersAction({ users: { [name]: data }, total }));
};

export const getAutocompleteData = async (filter: IFilter) => {
  try {
    return await HTTP.get(`users`, {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
};

export const getRoles = () => async (dispatch: Dispatch) => {
  try {
    const response = await HTTP.get(`users/roles`);
    dispatch(getUsersRolesAction({ roles: response }));
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
};

export const getLdapUser = (email: string) => async (dispatch: Dispatch) => {
  try {
    const response = await ldapUser(email);
    dispatch(getLdapUserAction({ ldapUser: response }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.payload.errors }));
  }
};

export const postAddUser = (
  user: IAddUserFormInputs,
  currentPage: number,
  handleAlert?: () => void,
  handleClose?: () => void
) => async (dispatch: Function) => {
  try {
    await sendAddUser(user);
    if (handleClose) {
      handleClose();
    }
    dispatch(getUsers({ page: currentPage, limit: 50 }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.payload.errors }));
    if (handleAlert) {
      handleAlert();
    }
  }
};

export const patchUser = (
  user: IAddUserFormInputs,
  id: number,
  currentPage: number,
  handleAlert?: () => void,
  handleClose?: () => void
) => async (dispatch: Function) => {
  try {
    await patchEditUser(user, id);
    if (handleClose) {
      handleClose();
    }
    dispatch(getUsers({ page: currentPage, limit: 50 }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.payload.errors }));
    if (handleAlert) {
      handleAlert();
    }
  }
};

export const getRolesDispatch = () => async (dispatch: Dispatch) => {
  try {
    const response = await getRolesReq();
    dispatch(getRolesAction({ roles: response }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.payload.errors }));
  }
};
