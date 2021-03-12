import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import history from 'src/utils/history';

export const setPageAction = createAction('SET_PAGE');

export const setPage = (page?: number) => (dispatch: Dispatch) => {
  const search = new URLSearchParams(history.location.search);
  const currentPage = page || Number(page || search.get('page')) || 1;
  search.set('page', currentPage.toString());
  history.push({
    search: search.toString()
  });
  dispatch(setPageAction({ currentPage }));
};
