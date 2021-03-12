export const createProperty = (
  propertyName: string,
  condition?: number | boolean
) => (condition ? propertyName : '');

export const getObjectValueFunction = (rowCasesConfig: {
  [x: string]: () => void;
}): void => {
  rowCasesConfig[Object.keys(rowCasesConfig).find(key => key) || 'default']();
};
