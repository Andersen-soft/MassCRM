import { handleActions } from 'redux-actions';
import { IUsersStore } from 'src/interfaces';
import {
  setUserDataAction,
  getUsersAction,
  setError,
  getUsersRolesAction,
  getRolesAction,
  getLdapUserAction,
  onClearFilter,
  getSearchUsers,
  deleteInactiveUserAction,
  resetUsersFullName
} from '.';

type S = IUsersStore;

const initialState: S = {
  ldapUser: [],
  users: [],
  userData: {
    roles: {}
  },
  roles: {},
  total: 0,
  searchUsers: [],
  fullName: []
};

export const userReducer = handleActions(
  {
    [`${deleteInactiveUserAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${setUserDataAction}`]: (state: S, { payload }): S => {
      let roles = { ...payload.userData.roles };
      if (roles.nc1 && roles.nc2 && roles.administrator && roles.manager) {
        roles = { superAdmin: {} };
      }
      return { ...state, userData: { ...payload.userData, roles } };
    },
    [`${setError}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getUsersAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getUsersRolesAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getRolesAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getLdapUserAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${getSearchUsers}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    }),
    [`${onClearFilter}`]: state => ({
      ...state,
      ...initialState
    }),
    [`${resetUsersFullName}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
