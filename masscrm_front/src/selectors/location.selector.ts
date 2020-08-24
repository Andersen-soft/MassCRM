import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { ICity, ICountry, IRegion } from '../interfaces';

export const getCountries = createSelector(
  (state: IStoreState): Array<ICountry> => state.location?.country || [],
  country => country
);

export const getRegion = createSelector(
  (state: IStoreState): Array<IRegion> => state.location?.region || [],
  country => country
);

export const getCity = createSelector(
  (state: IStoreState): Array<ICity> => state.location?.city || [],
  country => country
);
