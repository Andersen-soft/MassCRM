import { createSelector } from 'reselect';
import { IStoreState, IUser } from 'src/interfaces';

export const getUserRoles = createSelector(
  ({ users }: IStoreState) => users.userData?.roles,
  roles => roles
);

export const getLdapUsers = createSelector(
  ({ users }: IStoreState) => users.ldapUser,
  ldap => ldap
);

export const getUsersSelector = createSelector(
  ({ users: { users } }: IStoreState): IUser[] => users || [],
  users => users
);

export const getRolesSelector = createSelector(
  ({ users: { roles } }: IStoreState) => roles || {},
  roles => roles
);

export const getErrors = createSelector(
  ({ users }: IStoreState) => users.errorText,
  errors => errors
);

export const getUser = createSelector(
  ({ users: { userData } }: IStoreState): IUser => userData,
  users => users
);

export const getSearchUser = createSelector(
  ({ users: { searchUsers } }: IStoreState) => searchUsers,
  users => users
);

export const getUserFullName = createSelector(
  ({ users: { fullName } }: IStoreState) => fullName,
  users => users
);

export const getTotalCount = createSelector(
  ({ users: { total } }: IStoreState) => total,
  users => users
);
