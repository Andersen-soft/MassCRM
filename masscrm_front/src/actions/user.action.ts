import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import ldapUser from 'src/services/ldapUser';
import sendAddUser from 'src/services/sendAddUser';
import patchEditUser from 'src/services/patchEditUser';
import getRolesReq from 'src/services/getRolesReq';
import qs from 'qs';
import Cookies from 'js-cookie';
import HTTP from '../utils/http';
import {
  IFilter,
  IStoreState,
  IUser,
  IUsersFiltersRequestValues
} from '../interfaces';
import { IAddUserFormInputs } from '../components/UsersCRM/AddUserForm';
import { setLoaderAction } from './loader.action';
import { SnackErrorBarData } from '../utils/errors';
import { BACKEND_COMMON_ERROR } from '../constants/errors';

export const setUserDataAction = createAction('SET_USER_DATA');
export const setError = createAction('SET_ERROR');
export const getUsersAction = createAction('GET_USERS');
export const getUsersRolesAction = createAction('GET_USERS_ROLES');
export const getLdapUserAction = createAction('GET_LDAP_USER');
export const onClearFilter = createAction('CLEAR_FILTER_USERS');
export const getRolesAction = createAction('GET_ROLES');
export const getSearchUsers = createAction('GET_SEARCH_USERS');
export const deleteInactiveUserAction = createAction('DELETE_INACTIVE_USER');

export const getUserData = (payload: {
  login: string;
  password: string;
  handle: Function;
  errorsEventEmitter: any;
}) => async (dispatch: Dispatch) => {
  try {
    const {
      data: [tokenData]
    } = await HTTP.post('auth/login', {
      login: payload.login,
      password: payload.password
    });
    Cookies.set('token', String(tokenData.access_token));
    const {
      data: [userData]
    } = await HTTP.get('auth/user');
    dispatch(setUserDataAction({ userData }));
  } catch (errors) {
    const { login } = errors;
    payload.handle();
    payload.errorsEventEmitter.emit('snackBarErrors', {
      errorsArray: SnackErrorBarData(login || BACKEND_COMMON_ERROR)
    });
  }
};

export const logout = async () => {
  try {
    return await HTTP.get('/auth/logout');
  } catch (error) {
    return Promise.reject();
  }
};

export const refreshToken = async () => {
  try {
    const {
      data: [tokenData]
    } = await HTTP.get('/auth/refresh');
    Cookies.set('token', String(tokenData.access_token));
  } catch (e) {
    Cookies.remove('token');
    window.location.href = '/';
  }
};

export const clearFilter = (dispatch: Dispatch) => {
  dispatch(onClearFilter());
};

export const getUsers = (filter: IFilter) => async (dispatch: Dispatch) => {
  dispatch(setLoaderAction({ isLoading: true }));
  const { data, meta }: any = await HTTP.get(`users`, {
    params: filter,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  dispatch(getUsersAction({ users: data, total: meta.total }));
  dispatch(setLoaderAction({ isLoading: false }));
};

export const deleteInactiveUser = (
  id: number,
  errorsEventEmitter: any
) => async (dispatch: Dispatch, getState: () => IStoreState) => {
  try {
    const {
      filter: { usersSettings }
    } = getState();
    dispatch(setLoaderAction({ isLoading: true }));
    await HTTP.delete('users/delete', {
      params: {
        id
      }
    }).then(() => getUsers(usersSettings)(dispatch));
  } catch (error) {
    const { user } = error;
    errorsEventEmitter.emit('snackBarErrors', {
      errorsArray: SnackErrorBarData(user || BACKEND_COMMON_ERROR)
    });
  } finally {
    dispatch(setLoaderAction({ isLoading: false }));
  }
};

export const searchUsers = (filter: IFilter) => async (dispatch: Dispatch) => {
  const { data } = await HTTP.get(`users`, {
    params: filter,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  const fullName = data?.map(
    ({ name, surname }: IUser) => `${name} ${surname}`
  );
  dispatch(getSearchUsers({ searchUsers: data, fullName }));
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
    const { data } = await HTTP.get(`users/roles`);
    dispatch(getUsersRolesAction({ roles: data }));
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
};

export const getLdapUser = (email: string) => async (dispatch: Dispatch) => {
  try {
    const response = await ldapUser(email);
    dispatch(getLdapUserAction({ ldapUser: response }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.errors }));
  }
};

export const postAddUser = (
  user: IAddUserFormInputs,
  currentPage: number,
  filter: IUsersFiltersRequestValues,
  handleAlert?: () => void,
  handleClose?: () => void
) => async (dispatch: Function) => {
  try {
    await sendAddUser(user);
    if (handleClose) {
      handleClose();
    }
    dispatch(getUsers({ page: currentPage, limit: 50, search: { ...filter } }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.errors }));
    if (handleAlert) {
      handleAlert();
    }
  }
};

export const patchUser = (
  user: IAddUserFormInputs,
  id: number,
  currentPage: number,
  filter: IUsersFiltersRequestValues,
  handleAlert?: () => void,
  handleClose?: () => void
) => async (dispatch: Function) => {
  try {
    await patchEditUser(user, id);
    if (handleClose) {
      handleClose();
    }
    dispatch(getUsers({ page: currentPage, limit: 50, search: { ...filter } }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.errors }));
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
    dispatch(setError({ errorText: e.response.data.errors }));
  }
};

export const getUsersById = async (ids: number[]) => {
  const { data } = await HTTP.get('users/getUsersByIds', {
    params: { ids },
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'indices' });
    }
  });
  return data;
};
