import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableBase, Loader } from 'src/components/common';
import debounce from 'lodash.debounce';
import {
  getCurrentPage,
  getLoader,
  getTotalCount,
  getUsersFiltersValues,
  getUsersSelector,
  getRolesSelector
} from 'src/selectors';
import {
  getUsersAutocompleteData,
  getRoles,
  getUsers,
  setPage,
  setUsersFilterSettings,
  setUsersFilterValues
} from 'src/actions';
import { addItemFilter, deleteItemFilter, OTHER_HEIGHT } from 'src/utils/table';
import { initialUsersFilterState } from 'src/reducers/tableFilters.reducer';
import { ROWS_COUNT } from 'src/constants';
import {
  STATUSES,
  tableConfig,
  USERS_AUTOCOMPLETE_VALUES_MAP,
  userTableMap,
  getRolesValuesForRequest
} from './utilsUserTable';

export const UsersTable: FC = () => {
  const TOTAL_COUNT = useSelector(getTotalCount);
  const load = useSelector(getLoader);
  const users = useSelector(getUsersSelector);
  const usersRoles = useSelector(getRolesSelector);
  const usersFiltersState = useSelector(getUsersFiltersValues);
  const otherHeight = OTHER_HEIGHT.userTable;
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);

  const dataTable = users?.map(userTableMap);

  const getStatusValuesForRequest = (status: string) => STATUSES[status];

  const requestValues = useMemo(
    () => ({
      page: currentPage,
      limit: ROWS_COUNT,
      search: {
        fullName: usersFiltersState['full name'] || undefined,
        email: usersFiltersState['e-mail'] || undefined,
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
      const { name, item, isCheckbox } = filterParams;
      dispatch(setPage(1));
      if (isCheckbox) {
        const value = usersFiltersState[name].includes(item)
          ? deleteItemFilter(usersFiltersState[name] as string[], item)
          : addItemFilter(usersFiltersState[name] as string[], item);

        return dispatch(setUsersFilterValues({ [name]: [...value] }));
      }
      return dispatch(setUsersFilterValues({ [name]: item }));
    },
    [usersFiltersState]
  );

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>();

  const handleChangeInput = debounce(async (value: string, name: string) => {
    const rowsSearch = tableConfig.rows.find(item => item.name === name);
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

  const resetFilter = (name: string) =>
    dispatch(setUsersFilterValues({ [name]: initialUsersFilterState[name] }));

  const count = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / ROWS_COUNT);

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
