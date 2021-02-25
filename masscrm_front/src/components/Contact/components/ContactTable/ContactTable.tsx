import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import {
  deleteContactList,
  getAddContactList,
  getAutocompleteData,
  setFilterSettings,
  setPage,
  setFilterValues,
  setMultiFilterValues,
  getUsersAutocompleteData,
  getUsersById,
  setSelectedContacts,
  setSelectedAllContactsAction,
  setSelectedAddContactsAction,
  setSelectedMyContactsAction
} from 'src/actions';
import {
  getContacts,
  getCurrentPage,
  getOriginsFilter,
  getFilterSettings,
  getMultiFilterValues,
  getCompanySizeFilter,
  getCompanyTypesFilter,
  getRolesFilter,
  getLoader,
  getFilterValues,
  getSortBy,
  getSelectedContacts
} from 'src/selectors';
import {
  addContactMapCallback,
  MAP_AUTOCOMPLETE_RESPONSE,
  MAP_AUTOCOMPLETE_VALUES,
  ROWS_COUNT,
  deleteItemFilter,
  addItemFilter
} from 'src/utils/table/add.table';
import { setLocalStorageItem } from 'src/utils/localStorage';
import { TableBase, Loader, ContactEdit } from 'src/components/common';
import {
  IContactResult,
  IStoreState,
  IAutocomlete,
  IUser,
  IContact,
  FiltersTypes
} from 'src/interfaces';
import { format, max, min } from 'date-fns';
import debounce from 'lodash.debounce';
import {
  ITableHeaderItem,
  TOpen
} from 'src/components/common/Table/interfaces';
import {
  initialFiltersState,
  initialMultiFilterState
} from 'src/reducers/tableFilters.reducer';
import { getOtherHeight, INITIAL_IS_BIG_SCREEN } from 'src/utils/table';
import { FilterContext } from 'src/context';
import { getSelectedEntity } from 'src/utils/selectedEntity';
import { useLocation, useHistory } from 'react-router-dom';
import { TABLE_DEFAULT_INIT_URL } from 'src/constants';
import { TableConfigCallBack } from './configs/AddContactTable.config';
import style from '../../Contact.scss';
import { TableTools } from '../TableTools';
import { MainFilters } from '../TableTools/components/MainFilters';

const sn = styleNames(style);

interface IAutocomleteState {
  [key: string]: IUser[] | IContactResult[];
  Responsible: IUser[];
  other: IContactResult[];
}

export const ContactTable: FC<{
  daily?: boolean;
  isFullTable: boolean;
  rowsForJob: boolean;
  myContacts?: boolean;
}> = ({ daily, isFullTable, rowsForJob, myContacts }) => {
  const TOTAL_COUNT = useSelector((state: IStoreState) => state.contacts.total);
  const companySizeAutocomplete = useSelector(getCompanySizeFilter);
  const originsAutocomplete = useSelector(getOriginsFilter);
  const companyTypesAutocomplete = useSelector(getCompanyTypesFilter);
  const userRolesAutocomplete = useSelector(getRolesFilter);
  const filtersState = useSelector(getFilterValues);
  const multiFiltersState = useSelector(getMultiFilterValues);
  const filtersSettings = useSelector(getFilterSettings);

  const selectedContacts = useSelector(
    getSelectedContacts(
      getSelectedEntity({
        addContactsVal: 'selectedAddContacts',
        myContactsVal: 'selectedMyContacts',
        allContactsVal: 'selectedAllContacts',
        addContactsCompProp: daily,
        myContactsCompProp: myContacts
      })
    )
  );

  const sortBy = useSelector(getSortBy);
  const { getRequestValues } = useContext(FilterContext);
  const requestValues = getRequestValues({ daily, myContacts });
  const { listField } = filtersSettings;
  const [isBigScreen, setIsBigScreen] = useState<boolean>(
    INITIAL_IS_BIG_SCREEN
  );
  const [visibleTable, setVisibleTable] = useState<boolean>(false);

  const currentPage: number = useSelector(getCurrentPage);

  const { search: filterQueriesString } = useLocation();
  const history = useHistory();

  const otherHeightWithoutDaily = myContacts
    ? getOtherHeight(isBigScreen).myContactTable
    : getOtherHeight(isBigScreen).contactTable;

  const otherHeight = daily
    ? getOtherHeight(isBigScreen).dailyTable
    : otherHeightWithoutDaily;

  const dispatch = useDispatch();

  const getFormatDateForRequest = (value: Date, view: string) =>
    format(value, view);

  const CreatedAtContact = () => {
    if (daily) {
      return {
        min: format(new Date(), 'yyyy-MM-dd'),
        max: format(new Date(), 'yyyy-MM-dd')
      };
    }
    return {
      min: filtersState['Contact created']?.length
        ? getFormatDateForRequest(
            min(filtersState['Contact created']),
            'yyyy-MM-dd'
          )
        : undefined,
      max: filtersState['Contact created']?.length
        ? getFormatDateForRequest(
            max(filtersState['Contact created']),
            'yyyy-MM-dd'
          )
        : undefined
    };
  };

  const paramURL = new URLSearchParams(window.location.search);

  const contacts: Array<IContactResult> = useSelector(getContacts) || [];
  const [open, setOpen] = useState<TOpen>(false);
  const [editContact, setEditContact] = useState<IContactResult>();

  const isFullList = listField && listField.length > 0;
  const tableConfigHeader = TableConfigCallBack(
    isFullTable,
    rowsForJob,
    !daily
  );
  const tableConfigRows: Array<ITableHeaderItem> = tableConfigHeader.rows;
  const newTableConfigRows = isFullList
    ? tableConfigRows.filter(({ code }) => !code || listField?.includes(code))
    : tableConfigRows;

  const dataTable = contacts?.map(
    addContactMapCallback(isFullTable, rowsForJob, !daily, listField)
  );

  const load = useSelector(getLoader);

  const onChangeData = () => false;

  const getData = useCallback(
    () => dispatch(getAddContactList(requestValues)),
    [getRequestValues]
  );

  const deleteData = (ids: Array<number>) => {
    if (new URLSearchParams(window.location.search).get('selectAll') === 'on') {
      deleteContactList([], requestValues).then(getData);
    } else {
      deleteContactList(ids).then(getData);
    }
  };

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<
    IAutocomleteState
  >({
    Responsible: [],
    other: []
  });

  const clearAutocompleteList = () => {
    setLoadedAutocomplete(({ Responsible }) => ({ Responsible, other: [] }));
  };

  const onResponsibleFullfilled = ({ data }: any): void =>
    setLoadedAutocomplete(prev => ({
      ...prev,
      Responsible: [...prev.Responsible, ...data]
    }));

  const onOtherfulfilled = ({ data }: any): void =>
    setLoadedAutocomplete(prev => ({ ...prev, other: data }));

  const handleChangeInput = useCallback(
    debounce((value: string, name: string) => {
      if (!value.length) return;
      const isResponsible = name === 'Responsible';
      const isSkipResponsible: number = daily || myContacts ? 0 : 1;
      const objectRequest = isResponsible
        ? { search: { fullName: value } }
        : MAP_AUTOCOMPLETE_RESPONSE[name](
            value,
            CreatedAtContact(),
            isSkipResponsible
          );
      if (isResponsible) {
        getUsersAutocompleteData(objectRequest).then(onResponsibleFullfilled);
        return;
      }
      getAutocompleteData(objectRequest).then(onOtherfulfilled);
    }, 300),
    [loadedAutocomplete]
  );

  const makeArrayAutocomplete = useCallback(
    (name: string) =>
      loadedAutocomplete?.other?.reduce(
        (acc: IContact, current: IContactResult) => ({
          result: MAP_AUTOCOMPLETE_VALUES[name](acc, current)
        }),
        {
          result: []
        }
      ),
    [loadedAutocomplete]
  );

  const autocompleteCallback = (value: string) =>
    value === 'Responsible'
      ? loadedAutocomplete.Responsible.map(
          ({ name, surname }) => `${name} ${surname}`
        )
      : [...new Set(makeArrayAutocomplete(value).result as string)];

  const getAutocompleteObj: IAutocomlete = useMemo(
    () => ({
      Li: autocompleteCallback('Li'),
      'First name': autocompleteCallback('First name'),
      'Last name': autocompleteCallback('Last name'),
      'Full name': autocompleteCallback('Full name'),
      Gender: ['Male', 'Female'],
      Title: autocompleteCallback('Title'),
      Company: autocompleteCallback('Company'),
      'Company size': companySizeAutocomplete.map(item => `${item.name}`),
      'Company LinkedIn': autocompleteCallback('Company LinkedIn'),
      'Company website': autocompleteCallback('Company website'),
      Email: autocompleteCallback('Email'),
      Validation: ['Yes', 'No'],
      City: autocompleteCallback('City'),
      Region: autocompleteCallback('Region'),
      Country: autocompleteCallback('Country'),
      Industry: autocompleteCallback('Industry'),
      Job: autocompleteCallback('Job'),
      'Job Skills': autocompleteCallback('Job Skills'),
      Comment: autocompleteCallback('Comment'),
      CTO: autocompleteCallback('CTO'),
      'Type of company': companyTypesAutocomplete,
      'Subsidiary companies': autocompleteCallback('Subsidiary companies'),
      'Holding company': autocompleteCallback('Holding company'),
      Origin: originsAutocomplete,
      ID: autocompleteCallback('ID'),
      Sequence: autocompleteCallback('Sequence'),
      'Sale status': [
        'Prelead',
        'Lead',
        'In progress',
        'Opportunity',
        'Contract',
        'Archive'
      ],
      Mails: autocompleteCallback('Mails'),
      'My notes': autocompleteCallback('My notes'),
      Source: autocompleteCallback('Source'),
      'Sale ID': autocompleteCallback('Sale ID'),
      Status: ['Active', 'Finished'],
      '1C Project': ['Yes', 'No'],
      'Social Networks': autocompleteCallback('Social Networks'),
      Phone: autocompleteCallback('Phone'),
      Colleague: autocompleteCallback('Colleague'),
      Skype: autocompleteCallback('Skype'),
      Responsible: autocompleteCallback('Responsible'),
      'In work': ['Yes', 'No'],
      blacklist: ['Yes', 'No'],
      Bounces: ['Yes', 'No'],
      noEmail: ['Exclude', 'Include', 'Only'],
      responsibleRoles: userRolesAutocomplete,
      hasJobs: ['Exist', 'Absent', 'Disabled'],
      vacancyStatus: ['Active', 'Archive', 'All']
    }),
    [autocompleteCallback, loadedAutocomplete]
  );

  const autocompleteValues = (name: string): string[] =>
    [...new Set(getAutocompleteObj[name])] || [];

  const dispatchIdResponsible = (value: string[]) =>
    loadedAutocomplete.Responsible?.reduce((acc: any, cur: IUser) => {
      return value.includes(`${cur.name} ${cur.surname}`)
        ? [...acc, cur.id]
        : [...acc];
    }, []);

  const onChangeFilter = (filterParams: any): void => {
    dispatch(setPage(1));
    if (filterParams.isCheckbox) {
      const value = (filtersState[filterParams.name] as Array<string>).includes(
        filterParams.item
      )
        ? deleteItemFilter(
            filtersState[filterParams.name] as string[],
            filterParams.item
          )
        : addItemFilter(
            filtersState[filterParams.name] as string[],
            filterParams.item
          );
      dispatch(setFilterValues({ [filterParams.name]: [...value] }));
      return;
    }
    if (filterParams.name === 'Responsible') {
      dispatch(
        setFilterValues({
          [filterParams.name]: dispatchIdResponsible(filterParams.item)
        })
      );
      return;
    }
    dispatch(setFilterValues({ [filterParams.name]: filterParams.item }));
  };

  const resetFilter = (resetParams: string | FiltersTypes) => {
    dispatch(setPage(1));
    if (typeof resetParams === 'string') {
      dispatch(
        setFilterValues({ [resetParams]: initialFiltersState[resetParams] })
      );
      Object.keys(multiFiltersState).includes(resetParams) &&
        dispatch(setMultiFilterValues({ [resetParams]: [] }));
    } else {
      dispatch(setFilterValues(resetParams));
      const allResetParams = Object.keys(resetParams).reduce(
        (acc: FiltersTypes, cur: string) => {
          if (!Object.keys(multiFiltersState).includes(cur)) return acc;
          return { ...acc, [cur]: [] };
        },
        {}
      );
      dispatch(setMultiFilterValues(allResetParams));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (idContact: number, type: TOpen = 'edit') => {
    setEditContact(contacts.find(({ id }) => idContact === id));
    setOpen(type);
  };

  const count = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / ROWS_COUNT);

  const initialLocalStorageValues = (localStorageKey: string) => {
    const localStorageFilters = localStorage.getItem(localStorageKey);

    return localStorageFilters ? JSON.parse(localStorageFilters) : {};
  };

  const setLocalStorageFilters = setLocalStorageItem(
    'filterQueriesString',
    filterQueriesString
  );

  const localStorageBasicConfig = {
    addContactsCompProp: daily,
    myContactsCompProp: myContacts,
    addContactsVal: 'addContacts',
    myContactsVal: 'myContacts',
    allContactsVal: 'allContacts'
  };

  const currPageName = getSelectedEntity(localStorageBasicConfig);

  const setLocalStorage = (updateStorageFunc: Function) => {
    updateStorageFunc(currPageName);
  };

  useEffect(() => {
    if (filterQueriesString) {
      if (!filterQueriesString.includes(TABLE_DEFAULT_INIT_URL)) {
        return setLocalStorage(setLocalStorageFilters);
      }
      return localStorage.removeItem(currPageName);
    }
    const storageFilterQueriesString = initialLocalStorageValues(currPageName)
      ?.filterQueriesString;

    return (
      storageFilterQueriesString &&
      history.push({
        search: storageFilterQueriesString
      })
    );
  }, [filterQueriesString]);

  useEffect(() => {
    dispatch(setFilterSettings(requestValues));
  }, [currentPage, filtersState, sortBy]);

  useEffect(() => {
    if (JSON.stringify(requestValues) !== JSON.stringify(filtersSettings)) {
      getData();
    }
  }, [getRequestValues]);

  useEffect(() => {
    if (contacts?.length) setVisibleTable(true);
  }, [dataTable]);

  useEffect(() => {
    (async () => {
      const filtersParamURL = paramURL.get('filter');
      const filterValue = filtersParamURL && JSON.parse(filtersParamURL);
      const usersArray =
        filterValue?.Responsible &&
        (await getUsersById(filterValue.Responsible));
      const MultiFiltersParams =
        filterValue &&
        Object.keys(filterValue).reduce(
          (acc: { [key: string]: string[] }, cur: string) => {
            if (cur === 'Responsible') {
              return {
                ...acc,
                [cur]: usersArray.map(
                  ({ name, surname }: IUser) => `${name} ${surname}`
                )
              };
            }
            if (Object.keys(initialMultiFilterState).includes(cur)) {
              return { ...acc, [cur]: filterValue[cur] };
            }
            return acc;
          },
          {}
        );
      dispatch(setFilterValues());
      dispatch(setMultiFilterValues(MultiFiltersParams));
    })();
  }, []);

  const mainFiltersProps = useMemo(
    () => ({
      resetFilter,
      handleChangeInput,
      filtersState,
      multiFiltersState,
      autocompleteValues,
      onChangeFilter,
      rowsForJob
    }),
    [filtersState, multiFiltersState, getAutocompleteObj]
  );

  const handlerChangeWidth = () => setIsBigScreen(prev => !prev);

  useEffect(() => {
    const workWidth = window.matchMedia('(min-width: 1493px)');
    workWidth.addEventListener('change', handlerChangeWidth);
    return () => {
      workWidth.removeEventListener('change', handlerChangeWidth);
    };
  }, []);

  const getSelectedEntitiesBasicConfig = {
    addContactsCompProp: daily,
    myContactsCompProp: myContacts
  };

  const handleSetSelectedContacts = useMemo(
    () =>
      setSelectedContacts(
        getSelectedEntity({
          addContactsVal: 'selectedAddContacts',
          myContactsVal: 'selectedMyContacts',
          allContactsVal: 'selectedAllContacts',
          ...getSelectedEntitiesBasicConfig
        }),
        getSelectedEntity({
          addContactsVal: setSelectedAddContactsAction,
          myContactsVal: setSelectedMyContactsAction,
          allContactsVal: setSelectedAllContactsAction,
          ...getSelectedEntitiesBasicConfig
        })
      ),
    [
      setSelectedAllContactsAction,
      setSelectedAddContactsAction,
      setSelectedMyContactsAction,
      daily,
      myContacts,
      selectedContacts
    ]
  );

  return (
    <>
      {!daily ? (
        <TableTools {...mainFiltersProps} selectedContacts={selectedContacts} />
      ) : (
        <div className={sn('main-filter-wrapper')}>
          <MainFilters {...mainFiltersProps} />
        </div>
      )}
      <div className={dataTable.length ? sn('data-table') : sn('data-without')}>
        {dataTable.length || visibleTable ? (
          <TableBase
            config={{ ...tableConfigHeader, rows: newTableConfigRows }}
            clearAutocompleteList={clearAutocompleteList}
            filtersValues={filtersState}
            changeFilter={onChangeFilter}
            resetFilter={resetFilter}
            data={dataTable}
            requestValues={requestValues}
            changeInput={handleChangeInput}
            onChangeData={onChangeData}
            onDeleteData={deleteData}
            autocompleteValues={autocompleteValues}
            onEdit={handleEdit}
            count={count}
            otherHeight={otherHeight}
            isFullTable={isFullTable}
            isMyContacts={myContacts}
            setSelectedContacts={handleSetSelectedContacts}
            selectedContacts={selectedContacts}
          />
        ) : (
          <div className={sn('data-mess')}>No data to display</div>
        )}
        {editContact && (
          <ContactEdit
            contact={editContact}
            open={open}
            handleClose={handleClose}
          />
        )}
        {load && <Loader />}
      </div>
    </>
  );
};
