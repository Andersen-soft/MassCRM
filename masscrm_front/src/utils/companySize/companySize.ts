import { createProperty } from 'src/utils';

export const getCompanySize = (max?: number, min?: number) => {
  const sizeValues = {
    [createProperty('noMax', !max && min)]: `${min} +`,
    [createProperty('Self-employed', max === 1)]: 'Self-employed',
    [createProperty('fromMinToMax', max && min)]: `${min} - ${max}`,
    default: ''
  };

  return sizeValues[
    Object.keys(sizeValues).find(sizeProp => sizeProp) || 'default'
  ];
};
