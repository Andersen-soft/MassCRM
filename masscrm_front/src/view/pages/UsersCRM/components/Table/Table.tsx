import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { TableBase } from 'src/view/organisms';
import { Loader } from 'src/view/atoms';
import { STATUSES, initialUsersFilterState } from 'src/constants';
import {
  getCurrentPage,
  getLoader,
  getTotalCount,
  getUsersFiltersValues,
  getUsersSelector,
  getRolesSelector,
  getUsersAutocompleteData,
  getRoles,
  getUsers,
  setPage,
  setUsersFilterSettings,
  setUsersFilterValues
} from 'src/store/slices';
import {
  addItemFilter,
  deleteItemFilter,
  OTHER_HEIGHT,
  getRolesValuesForRequest
} from 'src/utils';
import { tableConfig, userTableMap } from './configs';
import { USERS_AUTOCOMPLETE_VALUES_MAP, ROWS_COUNT } from './constants';

export const Table = () => {
  const totalCount = useSelector(getTotalCount);
  const load = useSelector(getLoader);
  const users = useSelector(getUsersSelector);
  const usersRoles = useSelector(getRolesSelector);
  const usersFiltersState = useSelector(getUsersFiltersValues);
  const currentPage = useSelector(getCurrentPage);

  const otherHeight = OTHER_HEIGHT.userTable;

  const dispatch = useDispatch();

  const dataTable = users?.map(userTableMap);

  const getStatusValuesForRequest = (status: string) => STATUSES[status];

  const requestValues = useMemo(
    () => ({
      page: currentPage,
      limit: ROWS_COUNT,
      search: {
        fullName: usersFiltersState.fullName || undefined,
        email: usersFiltersState.email || undefined,
        login: usersFiltersState.login || undefined,
        roles: getRolesValuesForRequest(usersFiltersState.roles),
        skype: usersFiltersState.skype || undefined,
        position: usersFiltersState.position || undefined,
        active: getStatusValuesForRequest(usersFiltersState.status)
      }
    }),
    [usersFiltersState, currentPage]
  );

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  const fetchUsers = () => dispatch(getUsers(requestValues));

  useEffect(() => {
    fetchUsers();
    dispatch(setUsersFilterSettings(requestValues));
  }, [requestValues]);

  const onChangeFilter = useCallback(
    (filterParams: any) => {
      const { code, item, isCheckbox } = filterParams;
      dispatch(setPage(1));
      if (isCheckbox) {
        const value = usersFiltersState[code].includes(item)
          ? deleteItemFilter(usersFiltersState[code] as string[], item)
          : addItemFilter(usersFiltersState[code] as string[], item);

        return dispatch(setUsersFilterValues({ [code]: [...value] }));
      }
      return dispatch(setUsersFilterValues({ [code]: item }));
    },
    [usersFiltersState]
  );

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>();

  const handleChangeInput = debounce(async (value: string, name: string) => {
    const rowsSearch = tableConfig.rows.find(
      (item: { code: string }) => item.code === name
    );

    const searchAutocomplete = {
      search: {
        [`${rowsSearch?.code}`]: value || undefined
      }
    };
    const { data } = await getUsersAutocompleteData(searchAutocomplete);

    setLoadedAutocomplete(data);
  }, 500);

  const clearAutocompleteList = () => setLoadedAutocomplete([]);

  const autocompleteObject: { [key: string]: string[] } = {
    roles: Object.keys(usersRoles).map(
      item => usersRoles?.[`${item}`].text || ''
    ),
    status: ['Active', 'Inactive']
  };

  const autocompleteValues = (name: string): string[] => {
    if (Object.keys(autocompleteObject).includes(name)) {
      return autocompleteObject[name];
    }
    return (
      [
        ...new Set(
          loadedAutocomplete?.map(USERS_AUTOCOMPLETE_VALUES_MAP[name]) as string
        )
      ] || []
    );
  };

  const resetFilter = (name: string) => {
    dispatch(setUsersFilterValues({ [name]: initialUsersFilterState[name] }));
  };

  const count = totalCount && Math.ceil(totalCount / ROWS_COUNT);

  return (
    <>
      <TableBase
        config={tableConfig}
        changeFilter={onChangeFilter}
        filtersValues={usersFiltersState}
        changeInput={handleChangeInput}
        resetFilter={resetFilter}
        autocompleteValues={autocompleteValues}
        data={dataTable}
        count={count}
        otherHeight={otherHeight}
        fetchUsers={fetchUsers}
        clearAutocompleteList={clearAutocompleteList}
      />
      {load && <Loader />}
    </>
  );
};
