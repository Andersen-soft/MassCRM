import { IGetErrorTitlesArgs } from './interfaces';

export const getErrorTitlesArgs: { [key: string]: IGetErrorTitlesArgs } = {
  position: {
    condition: 'must be',
    errorKey: 'position',
    titleToExtract: 'position'
  },
  first_name: {
    condition: 'must be',
    errorKey: 'first_name',
    titleToExtract: 'first name'
  },
  last_name: {
    condition: 'must be',
    errorKey: 'last_name',
    titleToExtract: 'last name'
  },
  country: {
    condition: 'is required when gender is not present',
    errorKey: 'location.country',
    titleToExtract: 'country'
  }
};
