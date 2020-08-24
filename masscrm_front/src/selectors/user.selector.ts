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

export const getUsers = createSelector(
  ({ users }: IStoreState): { [key: string]: Array<IUser> } => users.users,
  users => users
);

export const getRoles = createSelector(
  ({ users }: IStoreState) => users.roles,
  roles => roles
);

export const getErrors = createSelector(
  ({ users }: IStoreState) => users.errorText,
  errors => errors
);

export const getUser = createSelector(
  ({ users }: IStoreState): IUser => users.userData,
  users => users
);
