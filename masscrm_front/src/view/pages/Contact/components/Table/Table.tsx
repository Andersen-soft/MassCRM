import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, max, min } from 'date-fns';
import { debounce } from 'lodash';
import {
  IContactResult,
  IAutocomplete,
  IUser,
  IContact,
  FiltersTypes,
  Open,
  ITableHeaderItem,
  ICompanySize
} from 'src/interfaces';
import {
  getContacts,
  getContactPlan,
  getOriginsFilter,
  getFilterSettings,
  getCompanySizeFilter,
  getCompanyTypesFilter,
  getRolesFilter,
  getLoader,
  getSelectedContacts,
  getShowCountContacts,
  deleteContactList,
  getAddContactList,
  getAutocompleteData,
  getUsersAutocompleteData,
  getUser,
  getUsersById,
  setSelectedContacts,
  setSelectedAllContactsAction,
  setSelectedAddContactsAction,
  setSelectedMyContactsAction,
  getFilterSorting,
  setSortValues,
  setSort
} from 'src/store/slices';
import { Loader } from 'src/view/atoms';
import { TableBase, MainFilters, ContactEdit } from 'src/view/organisms';
import { FiltersContext } from 'src/contexts';
import {
  getSelectedEntity,
  addItemFilter,
  tableConfigCallback,
  deleteItemFilter,
  urlSerialize,
  urlDeserialize,
  deleteEmptyFields
} from 'src/utils';
import history from 'src/utils/history';
import {
  MEDIA_DESKTOP_BIG,
  YYYY_MM_DD,
  initialMultiFilterState,
  initialFiltersState,
  dateFilterValues,
  YYYY_MM_DD_COLON_FORMAT,
  defaultFilterValues
} from 'src/constants';
import { IContactTableAutocompleteState } from './interfaces';

import {
  getOtherHeight,
  MAP_AUTOCOMPLETE_RESPONSE,
  MAP_AUTOCOMPLETE_VALUES
} from './helpers';
import { INITIAL_IS_BIG_SCREEN } from './constants';
import { contactMapCallback, CONTACTS_SORTING_FIELDS_CONFIG } from './configs';
import { useStyles } from './Table.styles';
import { Tools } from './components';

interface IProps {
  daily?: boolean;
  isFullTable: boolean;
  rowsForJob: boolean;
  myContacts?: boolean;
  totalCount: number;
}

export const Table: FC<IProps> = ({
  daily,
  isFullTable,
  rowsForJob,
  myContacts,
  totalCount
}) => {
  const companySizeAutocomplete = useSelector(getCompanySizeFilter);
  const originsAutocomplete = useSelector(getOriginsFilter);
  const companyTypesAutocomplete = useSelector(getCompanyTypesFilter);
  const userRolesAutocomplete = useSelector(getRolesFilter);
  const filtersSettings = useSelector(getFilterSettings);
  const showCount = useSelector(getShowCountContacts);
  const sortingState = useSelector(getFilterSorting);
  const {
    roles: { manager, superAdmin }
  } = useSelector(getUser);

  const paramURL = new URLSearchParams(window.location.search);
  const filterParamURL = paramURL.get('filter');
  const filterValue = filterParamURL && urlDeserialize(filterParamURL);

  const initialFilters = {
    ...initialFiltersState,
    ...filterValue
  };
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

  const contacts: IContactResult[] = useSelector(getContacts);

  const dispatch = useDispatch();

  const styles = useStyles();

  const { getRequestValues } = useContext(FiltersContext);

  const requestValues = getRequestValues({ daily, myContacts });

  const { listField } = filtersSettings;

  const [isBigScreen, setIsBigScreen] = useState(INITIAL_IS_BIG_SCREEN);
  const [open, setOpen] = useState<Open>(false);
  const [loadedAutocomplete, setLoadedAutocomplete] = useState<
    IContactTableAutocompleteState
  >({
    responsible: [],
    other: []
  });
  const [editContact, setEditContact] = useState<IContactResult>();

  const { search: filterQueriesString } = history.location;

  const otherHeightWithoutDaily = myContacts
    ? getOtherHeight(isBigScreen).myContactTable
    : getOtherHeight(isBigScreen).contactTable;

  const otherHeight = daily
    ? getOtherHeight(isBigScreen).dailyTable
    : otherHeightWithoutDaily;

  const getFormatDateForRequest = (value: Date, view: string) => {
    return format(value, view);
  };
  const CreatedAtContact = () => {
    if (daily) {
      return {
        min: format(new Date(), YYYY_MM_DD),
        max: format(new Date(), YYYY_MM_DD)
      };
    }
    return {
      min: initialFilters.contact_created?.length
        ? getFormatDateForRequest(
            min(initialFilters.contact_created.map((x: string) => new Date(x))),
            YYYY_MM_DD
          )
        : undefined,
      max: initialFilters.contact_created?.length
        ? getFormatDateForRequest(
            max(initialFilters.contact_created.map((x: string) => new Date(x))),
            YYYY_MM_DD
          )
        : undefined
    };
  };

  const tableConfigHeader = tableConfigCallback(
    isFullTable,
    rowsForJob,
    !daily
  );

  const tableConfigRows: ITableHeaderItem[] = tableConfigHeader.rows;

  const newTableConfigRows = listField?.length
    ? tableConfigRows.filter(({ code }) => !code || listField?.includes(code))
    : tableConfigRows;

  const dataTable = contacts?.map(
    // TODO: Probably the function below still needs a plenty of refactoring.
    // We need to invent the way of sharing abstract props such like doubleClickEdit
    // between table cells. One of the ways is to build an abstract component Cell
    // with corresponding abstract props.
    //
    // I turned off the doubleClick action on the cells in a fast way because
    // I am afraid that I will not have enough time to refactor correctly.
    contactMapCallback(isFullTable, rowsForJob, !daily, listField, false)
  );

  const load = useSelector(getLoader);

  const onChangeData = () => false;

  const getData = useCallback(
    () => dispatch(getAddContactList(requestValues)),
    [getRequestValues]
  );

  const deleteData = (ids: number[]) => {
    deleteContactList(ids).then(getData);
  };

  const clearAutocompleteList = () => {
    setLoadedAutocomplete(({ responsible }) => ({ responsible, other: [] }));
  };

  const onResponsibleFullfilled = ({ data }: any): void =>
    setLoadedAutocomplete(prev => ({
      ...prev,
      responsible: [...prev.responsible, ...data]
    }));

  const onOtherfulfilled = ({ data }: any): void =>
    setLoadedAutocomplete(prev => ({ ...prev, other: data }));

  const handleChangeInput = useCallback(
    debounce((value: string, code: string) => {
      if (!value.length) return;
      const isResponsible = code === 'responsible';
      const isSkipResponsible: number = daily || myContacts ? 0 : 1;
      const objectRequest = isResponsible
        ? { search: { fullName: value } }
        : MAP_AUTOCOMPLETE_RESPONSE[code](
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
    (code: string) =>
      loadedAutocomplete?.other?.reduce(
        (acc: IContact, current: IContactResult) => ({
          result: MAP_AUTOCOMPLETE_VALUES[code](acc, current)
        }),
        {
          result: []
        }
      ),
    [loadedAutocomplete]
  );

  const autocompleteCallback = (value: string) => {
    return value === 'responsible'
      ? loadedAutocomplete.responsible.map(
          ({ name, surname }) => `${name} ${surname}`
        )
      : [...new Set(makeArrayAutocomplete(value).result as string)];
  };

  const getAutocompleteObj: IAutocomplete = useMemo(
    () => ({
      linkedin: autocompleteCallback('linkedin'),
      first_name: autocompleteCallback('first_name'),
      last_name: autocompleteCallback('last_name'),
      full_name: autocompleteCallback('full_name'),
      gender: ['Male', 'Female'],
      position: autocompleteCallback('position'),
      company: autocompleteCallback('company'),
      company_size: companySizeAutocomplete.map(
        ({ name }: ICompanySize) => `${name}`
      ),
      company_linkedin: autocompleteCallback('company_linkedin'),
      company_website: autocompleteCallback('company_website'),
      email: autocompleteCallback('email'),
      requires_validation: ['Yes', 'No'],
      city: autocompleteCallback('city'),
      region: autocompleteCallback('region'),
      country: autocompleteCallback('country'),
      company_industry: autocompleteCallback('company_industry'),
      jobs: autocompleteCallback('jobs'),
      jobs_skills: autocompleteCallback('jobs_skills'),
      comment: autocompleteCallback('comment'),
      cto: autocompleteCallback('cto'),
      company_type: companyTypesAutocomplete,
      company_subsidiary: autocompleteCallback('company_subsidiary'),
      company_holding: autocompleteCallback('company_holding'),
      origin: originsAutocomplete,
      service_id: autocompleteCallback('service_id'),
      sequence: autocompleteCallback('sequence'),
      sale_status: [
        'Prelead',
        'Lead',
        'In progress',
        'Opportunity',
        'Contract',
        'Archive'
      ],
      mails: autocompleteCallback('mails'),
      my_notes: autocompleteCallback('my_notes'),
      source: autocompleteCallback('source'),
      sale_id: autocompleteCallback('sale_id'),
      status: ['Active', 'Finished'],
      project_c1: ['Yes', 'No'],
      social_networks: autocompleteCallback('social_networks'),
      phone: autocompleteCallback('phone'),
      colleague: autocompleteCallback('colleague'),
      skype: autocompleteCallback('skype'),
      responsible: autocompleteCallback('responsible'),
      is_in_work: ['Yes', 'No'],
      blacklist: ['Yes', 'No'],
      bounces: ['Yes', 'No'],
      no_email: ['Exclude', 'Include', 'Only'],
      responsible_roles: userRolesAutocomplete,
      has_jobs: ['Exist', 'Absent', 'Disabled'],
      vacancy_status: ['Active', 'Archive', 'All']
    }),
    [autocompleteCallback, loadedAutocomplete]
  );

  const autocompleteValues = (name: string): string[] =>
    [...new Set(getAutocompleteObj[name])] || [];
  const clearSelected = (): void => {
    paramURL.delete('selectAllOnPage');
    paramURL.delete('selectedContacts');
  };
  const changeFilterQuery = (filter: any): void => {
    const filterObject = urlDeserialize(paramURL.get('filter') as string);

    filterObject[filter.code] = filter.item;
    paramURL.set('filter', urlSerialize(deleteEmptyFields(filterObject)));
    history.replace({
      search: paramURL.toString()
    });
  };

  const getResponsibleID = (value: string[]) =>
    loadedAutocomplete.responsible?.reduce((acc: any, cur: IUser) => {
      return value.includes(`${cur.name} ${cur.surname}`)
        ? [...acc, cur.id]
        : [...acc];
    }, []);

  const onChangeFilter = (filterParams: any): void => {
    if (!!filterParams.item && filterParams.item.length > 0) {
      paramURL.set('page', '1');
      clearSelected();
    }
    if (filterParams.isCheckbox) {
      const value = (initialFilters[filterParams.code] as Array<
        string
      >).includes(filterParams.item)
        ? deleteItemFilter(
            initialFilters[filterParams.code] as string[],
            filterParams.item
          )
        : addItemFilter(
            initialFilters[filterParams.code] as string[],
            filterParams.item
          );
      changeFilterQuery({ code: filterParams.code, item: [...value] });
      return;
    }
    if (filterParams.code === 'responsible') {
      changeFilterQuery({
        code: filterParams.code,
        item: getResponsibleID(filterParams.item)
      });
      return;
    }
    if (dateFilterValues.includes(filterParams.code)) {
      changeFilterQuery({
        code: filterParams.code,
        item: filterParams.item.map((date: string) =>
          format(new Date(date), YYYY_MM_DD_COLON_FORMAT)
        )
      });
      return;
    }
    changeFilterQuery(filterParams);
  };

  const resetAllFilters = () => {
    paramURL.set(
      'filter',
      urlSerialize(
        deleteEmptyFields({ ...initialFiltersState, ...defaultFilterValues })
      )
    );
    paramURL.set('page', '1');
    clearSelected();
    history.replace({
      search: paramURL.toString()
    });
  };

  const resetFilter = (resetParams: string | FiltersTypes) => {
    if (typeof resetParams === 'string') {
      if (resetParams === 'blacklist') {
        changeFilterQuery({ code: resetParams, item: [] });
        return;
      }
      clearSelected();
      changeFilterQuery({
        code: resetParams,
        item: initialFiltersState[resetParams]
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (idContact: number, type: Open = 'edit') => {
    setEditContact(contacts.find(({ id }) => idContact === id));
    setOpen(type);
  };

  const count = totalCount && Math.ceil(totalCount / showCount);

  const areFiltersDataEqual = () => {
    return (
      filterQueriesString &&
      JSON.stringify(requestValues) !== JSON.stringify(filtersSettings)
    );
  };

  const mainFiltersProps = useMemo(
    () => ({
      resetAllFilters,
      handleChangeInput,
      initialFilters,
      autocompleteValues,
      onChangeFilter,
      rowsForJob
    }),
    [initialFilters, getAutocompleteObj]
  );

  const handlerChangeWidth = () => setIsBigScreen(prev => !prev);

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

  useEffect(() => {
    const workWidth = window.matchMedia(`${MEDIA_DESKTOP_BIG}`);
    workWidth.addEventListener('change', handlerChangeWidth);
    if (!manager && !superAdmin) {
      dispatch(getContactPlan());
    }
    if (!paramURL.get('filter')) {
      paramURL.set(
        'filter',
        urlSerialize(
          deleteEmptyFields({ ...initialFilters, ...defaultFilterValues })
        )
      );
      history.replace({
        search: paramURL.toString()
      });
    }
    return () => {
      workWidth.removeEventListener('change', handlerChangeWidth);
    };
  }, []);

  useEffect(() => {
    if (areFiltersDataEqual()) {
      getData();
    }
  }, [getRequestValues]);

  useEffect(() => {
    (async () => {
      const usersArray =
        filterValue?.responsible &&
        (await getUsersById(filterValue.responsible));

      const MultiFiltersParams =
        filterValue &&
        Object.keys(filterValue).reduce(
          (acc: { [key: string]: string[] }, cur: string) => {
            if (cur === 'responsible') {
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
      onChangeFilter({
        code: 'responsible',
        item: MultiFiltersParams.responsible
      });
    })();
  }, [filterQueriesString]);

  return (
    <>
      {!daily ? (
        <Tools
          {...mainFiltersProps}
          selectedContacts={selectedContacts}
          filterValues={requestValues}
        />
      ) : (
        <div className={styles.mainFilterWrapper}>
          <MainFilters {...mainFiltersProps} />
        </div>
      )}
      <div className={dataTable.length ? styles.dataTable : styles.dataWithout}>
        <TableBase
          config={{ ...tableConfigHeader, rows: newTableConfigRows }}
          clearAutocompleteList={clearAutocompleteList}
          filtersValues={initialFilters}
          changeFilter={onChangeFilter}
          resetFilter={resetFilter}
          data={dataTable}
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
          // force update required here to set filters in the header for the case of
          // routing back from different page (e.g. import/export-details)
          key={Number(filterQueriesString)}
          tableDataList={contacts}
          filterRequestValues={requestValues}
          sortingState={sortingState}
          sortingFieldId={CONTACTS_SORTING_FIELDS_CONFIG}
          setSortAction={setSort}
          setSortValuesAction={setSortValues}
        />
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
