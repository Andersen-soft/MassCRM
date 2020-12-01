import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import {
  deleteContactList,
  getAddContactList,
  getAutocompleteDate,
  setFilterSettings,
  setPage,
  setFilterValues,
  setMultiFilterValues,
  getAutocompleteData,
  getUsersById
} from 'src/actions';
import {
  getContacts,
  getCurrentPage,
  getUser,
  getOriginsFilter,
  getFilterSettings,
  getMultiFilterValues,
  getCompanySizeFilter,
  getCompanyTypesFilter,
  getLoader,
  getFilterValues,
  getSortBy
} from 'src/selectors';
import {
  addContactMapCallback,
  VALIDATION_VALUE,
  MAP_AUTOCOMPLETE_RESPONSE,
  MAP_AUTOCOMPLETE_VALUES,
  ROWS_COUNT,
  deleteItemFilter,
  addItemFilter,
  getBouncesValue
} from 'src/utils/table/add.table';
import { TableBase, Loader, ContactEdit } from 'src/components/common';
import {
  IContactFilter,
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
import { getCompanySize } from 'src/utils/map/company.map';
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
  myContact?: boolean;
}> = ({ daily, isFullTable, rowsForJob, myContact }) => {
  const TOTAL_COUNT = useSelector((state: IStoreState) => state.contacts.total);
  const companySizeAutocomplete = useSelector(getCompanySizeFilter);
  const originsAutocomplete = useSelector(getOriginsFilter);
  const companyTypesAutocomplete = useSelector(getCompanyTypesFilter);
  const filtersState = useSelector(getFilterValues);
  const multiFiltersState = useSelector(getMultiFilterValues);
  const filtersSettings = useSelector(getFilterSettings);
  const sortBy = useSelector(getSortBy);

  const { listField } = filtersSettings;
  const [isBigScreen, setIsBigScreen] = useState<boolean>(
    INITIAL_IS_BIG_SCREEN
  );
  const [visibleTable, setVisibleTable] = useState<boolean>(false);

  const currentPage: number = useSelector(getCurrentPage);

  const otherHeightWithoutDaily = myContact
    ? getOtherHeight(isBigScreen).myContactTable
    : getOtherHeight(isBigScreen).contactTable;

  const otherHeight = daily
    ? getOtherHeight(isBigScreen).dailyTable
    : otherHeightWithoutDaily;

  const dispatch = useDispatch();

  const currentUser = useSelector(getUser);

  const getGenderForRequest = useCallback(() => {
    return filtersState?.Gender?.map((item: string) => {
      if (item === 'Male') {
        return 'm';
      }
      return 'f';
    });
  }, [filtersState?.Gender]);

  const getFormatDateForRequest = (value: Date, view: string) =>
    format(value, view);

  const getValidationForRequest = (validation: string) =>
    VALIDATION_VALUE[validation];

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

  const getEmailValue = () =>
    filtersState.noEmail && filtersState.noEmail !== 'Include'
      ? filtersState.noEmail.toLowerCase()
      : undefined;

  const paramURL = new URLSearchParams(window.location.search);

  const requestValues: IContactFilter = useMemo(
    () => ({
      page: currentPage,
      limit: ROWS_COUNT,
      search: {
        skip_responsibility: daily || myContact ? 0 : undefined,
        global: filtersState.global,
        created_at: CreatedAtContact(),
        updated_at: {
          min: filtersState['Contact updated']?.length
            ? getFormatDateForRequest(
                min(filtersState['Contact updated']),
                'yyyy-MM-dd'
              )
            : undefined,
          max: filtersState['Contact updated']?.length
            ? getFormatDateForRequest(
                max(filtersState['Contact updated']),
                'yyyy-MM-dd'
              )
            : undefined
        },
        responsible_id:
          (daily || myContact) && currentUser.id
            ? [currentUser.id]
            : filtersState.Responsible,
        first_name: filtersState['First name'] || undefined,
        last_name: filtersState['Last name'] || undefined,
        full_name: filtersState['Full name'] || undefined,
        gender: getGenderForRequest(),
        birthday: {
          min: filtersState['Date of birth']?.length
            ? getFormatDateForRequest(
                min(filtersState['Date of birth']),
                'MM-dd'
              )
            : undefined,
          max: filtersState['Date of birth']?.length
            ? getFormatDateForRequest(
                max(filtersState['Date of birth']),
                'MM-dd'
              )
            : undefined
        },
        country: filtersState.Country,
        city: filtersState.City,
        region: filtersState.Region,
        position: filtersState.Title,
        linkedin: filtersState.Li || undefined,
        no_email: getEmailValue(),
        email: filtersState.Email || undefined,
        phone: filtersState.Phone || undefined,
        skype: filtersState.Skype || undefined,
        origin: filtersState.Origin,
        colleague_name: filtersState.Collegue || undefined,
        service_id: Number(filtersState.ID) || undefined,
        added_to_mailing: {
          min: filtersState['Added to mailing']?.length
            ? getFormatDateForRequest(
                min(filtersState['Added to mailing']),
                'yyyy-MM-dd'
              )
            : undefined,
          max: filtersState['Added to mailing']?.length
            ? getFormatDateForRequest(
                max(filtersState['Added to mailing']),
                'yyyy-MM-dd'
              )
            : undefined
        },
        social_networks: filtersState['Social Networks'] || undefined,
        confidence: {
          min: filtersState?.Confidence[0],
          max: filtersState?.Confidence[1]
        },
        last_touch: {
          min: filtersState['Last touch']?.length
            ? getFormatDateForRequest(
                min(filtersState['Last touch']),
                'yyyy-MM-dd'
              )
            : undefined,
          max: filtersState['Last touch']?.length
            ? getFormatDateForRequest(
                max(filtersState['Last touch']),
                'yyyy-MM-dd'
              )
            : undefined
        },
        sequence: filtersState.Sequence || undefined,
        status: filtersState.Status,
        opens: {
          min: filtersState.Opens[0],
          max: filtersState.Opens[1]
        },
        views: {
          min: filtersState.Views[0],
          max: filtersState.Views[1]
        },
        deliveries: {
          min: filtersState.Deliveries[0],
          max: filtersState.Deliveries[1]
        },
        replies: {
          min: filtersState.Replies[0],
          max: filtersState.Replies[1]
        },
        bounces: getBouncesValue(filtersState.Bounces),
        mails: filtersState.Mails || undefined,
        my_notes: filtersState['My notes'] || undefined,
        in_blacklist: filtersState.blacklist.map(item =>
          item === 'Yes' ? 1 : 0
        ),
        comment: filtersState.Comment || undefined,
        sale: {
          id: filtersState['Sale ID'] || undefined,
          status: filtersState['Sale status'],
          created_at: {
            min: filtersState['Sale created']?.length
              ? getFormatDateForRequest(
                  min(filtersState['Sale created']),
                  'yyyy-MM-dd'
                )
              : undefined,
            max: filtersState['Sale created']?.length
              ? getFormatDateForRequest(
                  max(filtersState['Sale created']),
                  'yyyy-MM-dd'
                )
              : undefined
          },
          source: filtersState.Source,
          project_c1: getValidationForRequest(filtersState['1C Project'])
        },
        company: {
          created_at: {
            min: filtersState['Company created']?.length
              ? getFormatDateForRequest(
                  min(filtersState['Company created']),
                  'yyyy-MM-dd'
                )
              : undefined,
            max: filtersState['Company created']?.length
              ? getFormatDateForRequest(
                  max(filtersState['Company created']),
                  'yyyy-MM-dd'
                )
              : undefined
          },
          subsidiary: filtersState['Subsidiary companies'] || undefined,
          holding: filtersState['Holding company'] || undefined,
          name: filtersState.Company || undefined,
          website: filtersState['Company website'] || undefined,
          linkedin: filtersState['Company LinkedIn'] || undefined,
          founded: {
            min: filtersState.Founded?.length
              ? getFormatDateForRequest(min(filtersState.Founded), 'yyyy-MM-dd')
              : undefined,
            max: filtersState.Founded?.length
              ? getFormatDateForRequest(max(filtersState.Founded), 'yyyy-MM-dd')
              : undefined
          },
          industry: filtersState.Industry,
          company_size: getCompanySize(filtersState['Company size']),
          sto_full_name: filtersState.CTO || undefined,
          type: filtersState['Type of company'],
          jobs: filtersState.Job ? [filtersState.Job] : undefined,
          skills: filtersState['Job Skills']
            ? [filtersState['Job Skills']]
            : undefined
        },
        requires_validation: getValidationForRequest(filtersState.Validation),
        is_in_work: filtersState['In work'].map(item =>
          item === 'Yes' ? 1 : 0
        ),
        date_of_use: {
          min: filtersState['Date of use']?.length
            ? getFormatDateForRequest(
                min(filtersState['Date of use']),
                'yyyy-MM-dd'
              )
            : undefined,
          max: filtersState['Date of use']?.length
            ? getFormatDateForRequest(
                max(filtersState['Date of use']),
                'yyyy-MM-dd'
              )
            : undefined
        }
      },
      sort: sortBy,
      listField:
        listField ||
        (paramURL.get('fields') ? paramURL.get('fields')?.split(',') : [])
    }),
    [filtersState, filtersSettings, sortBy]
  );

  const contact: Array<IContactResult> = useSelector(getContacts) || [];
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

  const dataTable = contact?.map(
    addContactMapCallback(isFullTable, rowsForJob, !daily, listField)
  );

  const load = useSelector(getLoader);

  const onChangeData = () => false;

  const getData = useCallback(
    () => dispatch(getAddContactList(requestValues)),
    [requestValues]
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
      const isSkipResponsible: number = daily || myContact ? 0 : 1;
      const objectRequest = isResponsible
        ? { search: { fullName: value } }
        : MAP_AUTOCOMPLETE_RESPONSE[name](
            value,
            CreatedAtContact(),
            isSkipResponsible
          );
      if (isResponsible) {
        getAutocompleteData(objectRequest).then(onResponsibleFullfilled);
        return;
      }
      getAutocompleteDate(objectRequest).then(onOtherfulfilled);
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
      noEmail: ['Exclude', 'Include', 'Only']
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
    setEditContact(contact.find(({ id }) => idContact === id));
    setOpen(type);
  };

  const count = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / ROWS_COUNT);

  useEffect(() => {
    dispatch(setFilterSettings(requestValues));
  }, [currentPage, filtersState, sortBy]);

  useEffect(() => {
    if (JSON.stringify(requestValues) !== JSON.stringify(filtersSettings)) {
      getData();
    }
  }, [requestValues]);

  useEffect(() => {
    if (contact?.length) setVisibleTable(true);
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
      onChangeFilter
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

  return (
    <>
      {!daily ? (
        <TableTools {...mainFiltersProps} />
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
            changeInput={handleChangeInput}
            onChangeData={onChangeData}
            onDeleteData={deleteData}
            autocompleteValues={autocompleteValues}
            onEdit={handleEdit}
            count={count}
            otherHeight={otherHeight}
            isFullTable={isFullTable}
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
