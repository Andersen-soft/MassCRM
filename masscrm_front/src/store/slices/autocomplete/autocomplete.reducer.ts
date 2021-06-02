import { handleActions } from 'redux-actions';
import { IAutocompleteStore } from 'src/interfaces';
import { setAutocompleteAction } from '.';

type S = IAutocompleteStore;

const initialState: IAutocompleteStore = {
  isPending: false
};

export const autocompleteReducer = handleActions(
  {
    [`${setAutocompleteAction}`]: (state: S, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
