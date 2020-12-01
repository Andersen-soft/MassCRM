import { handleActions } from 'redux-actions';
import {
  setUserDataAction,
  getUsersAction,
  setError,
  getUsersRolesAction,
  getRolesAction,
  getLdapUserAction,
  onClearFilter,
  getSearchUsers
} from 'src/actions/user.action';
import { IUsersStore } from 'src/interfaces/store';

const initialState: IUsersStore = {
  ldapUser: [],
  users: {},
  userData: {
    roles: {}
  },
  roles: {},
  total: 0,
  searchUsers: [],
  fullName: []
};

export const usersReducer = handleActions(
  {
    [`${setUserDataAction}`]: (state, { payload }) => {
      let roles = { ...payload.userData.roles };
      if (roles.nc1 && roles.nc2 && roles.administrator && roles.manager) {
        roles = { superAdmin: {} };
      }
      return { ...state, userData: { ...payload.userData, roles } };
    },
    [`${setError}`]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [`${getUsersAction}`]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [`${getUsersRolesAction}`]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [`${getRolesAction}`]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [`${getLdapUserAction}`]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [`${getSearchUsers}`]: (state, { payload }) => {
      return { ...state, ...payload };
    },
    [`${onClearFilter}`]: state => {
      return { ...state, ...initialState };
    }
  },
  initialState
);
