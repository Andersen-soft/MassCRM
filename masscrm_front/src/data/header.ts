import { IRolesConfig } from './interfaces';

export const header: { [key: string]: string } = {
  users: 'User page',
  add_contacts: 'Add contacts',
  all_contacts: 'All contacts',
  my_contacts: 'My contacts',
  blacklist: 'Black list'
};

export const rolesConfig: IRolesConfig = {
  availablePages: {
    superAdmin: [
      '/users',
      '/add_contacts',
      '/all_contacts',
      '/contact',
      '/blacklist',
      '/export',
      '/import'
    ],
    administrator: ['/users'],
    manager: ['/all_contacts', '/blacklist', '/contact', '/export', '/import'],
    nc1: ['/add_contacts', '/my_contacts', '/contact', '/import'],
    nc2: ['/add_contacts', '/my_contacts', '/contact', '/import']
  }
};
