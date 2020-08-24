import { IRoles } from 'src/interfaces/IRoles';

export const getRolesText = (roles: IRoles) => {
  return Object.keys(roles).map((roleKey: string) => {
    const role = roles[roleKey];

    return role?.text || '';
  });
};
