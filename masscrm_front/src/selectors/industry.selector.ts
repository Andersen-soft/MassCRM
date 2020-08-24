import { createSelector } from 'reselect';
import { IStoreState } from 'src/interfaces/store';
import { IIndustry } from '../interfaces';

export const getIndustries = createSelector(
  ({ industry }: IStoreState): Array<IIndustry> => industry.data,
  data => data
);
