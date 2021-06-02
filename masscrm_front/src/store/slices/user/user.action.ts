import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import qs from 'qs';
import Cookies from 'js-cookie';
import { SnackErrorBarData, mapErrorsList } from 'src/utils';
import history from 'src/utils/history';
import HTTP from 'src/utils/http';
import {
  BACKEND_COMMON_ERROR,
  SNACKBAR_ERRORS,
  NAVIGATION_CONFIG
} from 'src/constants';
import {
  IFilter,
  IStoreState,
  IUser,
  IUpdateAddUser,
  ICreateAddUser
} from 'src/interfaces';
import { store } from 'src/store/configureStore';
import { setAutocompleteAction, setLoaderAction } from '..';

export const setUserDataAction = createAction('SET_USER_DATA');
export const setError = createAction('SET_ERROR');
export const getUsersAction = createAction('GET_USERS');
export const getUsersRolesAction = createAction('GET_USERS_ROLES');
export const getLdapUserAction = createAction('GET_LDAP_USER');
export const onClearFilter = createAction('CLEAR_FILTER_USERS');
export const getRolesAction = createAction('GET_ROLES');
export const getSearchUsers = createAction('GET_SEARCH_USERS');
export const deleteInactiveUserAction = createAction('DELETE_INACTIVE_USER');
export const resetUsersFullName = createAction('RESET_USERS_FULL_NAME');

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
    Cookies.set('token', `${tokenData.access_token}`);
    const {
      data: [userData]
    } = await HTTP.get('auth/user');
    const [userRole] = Object.keys(userData.roles);
    const { defaultPage } = NAVIGATION_CONFIG[userRole];
    dispatch(setUserDataAction({ userData }));
    history.push(defaultPage);
  } catch (errors) {
    const errorsList = mapErrorsList(errors);
    payload.handle();
    payload.errorsEventEmitter.emit(SNACKBAR_ERRORS, {
      errorsArray: SnackErrorBarData(errorsList || BACKEND_COMMON_ERROR)
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
    Cookies.set('token', `${tokenData.access_token}`);
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
    errorsEventEmitter.emit(SNACKBAR_ERRORS, {
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

export const getUsersAutocompleteData = async (filter: IFilter) => {
  try {
    store.dispatch(setAutocompleteAction({ isPending: true }));
    return await HTTP.get(`users`, {
      params: filter,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'indices' });
      }
    });
  } catch (error) {
    store.dispatch(setAutocompleteAction({ isPending: false }));
    throw new Error(JSON.stringify(error.response.data));
  } finally {
    store.dispatch(setAutocompleteAction({ isPending: false }));
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

export const fetchLdapUser = (email: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get(`users/ldap_user?email=${email}`);
    dispatch(getLdapUserAction({ ldapUser: data }));
  } catch (e) {
    dispatch(setError({ errorText: e.response.data.errors }));
  }
};

export const postAddUser = ({
  user: {
    email,
    login,
    name,
    surname,
    position,
    comment,
    active,
    fromActiveDirectory,
    skype,
    roles
  },
  currentPage,
  filter,
  handleAlert,
  handleClose
}: ICreateAddUser) => async (dispatch: Function) => {
  try {
    await HTTP.post('users', {
      email,
      login,
      name,
      surname,
      position,
      comment,
      active,
      fromActiveDirectory,
      skype,
      roles
    });
    if (handleClose) {
      handleClose();
    }
    dispatch(getUsers({ page: currentPage, limit: 50, search: { ...filter } }));
  } catch (errors) {
    dispatch(setError({ errorText: errors }));
    if (handleAlert) {
      handleAlert();
    }
  }
};

export const patchUser = ({
  user: {
    email,
    login,
    name,
    surname,
    position,
    comment,
    active,
    fromActiveDirectory,
    skype,
    roles
  },
  id,
  currentPage,
  filter,
  handleAlert,
  handleClose
}: IUpdateAddUser) => async (dispatch: Function) => {
  try {
    await HTTP.patch(`users/${id}`, {
      email,
      login,
      name,
      surname,
      position,
      comment,
      active,
      fromActiveDirectory,
      skype,
      roles
    });
    if (handleClose) {
      handleClose();
    }
    dispatch(getUsers({ page: currentPage, limit: 50, search: { ...filter } }));
  } catch (errors) {
    dispatch(setError({ errorText: errors }));
    if (handleAlert) {
      handleAlert();
    }
  }
};

export const getRolesDispatch = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await HTTP.get(`users/roles`);
    dispatch(getRolesAction({ roles: data }));
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
    errorsEventEmitter.emit(SNACKBAR_ERRORS, {
      errorsArray: SnackErrorBarData(error || ['Please try again'])
    });
  }
};

export const sendResetLink = (id: number) =>
  HTTP.get(`/users/change-password/${id}`);

export const sendPassword = async (id: number, password: string) =>
  HTTP.post(`users/set-password`, {
    id,
    password
  }).then(token => {
    document.cookie = `token=${token}`;
    history.push({ pathname: '/' });
  });
