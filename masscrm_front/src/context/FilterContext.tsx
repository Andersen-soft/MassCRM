import React, { FC, useCallback, useMemo } from 'react';
import { format, max, min } from 'date-fns';
import { useSelector } from 'react-redux';
import { IContactFilter } from '../interfaces';
import { getBouncesValue, ROWS_COUNT, VALIDATION_VALUE } from '../utils/table';
import { getCompanySize } from '../utils/map';
import {
  getCurrentPage,
  getFilterSettings,
  getFilterValues,
  getSortBy,
  getUser
} from '../selectors';
import { GENDERS } from '../constants/genders';

interface IRequestValuesArgs {
  daily?: boolean;
  myContact?: boolean;
}

type IDateFilterType =
  | 'Contact created'
  | 'Contact updated'
  | 'Date of birth'
  | 'Added to mailing'
  | 'Last touch'
  | 'Sale created'
  | 'Company created'
  | 'Date of use'
  | 'Founded';

interface IDefaultValue {
  requestValues: ({ daily, myContact }: IRequestValuesArgs) => IContactFilter;
}

export const FilterContext = React.createContext<IDefaultValue>({
  requestValues: () => ({})
});

export const FilterProvider: FC = ({ children }) => {
  const paramURL = new URLSearchParams(window.location.search);
  const filtersState = useSelector(getFilterValues);
  const sortBy = useSelector(getSortBy);
  const currentPage: number = useSelector(getCurrentPage);
  const currentUser = useSelector(getUser);
  const filtersSettings = useSelector(getFilterSettings);
  const { listField } = filtersSettings;

  const getGenderForRequest = useCallback(() => {
    return filtersState?.Gender?.map(
      (sex: string) => GENDERS.find(({ label }) => label === sex)?.value || ''
    ).filter(Boolean);
  }, [filtersState?.Gender]);

  const getMinMax = (array: number[]) => ({ min: array[0], max: array[1] });

  const getFormatDateForRequest = (value: Date, view: string) =>
    format(value, view);

  const getValidationForRequest = (validation: string) =>
    VALIDATION_VALUE[validation];

  const getMinMaxDate = (name: IDateFilterType, daily?: boolean) => {
    if (daily) {
      return {
        min: format(new Date(), 'yyyy-MM-dd'),
        max: format(new Date(), 'yyyy-MM-dd')
      };
    }
    return {
      min: filtersState[name]?.length
        ? getFormatDateForRequest(min(filtersState[name]), 'yyyy-MM-dd')
        : undefined,
      max: filtersState[name]?.length
        ? getFormatDateForRequest(max(filtersState[name]), 'yyyy-MM-dd')
        : undefined
    };
  };

  const getEmailValue = () =>
    filtersState.noEmail && filtersState.noEmail !== 'Include'
      ? filtersState.noEmail.toLowerCase()
      : undefined;

  const requestValues: ({
    daily,
    myContact
  }: IRequestValuesArgs) => IContactFilter = useMemo(
    () => ({ daily, myContact }: IRequestValuesArgs) => ({
      page: currentPage,
      limit: ROWS_COUNT,
      search: {
        skip_responsibility: daily || myContact ? 0 : undefined,
        global: filtersState.global,
        created_at: getMinMaxDate('Contact created', daily),
        updated_at: getMinMaxDate('Contact updated'),
        responsible_id:
          (daily || myContact) && currentUser.id
            ? [currentUser.id]
            : filtersState.Responsible,
        first_name: filtersState['First name'] || undefined,
        last_name: filtersState['Last name'] || undefined,
        full_name: filtersState['Full name'] || undefined,
        gender: getGenderForRequest(),
        birthday: getMinMaxDate('Date of birth'),
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
        added_to_mailing: getMinMaxDate('Added to mailing'),
        social_networks: filtersState['Social Networks'] || undefined,
        confidence: getMinMax(filtersState?.Confidence),
        last_touch: getMinMaxDate('Last touch'),
        sequence: filtersState.Sequence || undefined,
        status: filtersState.Status,
        opens: getMinMax(filtersState.Opens),
        views: getMinMax(filtersState.Views),
        deliveries: getMinMax(filtersState.Deliveries),
        replies: getMinMax(filtersState.Deliveries),
        bounces: getBouncesValue(filtersState.Bounces),
        mails: filtersState.Mails || undefined,
        my_notes: filtersState['My notes'] || undefined,
        in_blacklist: filtersState.blacklist.map(item =>
          Number(item === 'Yes')
        ),
        comment: filtersState.Comment || undefined,
        sale: {
          id: filtersState['Sale ID'] || undefined,
          status: filtersState['Sale status'],
          created_at: getMinMaxDate('Sale created'),
          source: filtersState.Source,
          project_c1: getValidationForRequest(filtersState['1C Project'])
        },
        company: {
          created_at: getMinMaxDate('Company created'),
          subsidiary: filtersState['Subsidiary companies'] || undefined,
          holding: filtersState['Holding company'] || undefined,
          name: filtersState.Company || undefined,
          website: filtersState['Company website'] || undefined,
          linkedin: filtersState['Company LinkedIn'] || undefined,
          founded: getMinMaxDate('Founded'),
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
        is_in_work: filtersState['In work'].map(item => Number(item === 'Yes')),
        date_of_use: getMinMaxDate('Date of use')
      },
      sort: sortBy,
      listField:
        listField ||
        (paramURL.get('fields') ? paramURL.get('fields')?.split(',') : [])
    }),
    [filtersState, filtersSettings, sortBy]
  );

  return (
    <FilterContext.Provider value={{ requestValues }}>
      {children}
    </FilterContext.Provider>
  );
};
