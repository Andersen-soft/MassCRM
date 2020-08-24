import { ISortingState } from '../interfaces/ISorting';

export const initialSortingState: ISortingState = {
  'Contact created': {
    field_name: 'created_at',
    type_sort: 'DESC'
  },
  'Contact updated': {
    field_name: 'updated_at',
    type_sort: 'DESC'
  },
  'Date of birth': {
    field_name: 'updated_at',
    type_sort: 'DESC'
  },
  'Added to mailing': {
    field_name: 'added_to_mailing',
    type_sort: 'DESC'
  },
  'Last touch': {
    field_name: 'last_touch',
    type_sort: 'DESC'
  }
};
