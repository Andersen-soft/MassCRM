import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableBase } from 'src/components/common/Table';
import { IStoreState } from 'src/interfaces/store';
import debounce from 'lodash.debounce';
import { getCurrentPage, getLoader } from 'src/selectors';
import { getAutocompleteData, getRoles, getUsers, setPage } from 'src/actions';
import {
  STATUSES,
  tableConfig,
  USERS_AUTOCOMPLETE_VALUES_MAP,
  userTableMap
} from './utilsUserTable';
import { IFilterValuesUsers, IUser } from '../../../interfaces';
import { Loader } from '../../common/Loader';
import { OTHER_HEIGHT } from '../../../utils/table';

export const UsersTable: FC = () => {
  const ROWS_COUNT = 50;
  const TOTAL_COUNT = useSelector((state: IStoreState) => state.users.total);
  const users = useSelector((state: IStoreState) => state.users.users) || [];
  const usersRoles =
    useSelector((state: IStoreState) => state.users.roles) || {};
  const otherHeight = OTHER_HEIGHT.userTable;
  const dispatch = useDispatch();

  const [fullNameFilter, setFullNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [loginFilter, setLoginFilter] = useState('');
  const [rolesFilter, setRolesFilter] = useState<Array<string>>([]);
  const [skypeFilter, setSkypeFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const currentPage = useSelector(getCurrentPage);

  const userList: Array<IUser> = users[currentPage];

  const dataTable = userList?.map(userTableMap);

  const getRolesValuesForRequest = () => {
    return rolesFilter?.map(item => {
      if (item === 'Admin') return 'administrator';
      return item.toLocaleLowerCase();
    });
  };

  const getStatusValuesForRequest = (status: string) => STATUSES[status];

  const filtersValues: IFilterValuesUsers = {
    'full name': fullNameFilter,
    'e-mail': emailFilter,
    login: loginFilter,
    roles: rolesFilter,
    skype: skypeFilter,
    position: positionFilter,
    status: statusFilter
  };

  const requestValues = {
    page: currentPage,
    limit: ROWS_COUNT,
    search: {
      fullName: fullNameFilter || undefined,
      email: emailFilter || undefined,
      login: loginFilter || undefined,
      roles: getRolesValuesForRequest(),
      skype: skypeFilter || undefined,
      position: positionFilter || undefined,
      active: getStatusValuesForRequest(statusFilter)
    }
  };

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    dispatch(getUsers(requestValues));
  }, [
    currentPage,
    fullNameFilter,
    emailFilter,
    loginFilter,
    rolesFilter,
    skypeFilter,
    positionFilter,
    statusFilter
  ]);

  const deleteRolesFilter = useCallback(
    (item: string) => rolesFilter.filter(id => item !== id),
    [rolesFilter]
  );
  const addRolesFilter = useCallback((item: string) => [...rolesFilter, item], [
    rolesFilter
  ]);

  const onChangeFilter = useCallback(
    (obj: any) => {
      dispatch(setPage(1));
      switch (obj.name) {
        case 'full name':
          return setFullNameFilter(obj.item);
        case 'e-mail':
          return setEmailFilter(obj.item);
        case 'login':
          return setLoginFilter(obj.item);
        case 'skype':
          return setSkypeFilter(obj.item);
        case 'roles':
          return setRolesFilter(
            rolesFilter.includes(obj.item)
              ? deleteRolesFilter(obj.item)
              : addRolesFilter(obj.item)
          );

        case 'position':
          return setPositionFilter(obj.item);
        case 'status':
          return setStatusFilter(obj.item);
        default:
          return filtersValues;
      }
    },
    [
      currentPage,
      fullNameFilter,
      emailFilter,
      loginFilter,
      skypeFilter,
      rolesFilter,
      positionFilter,
      statusFilter
    ]
  );

  const [inputValue, setInputValue] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>('');
  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>();

  const handleChangeInput = debounce((value: string, name: string) => {
    switch (name) {
      case 'full name':
        setSearchKey('fullName');
        return setInputValue(value);
      case 'e-mail':
        setSearchKey('email');
        return setInputValue(value);
      default:
        setSearchKey(name.toLocaleLowerCase());
        return setInputValue(value);
    }
  }, 500);

  const searchAutocomplete = {
    search: {
      [searchKey]: inputValue || undefined
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await getAutocompleteData(searchAutocomplete);
      setLoadedAutocomplete(data);
    })();
  }, [inputValue]);

  const autocompleteValues = (name: string): string[] => {
    switch (name) {
      case 'roles':
        return Object.keys(usersRoles).map(
          item => usersRoles?.[`${item}`].text || ''
        );
      case 'status':
        return ['Active', 'Inactive'];
      default:
        return (
          [
            ...new Set(
              loadedAutocomplete?.map(
                USERS_AUTOCOMPLETE_VALUES_MAP[name]
              ) as string
            )
          ] || []
        );
    }
  };

  const RESET_FILTERS: any = {
    'full name': () => setFullNameFilter(''),
    'e-mail': () => setEmailFilter(''),
    login: () => setLoginFilter(''),
    skype: () => setSkypeFilter(''),
    roles: () => setRolesFilter([]),
    position: () => setPositionFilter(''),
    status: () => setStatusFilter('')
  };

  const resetFilter = (name: string) => {
    return RESET_FILTERS[name]();
  };

  const count = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / ROWS_COUNT);
  const load = useSelector(getLoader);

  return (
    <>
      <TableBase
        config={tableConfig}
        changeFilter={onChangeFilter}
        filtersValues={filtersValues}
        changeInput={handleChangeInput}
        resetFilter={resetFilter}
        autocompleteValues={autocompleteValues}
        data={dataTable}
        count={count}
        otherHeight={otherHeight}
      />
      {load && <Loader />}
    </>
  );
};
