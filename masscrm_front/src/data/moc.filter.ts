export const getCheckboxItems = (name: string | number) => {
  switch (name) {
    case 'roles':
      return ['BA', 'FE', 'BE', 'UX/UI'];
    case 'status':
      return ['Active', 'Inactive'];
    default:
      return ['item1', 'item2', 'item3', 'item4'];
  }
};

export const mockItems = ['item1', 'item2', 'item3', 'item4'];

export const TooltipMessage =
  'The password change link can only be sent to a user who is not registered by corporate e-mail';
