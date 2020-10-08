import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import {
  deleteContactList,
  getAddContactList,
  getAutocompleteDate,
  setFilterSettings,
  setPage,
  setFilterValues,
  setMultiFilterValues
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
  getFilterValues
} from 'src/selectors';
import {
  addContactMapCallback,
  VALIDATION_VALUE,
  MAP_AUTOCOMPLETE_RESPONSE,
  MAP_AUTOCOMPLETE_VALUES,
  ROWS_COUNT,
  deleteItemFilter,
  addItemFilter
} from 'src/utils/table/add.table';
import { TableBase, Loader } from 'src/components/common';
import {
  IContactFilter,
  IContactResult,
  IStoreState,
  ISortingObject
} from 'src/interfaces';
import { format, max, min } from 'date-fns';
import debounce from 'lodash.debounce';
import { ITableHeaderItem } from 'src/components/common/Table/interfaces';
import { initialFiltersState } from 'src/reducers/tableFilters.reducer';
import { OTHER_HEIGHT } from 'src/utils/table';
import { ContactModal } from '../ContactModal';
import { TableConfigCallBack } from './configs/AddContactTable.config';
import style from '../../Contact.scss';

const sn = styleNames(style);

export const ContactTable: FC<{
  daily?: boolean;
  isFullTable: boolean;
  rowsForJob: boolean;
  myContact?: boolean;
}> = ({ daily, isFullTable, rowsForJob, myContact }) => {
  const INITIAL_FILTERS_STATE = initialFiltersState;
  const TOTAL_COUNT = useSelector((state: IStoreState) => state.contacts.total);
  const companySizeAutocomplete = useSelector(getCompanySizeFilter);
  const originsAutocomplete = useSelector(getOriginsFilter);
  const companyTypesAutocomplete = useSelector(getCompanyTypesFilter);
  const filtersState = useSelector(getFilterValues);
  const multiFiltersState = useSelector(getMultiFilterValues);

  const [visibleTable, setVisibleTable] = useState<boolean>(false);

  const currentPage: number = useSelector(getCurrentPage);

  const otherHeight = myContact
    ? OTHER_HEIGHT.myContactTable
    : OTHER_HEIGHT.contactTable;

  const [sortObject, setSortObject] = useState<ISortingObject>({
    field_name: 'created_at',
    type_sort: 'DESC'
  });

  const [inputValue, setInputValue] = useState<string>('');

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
        min: format(new Date(), 'y-LL-dd'),
        max: format(new Date(), 'y-LL-dd')
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
  const { listField } = useSelector(getFilterSettings);

  const fieldsParamURL = new URLSearchParams(window.location.search).get(
    'fields'
  );

  const requestValues: IContactFilter = {
    page: currentPage,
    limit: ROWS_COUNT,
    search: {
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
      responsible:
        daily || myContact
          ? [`${currentUser.name} ${currentUser.surname}`]
          : filtersState.Responsible,
      first_name: filtersState['First name'] || undefined,
      last_name: filtersState['Last name'] || undefined,
      full_name: filtersState['Full name'] || undefined,
      gender: getGenderForRequest(),
      birthday: {
        min: filtersState['Date of birth']?.length
          ? getFormatDateForRequest(min(filtersState['Date of birth']), 'MM-dd')
          : undefined,
        max: filtersState['Date of birth']?.length
          ? getFormatDateForRequest(max(filtersState['Date of birth']), 'MM-dd')
          : undefined
      },
      country: filtersState.Country,
      city: filtersState.City,
      region: filtersState.Region,
      position: filtersState.Position,
      linkedin: filtersState.Li || undefined,
      email: filtersState['E-mail'] || undefined,
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
        min: filtersState.Confidence[0],
        max: filtersState.Confidence[1]
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
      bounces: Number(filtersState.Bounces) || undefined,
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
        company_size: {
          min: Number(filtersState['Company size'].split(' ')[0]) || undefined,
          max: Number(filtersState['Company size'].split(' ')[2]) || undefined
        },
        sto_full_name: filtersState.CTO || undefined,
        type: filtersState['Type of company'],
        jobs: filtersState.Job ? [filtersState.Job] : undefined,
        skills: filtersState['Job Skills']
          ? [filtersState['Job Skills']]
          : undefined
      },
      requires_validation: getValidationForRequest(filtersState.Validation)
    },
    sort: sortObject,
    listField: listField || (fieldsParamURL ? fieldsParamURL.split(',') : [])
  };

  const contact: Array<IContactResult> = useSelector(getContacts) || [];
  const [open, setOpen] = useState(false);
  const [editContact, setEditContact] = useState<IContactResult>();

  const contactForForm = useMemo(
    () => ({
      location,
      emails,
      social_networks,
      company,
      colleague,
      origin,
      phones,
      gender,
      ...fields
    }: IContactResult) => {
      let companySize = '';
      if (company?.max_employees === 1) {
        companySize = 'Self Employed';
      } else if (company.max_employees && company.min_employees) {
        companySize = `${company?.min_employees} - ${company?.max_employees}`;
      } else if (!company.max_employees && company.min_employees) {
        companySize = `${company.min_employees} +`;
      }

      return {
        ...fields,
        country: location.country,
        gender: gender ? String(gender) : '',
        region: location.region,
        city: location.city,
        emails: emails.length ? emails.map(email => email.email) : [],
        phones: phones.length ? phones.map(phone => phone.phone) : [],
        origin,
        email: '',
        social_networks: social_networks?.map(item => item.link),
        validation: emails.length ? Boolean(emails[0].verification) : false,
        colleague: colleague ? colleague[0] : '',
        company: company?.name,
        company_id: company?.id || 0,
        companyWebSite: company?.website,
        companySize,
        companyLinkedIn: company?.linkedin,
        industry: company?.industries?.map(({ name }) => name),
        company_holding: company?.holding?.length && company?.holding[0].id,
        company_subsidiary:
          company?.subsidiary?.length && company?.subsidiary[0].id,
        CTO: company?.sto_full_name,
        company_type: company?.type || '',
        company_founded: company?.founded,
        vacancies: company?.vacancies
      };
    },
    [editContact, contact]
  );

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
    [dispatch, requestValues]
  );

  const deleteData = (ids: Array<number>) =>
    deleteContactList(ids).then(getData);

  const [objectRes, setObjectRes] = useState<any>(null);

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);

  const clearAutocompleteList = () => {
    setLoadedAutocomplete([]);
  };

  const handleChangeInput = debounce((value: string, name: string) => {
    setObjectRes(MAP_AUTOCOMPLETE_RESPONSE[name](value, CreatedAtContact()));
    setInputValue(value);
  }, 500);

  const makeArrayAutocomplete = (name: string) =>
    loadedAutocomplete?.reduce(
      (acc: IContactResult, current: IContactResult) => ({
        result: MAP_AUTOCOMPLETE_VALUES[name](acc, current)
      }),
      {
        result: []
      }
    );

  const autocompleteValues = (name: string): string[] => {
    switch (name) {
      case 'Gender':
        return ['Male', 'Female'];
      case 'Origin':
        return originsAutocomplete || [];
      case 'Validation':
        return ['Yes', 'No'];
      case 'Status':
        return ['Active', 'Finished'];
      case 'Source':
        return ['', ''];
      case 'Sale status':
        return [
          'Prelead',
          'Lead',
          'In progress',
          'Opportunity',
          'Contract',
          'Archive'
        ];
      case '1C Project':
        return ['Yes', 'No'];
      case 'blacklist':
        return ['Yes', 'No'];
      case 'Company size':
        return (
          companySizeAutocomplete.map(item => `${item.min} - ${item.max}`) || []
        );
      case 'Type of company':
        return companyTypesAutocomplete || [];
      default:
        return [...new Set(makeArrayAutocomplete(name).result as string)] || [];
    }
  };

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
    } else {
      dispatch(setFilterValues({ [filterParams.name]: filterParams.item }));
    }
  };

  const resetFilter = (name: string) => {
    dispatch(setPage(1));
    dispatch(setFilterValues({ [name]: INITIAL_FILTERS_STATE[name] }));
    if (Object.keys(multiFiltersState).includes(name)) {
      dispatch(setMultiFilterValues({ [name]: [] }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (idContact: number) => {
    setEditContact(contact.find(({ id }) => idContact === id));
    setOpen(true);
  };
  const count = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / ROWS_COUNT);

  const sorting = useCallback(
    (parameter: ISortingObject) => {
      setSortObject(parameter);
    },
    [sortObject]
  );

  useEffect(() => {
    dispatch(setFilterSettings(requestValues));
    getData();
  }, [currentPage, filtersState, sortObject]);

  useEffect(() => {
    if (contact?.length) setVisibleTable(true);
  }, [dataTable]);

  useEffect(() => {
    dispatch(setFilterValues(initialFiltersState));
  }, []);

  useEffect(() => {
    (async () => {
      if (inputValue.length > 1) {
        const { data } = await getAutocompleteDate(objectRes);
        setLoadedAutocomplete(data);
      }
    })();
  }, [inputValue]);

  return (
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
          sorting={sorting}
          otherHeight={otherHeight}
        />
      ) : (
        <div className={sn('data-mess')}>No data to display</div>
      )}
      <ContactModal
        handleClose={handleClose}
        open={open}
        contact={editContact && contactForForm(editContact)}
      />
      {load && <Loader />}
    </div>
  );
};
