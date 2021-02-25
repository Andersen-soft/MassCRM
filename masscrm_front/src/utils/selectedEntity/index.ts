import { createProperty } from 'src/utils/object';

interface IGetSelectedEntities {
  [key: string]: any;
}

export const getSelectedEntity = ({
  addContactsVal,
  myContactsVal,
  allContactsVal,
  blacklistVal,
  addContactsCompProp,
  myContactsCompProp,
  blacklistCompProp
}: IGetSelectedEntities) => {
  const selectedContactsEntities = {
    [createProperty('addContacts', addContactsCompProp)]: addContactsVal,
    [createProperty('myContacts', myContactsCompProp)]: myContactsVal,
    [createProperty('blacklist', blacklistCompProp)]: blacklistVal,
    default: allContactsVal
  };

  return selectedContactsEntities[
    Object.keys(selectedContactsEntities).find(item => item) || 'default'
  ];
};
