import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export const setPageAction = createAction('SET_PAGE');

export const setPage = (page?: number) => (dispatch: Dispatch) => {
  const currentPage =
    page ||
    Number(page || new URLSearchParams(window.location.search).get('page')) ||
    1;

  dispatch(setPageAction({ currentPage }));
};
