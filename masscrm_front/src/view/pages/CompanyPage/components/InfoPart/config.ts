import { ITabConfig } from 'src/interfaces';

export const getTabButtonsConfig = (isNC1: boolean): ITabConfig[] => [
  { key: 'companyInfo', label: 'Company Info' },
  { key: 'jobs', label: isNC1 ? 'Jobs' : '' },
  { key: 'relatedContacts', label: 'Related contacts' }
];
