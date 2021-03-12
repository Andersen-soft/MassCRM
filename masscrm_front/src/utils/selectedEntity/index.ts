import { createProperty } from 'src/utils/object';

interface IGetSelectedEntities {
  [key: string]: any;
}

export const getSelectedEntity = ({
  addContactsVal,
  myContactsVal,
  allContactsVal,
  blacklistVal,
  reportVal,
  addContactsCompProp,
  myContactsCompProp,
  blacklistCompProp,
  reportCompProp
}: IGetSelectedEntities) => {
  const selectedContactsEntities = {
    [createProperty('addContacts', addContactsCompProp)]: addContactsVal,
    [createProperty('myContacts', myContactsCompProp)]: myContactsVal,
    [createProperty('blacklist', blacklistCompProp)]: blacklistVal,
    [createProperty('report', reportCompProp)]: reportVal,
    default: allContactsVal
  };

  return selectedContactsEntities[
    Object.keys(selectedContactsEntities).find(item => item) || 'default'
  ];
};
