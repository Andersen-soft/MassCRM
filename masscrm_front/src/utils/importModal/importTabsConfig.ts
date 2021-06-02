import { IRoles, TabsConfig } from 'src/interfaces';

const INITIAL_TABS_CONFIG: TabsConfig = [
  {
    key: 'UploadingSettings',
    label: 'Uploading settings'
  },
  {
    key: 'FieldMatching',
    label: 'Field matching'
  },
  {
    key: 'Import',
    label: 'Import'
  }
];

const MANAGER_TABS_CONFIG: TabsConfig = [
  {
    key: 'UploadingSettings',
    label: 'Uploading settings'
  },
  {
    key: 'FieldMatching',
    label: 'Field matching'
  },
  {
    key: 'Duplicates',
    label: 'Duplicates'
  },
  {
    key: 'Import',
    label: 'Import'
  }
];

export const getImportTabsConfig = (roles: IRoles) => {
  return roles.manager ? MANAGER_TABS_CONFIG : INITIAL_TABS_CONFIG;
};
