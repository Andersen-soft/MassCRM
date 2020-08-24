import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import {
  deleteContactList,
  getAddContactList,
  getCountryList,
  getAutocompleteDate,
  setFilterSettings,
  getFiltersData,
  setPage,
  getIndustriesList,
  setFilterValues
} from 'src/actions';
import {
  getContacts,
  getCurrentPage,
  getUser,
  getOriginsFilter,
  getFilterSettings,
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
import { format, max, min, parse } from 'date-fns';
import debounce from 'lodash.debounce';
import { ITableHeaderItem } from 'src/components/common/Table/interfaces';
import { initialFiltersState } from 'src/reducers/tableFilters.reducer';
import { TableConfigCallBack } from './configs/AddContactTable.config';
import style from '../../Contact.scss';
import { ContactModal } from '../ContactModal';
import { OTHER_HEIGHT } from '../../../../utils/table';

const sn = styleNames(style);

export const ContactTable: FC<{
  daily?: boolean;
  isFullTable: boolean;
  myContact?: boolean;
}> = ({ daily, isFullTable, myContact }) => {
  const ROWS_COUNT = 50;
  const TOTAL_COUNT = useSelector((state: IStoreState) => state.contacts.total);
  const companySizeAutocomplete = useSelector(getCompanySizeFilter);
  const originsAutocomplete = useSelector(getOriginsFilter);
  const companyTypesAutocomplete = useSelector(getCompanyTypesFilter);
  const filtersState = useSelector(getFilterValues);

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

  const dailyPlan = useSelector(
    (state: IStoreState) => state.contacts.plan.count
  );
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
        min: filtersState['Contact updated'].flat()?.length
          ? getFormatDateForRequest(
              min(filtersState['Contact updated']),
              'yyyy-MM-dd'
            )
          : undefined,
        max: filtersState['Contact updated'].flat()?.length
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
      position: filtersState.Position || undefined,
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

  useEffect(() => {
    dispatch(setFilterSettings(requestValues));
    dispatch(getAddContactList(requestValues));
    dispatch(getCountryList());
    dispatch(getFiltersData());
  }, [currentPage, filtersState, sortObject]);

  const contact: Array<IContactResult> = useSelector(getContacts) || [];
  const [open, setOpen] = useState(false);
  const [editContact, setEditContact] = useState<IContactResult>();
  const contactForForm = useMemo(
    () => ({
      birthday,
      location,
      emails,
      social_networks,
      requires_validation,
      company,
      colleague,
      origin,
      phones,
      ...fields
    }: IContactResult) => {
      return {
        ...fields,
        social_networks: social_networks ? social_networks[0].link : '',
        country: location.country,
        region: location.region,
        city: location.city,
        emails: emails.length ? emails.map(email => email.email) : [],
        email: '',
        validation: !!requires_validation,
        colleague: colleague ? colleague[0] : '',
        company: company?.name,
        company_id: company?.id || 0,
        companyWebSite: company?.website,
        companySize: company?.max_employees?.toString(),
        companyLinkedIn: company?.linkedin,
        industry: company?.industries?.map(({ name }) => name),
        CTO: company?.sto_full_name,
        birthday: birthday ? [parse(birthday, 'd.MM.yyyy', new Date())] : [],
        company_type: company?.type,
        company_founded: company?.founded
          ? [parse(company?.founded, 'd.MM.yyyy', new Date())]
          : [],
        vacancies: company?.vacancies
      };
    },
    []
  );
  const isFullList = listField && listField.length > 0;
  const tableConfigHeader = TableConfigCallBack(isFullTable, !daily);
  const tableConfigRows: Array<ITableHeaderItem> = tableConfigHeader.rows;
  const newTableConfigRows = isFullList
    ? tableConfigRows.filter(({ code }) => !code || listField?.includes(code))
    : tableConfigRows;

  const dataTable = contact?.map(
    addContactMapCallback(isFullTable, !daily, listField)
  );

  const load = useSelector(getLoader);

  useEffect(() => {
    if (contact?.length) setVisibleTable(true);
  }, [dataTable]);

  const onChangeData = () => false;

  const getData = () => dispatch(getAddContactList(requestValues));
  useEffect(() => {
    dispatch(getIndustriesList());
    getData();
    dispatch(setFilterValues(initialFiltersState));
  }, []);

  const deleteData = (ids: Array<number>) =>
    deleteContactList(ids).then(() =>
      dispatch(getAddContactList(requestValues))
    );

  const [objectRes, setObjectRes] = useState<any>(null);

  const [loadedAutocomplete, setLoadedAutocomplete] = useState<any>([]);

  const clearAutocompleteList = () => {
    setLoadedAutocomplete([]);
  };

  const handleChangeInput = debounce((value: string, name: string) => {
    setObjectRes(MAP_AUTOCOMPLETE_RESPONSE[name](value, CreatedAtContact()));
    setInputValue(value);
  }, 500);

  useEffect(() => {
    (async () => {
      if (inputValue.length > 1) {
        const { data } = await getAutocompleteDate(objectRes);
        setLoadedAutocomplete(data);
      }
    })();
  }, [inputValue]);

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
    dispatch(
      setFilterValues({ [name]: Array.isArray(filtersState[name]) ? [] : '' })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (idContact: number) => {
    setEditContact(contact.filter(({ id }) => idContact === id)[0]);
    setOpen(true);
  };

  const count = TOTAL_COUNT && Math.ceil(TOTAL_COUNT / ROWS_COUNT);

  const sorting = useCallback(
    (parameter: ISortingObject) => {
      setSortObject(parameter);
    },
    [sortObject]
  );

  return (
    <div className={dataTable.length ? sn('data-table') : sn('data-without')}>
      {dailyPlan || dataTable.length || visibleTable ? (
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
