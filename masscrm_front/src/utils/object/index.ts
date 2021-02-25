export const createProperty = (
  propertyName: string,
  condition?: number | boolean
) => (condition ? propertyName : '');
