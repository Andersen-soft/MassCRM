import { createSelector } from 'reselect';
import { IStoreState, IIndustry } from 'src/interfaces';

export const getIndustries = createSelector(
  ({ industry: { data } }: IStoreState): IIndustry[] => data,
  data => data
);
