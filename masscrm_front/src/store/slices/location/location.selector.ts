import { createSelector } from 'reselect';
import { IStoreState, ICity, ICountry, IRegion } from 'src/interfaces';

export const getCountries = createSelector(
  ({ location: { country } }: IStoreState): ICountry[] => country || [],
  country => country
);

export const getRegion = createSelector(
  ({ location: { region } }: IStoreState): IRegion[] => region || [],
  country => country
);

export const getCity = createSelector(
  ({ location: { city } }: IStoreState): ICity[] => city || [],
  country => country
);
