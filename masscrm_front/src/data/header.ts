import { IRolesConfig } from './interfaces';

export const header: { [key: string]: string } = {
  users: 'User page',
  add_contacts: 'Add contacts',
  all_contacts: 'All contacts',
  my_contacts: 'My contacts'
};

export const rolesConfig: IRolesConfig = {
  availablePages: {
    superAdmin: ['/users', '/add_contacts', '/all_contacts'],
    administrator: ['/users'],
    manager: ['/all_contacts'],
    nc1: ['/add_contacts', '/my_contacts'],
    nc2: ['/add_contacts', '/my_contacts']
  },
  redirectUrls: {
    superAdmin: '/users',
    administrator: '/users',
    manager: '/all_contacts',
    nc1: '/add_contacts',
    nc2: '/add_contacts'
  }
};
