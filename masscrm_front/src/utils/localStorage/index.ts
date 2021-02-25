export const setLocalStorageItem = (
  localStorageItemKey: string,
  localStorageItemValue: string
) => (localStorageKey: string) => {
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      [localStorageItemKey]: localStorageItemValue
    })
  );
};

export const removeLocalStorageItems = (items: string[]) =>
  Object.keys(localStorage).forEach(key => {
    if (items.includes(key)) {
      localStorage.removeItem(key);
    }
  });

export const localStorageContactPageNames = [
  'allContacts',
  'myContacts',
  'addContacts',
  'blacklist'
];
