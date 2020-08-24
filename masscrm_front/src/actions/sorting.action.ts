import { ISortingState } from '../interfaces/ISorting';
import { SORTING_FIELD_ID } from '../utils/table';
import { initialSortingState } from '../reducers/tableSorting.reducer';

export const onChangeSorting = (state: ISortingState, name: string) => ({
  payload: () => ({
    ...initialSortingState,
    [name]: {
      field_name: SORTING_FIELD_ID[name],
      type_sort: state[name].type_sort === 'DESC' ? 'ASC' : 'DESC'
    },
    name
  })
});
