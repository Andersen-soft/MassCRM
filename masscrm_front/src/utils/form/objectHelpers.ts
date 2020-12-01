interface INoEmptyField {
  [key: string]: string | [] | number | object | undefined;
}

export const isEmptyObject = (obj: {}) => Object.keys(obj).length === 0;

export const deleteEmptyFields = (newSearch: { [key: string]: any }) => {
  const noEmptyField: INoEmptyField = {};
  Object.keys(newSearch).forEach((item: string) => {
    if (Array.isArray(newSearch[item])) {
      if (newSearch[item].length > 0) noEmptyField[item] = newSearch[item];
    } else if (typeof newSearch[item] === 'object') {
      if (!isEmptyObject(newSearch[item])) {
        const child = deleteEmptyFields(newSearch[item]);
        noEmptyField[item] = !isEmptyObject(child) ? child : undefined;
      }
    } else if (typeof newSearch[item] !== 'undefined') {
      noEmptyField[item] = newSearch[item];
    }
  });
  return noEmptyField;
};
