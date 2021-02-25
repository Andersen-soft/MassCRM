import { handleActions } from 'redux-actions';
import { setAutocompleteAction } from 'src/actions';
import { IAutocompleteStore } from 'src/interfaces/store';

type S = IAutocompleteStore;

const initialState: IAutocompleteStore = {
  isPending: false
};

export const autocompleteReducer = handleActions(
  {
    [`${setAutocompleteAction}`]: (state, { payload }): S => ({
      ...state,
      ...payload
    })
  },
  initialState
);
