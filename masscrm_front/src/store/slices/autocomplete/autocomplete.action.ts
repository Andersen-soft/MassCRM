import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export const setAutocompleteAction = createAction('SET_AUTOCOMPLETE');

export const setAutocomplete = (status: boolean) => (dispatch: Dispatch) => {
  dispatch(setAutocompleteAction(status));
};
