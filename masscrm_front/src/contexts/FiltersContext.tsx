import React, { FC, useCallback, useMemo, createContext } from 'react';
import { format, max, min, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { getShowCountContacts, getSortBy, getUser } from 'src/store/slices';
import { getCompaniesSizes, urlDeserialize } from 'src/utils';
import { IContactFilter } from 'src/interfaces';
import { YYYY_MM_DD, NC1, NC2 } from 'src/constants';
import { GENDERS, VALIDATION_VALUE } from './constants';
import { getBouncesValue } from './helpers';

import {
  DateFilter,
  IFiltersContextDefaultValues,
  IRequestValuesArgs
} from './interfaces';

export const FiltersContext = createContext<IFiltersContextDefaultValues>({
  getRequestValues: () => ({})
});

export const FiltersProvider: FC = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const filterQuery = urlParams.get('filter');
  const pageQuery = urlParams.get('page');
  const fieldsQuery = urlParams.get('fields');
  const urlFilterParams = filterQuery && urlDeserialize(filterQuery);
  const initialFilterParams = {
    responsible: [],
    contact_created: [],
    contact_updated: [],
    origin: [],
    gender: [],
    date_of_birth: [],
    country: [],
    region: [],
    city: [],
    position: [],
    requires_validation: '',
    confidence: [],
    added_to_mailing: [],
    last_touch: [],
    status: [],
    opens: [],
    views: [],
    deliveries: [],
    replies: [],
    bounces: [],
    sale_created: [],
    source: [],
    sale_status: [],
    project_c1: '',
    company: [],
    company_industry: [],
    company_size: [],
    founded: [],
    company_created: [],
    company_type: [],
    jobs: '',
    jobs_skills: '',
    blacklist: [],
    date_of_use: [],
    is_in_work: [],
    no_email: '',
    main_bounces: [],
    responsible_roles: [],
    has_jobs: '',
    vacancy_status: '',
    global: {}
  };

  const fieldNamesParse: { [key: string]: string } = {
    contact_created: 'created',
    contact_updated: 'updated',
    colleague: 'colleagues',
    company_industry: 'company_industries',
    email: 'emails',
    comment: 'comments',
    cto: 'company_cto',
    founded: 'company_founded',
    blacklist: 'in_blacklist',
    responsible: 'responsible_id',
    date_of_birth: 'birthday',
    phone: 'phones',
    project_c1: 'sale_project_c1',
    sale_id: 'sale_link'
  };

  const listFieldValues = fieldsQuery
    ?.split(',')
    .map(x =>
      Object.keys(fieldNamesParse).includes(x) ? fieldNamesParse[x] : x
    );

  const filterValues = {
    ...initialFilterParams,
    ...urlFilterParams
  };
  const sortBy = useSelector(getSortBy);
  const currentUser = useSelector(getUser);
  const showCount = useSelector(getShowCountContacts);
  const getGenderForRequest = useCallback(() => {
    return filterValues?.gender
      ?.map(
        (sex: string) => GENDERS.find(({ label }) => label === sex)?.value || ''
      )
      .filter(Boolean);
  }, [filterValues?.gender]);
  const getMinMax = (array: number[]) => ({ min: array[0], max: array[1] });

  const getFormatDateForRequest = (value: Date, view: string) => {
    return format(value, view);
  };

  const getValidationForRequest = (validation: string) =>
    VALIDATION_VALUE[validation];

  const getMinMaxDate = (name: DateFilter, daily?: boolean) => {
    if (daily) {
      return {
        min: format(new Date(), YYYY_MM_DD),
        max: format(new Date(), YYYY_MM_DD)
      };
    }

    const isDatesArrayValuesAreStrings = filterValues[name].every(
      (val: string | Date | number) => typeof val === 'string'
    );

    const getDates =
      filterValues?.[name].length && isDatesArrayValuesAreStrings
        ? [
            parseISO(filterValues[name][0].split(':').join('-')),
            parseISO(filterValues[name][1].split(':').join('-'))
          ]
        : filterValues?.[name];

    const getDateValue = (isMinFunc?: boolean) =>
      filterValues[name]?.length
        ? getFormatDateForRequest(
            isMinFunc ? min(getDates) : max(getDates),
            YYYY_MM_DD
          )
        : undefined;

    return {
      min: getDateValue(true),
      max: getDateValue()
    };
  };

  const getEmailValue = () =>
    filterValues.no_email && filterValues.no_email !== 'Include'
      ? filterValues.no_email.toLowerCase()
      : undefined;

  const getHasJobsValue = () => (filterValues.has_jobs === 'Exist' ? '1' : '0');

  const isNC2myContacts = (isMyContacts?: boolean) =>
    Object.keys(currentUser.roles).includes(NC2) && isMyContacts;

  const getJobsStatus = () => {
    if (
      filterValues.vacancy_status === 'All' ||
      Object.keys(currentUser.roles).includes(NC1)
    ) {
      return undefined;
    }
    return filterValues.vacancy_status === 'Active' ? '1' : '0';
  };

  const getRequestValues: ({
    daily,
    myContacts
  }: IRequestValuesArgs) => IContactFilter = useMemo(
    () => ({ daily, myContacts }: IRequestValuesArgs) => ({
      page: Number(pageQuery) || 1,
      limit: showCount,
      search: {
        skip_responsibility:
          (daily || myContacts) && !isNC2myContacts(myContacts) ? 0 : undefined,
        global: filterValues.global,
        created_at: getMinMaxDate('contact_created', daily),
        updated_at: getMinMaxDate('contact_updated'),
        responsible_id:
          (daily || myContacts) &&
          currentUser.id &&
          !isNC2myContacts(myContacts)
            ? [currentUser.id]
            : filterValues.responsible,
        first_name: filterValues?.first_name,
        last_name: filterValues?.last_name,
        full_name: filterValues?.full_name,
        gender: getGenderForRequest(),
        birthday: getMinMaxDate('date_of_birth'),
        country: filterValues.country,
        city: filterValues.city,
        region: filterValues.region,
        position: filterValues.position,
        linkedin: filterValues?.linkedin,
        no_email: getEmailValue(),
        email: filterValues?.email,
        phone: filterValues?.phone,
        skype: filterValues?.skype,
        origin: filterValues.origin,
        colleague_name: filterValues?.colleague,
        service_id: filterValues?.service_id,
        added_to_mailing: getMinMaxDate('added_to_mailing'),
        social_networks: filterValues?.social_networks,
        confidence: getMinMax(filterValues?.confidence),
        last_touch: getMinMaxDate('last_touch'),
        sequence: filterValues?.sequence,
        status: filterValues.status,
        opens: getMinMax(filterValues.opens),
        views: getMinMax(filterValues.views),
        deliveries: getMinMax(filterValues.deliveries),
        replies: getMinMax(filterValues.replies),
        bounces: getBouncesValue(filterValues.bounces),
        mails: filterValues?.mails,
        my_notes: filterValues?.my_notes,
        in_blacklist: filterValues.blacklist.map(
          (item: string) => +(item === 'Yes')
        ),
        comment: filterValues?.comment,
        sale: {
          id: filterValues?.sale_id,
          status: filterValues.sale_status,
          created_at: getMinMaxDate('sale_created'),
          source: filterValues.source,
          project_c1: getValidationForRequest(filterValues.project_c1)
        },
        company: {
          created_at: getMinMaxDate('company_created'),
          subsidiary: filterValues?.company_subsidiary,
          holding: filterValues?.company_holding,
          name: filterValues?.company,
          website: filterValues?.company_website,
          linkedin: filterValues?.company_linkedin,
          founded: getMinMaxDate('founded'),
          industry: filterValues.company_industry,
          company_size: getCompaniesSizes(filterValues.company_size),
          sto_full_name: filterValues?.cto,
          type: filterValues.company_type,
          jobs: filterValues.jobs ? [filterValues.jobs] : undefined,
          skills: filterValues.jobs_skills
            ? [filterValues.jobs_skills]
            : undefined,
          has_jobs:
            filterValues.has_jobs === 'Disabled'
              ? undefined
              : getHasJobsValue(),
          jobs_status: getJobsStatus()
        },
        requires_validation: getValidationForRequest(
          filterValues.requires_validation
        ),
        is_in_work: filterValues.is_in_work.map(
          (item: string) => +(item === 'Yes')
        ),
        date_of_use: getMinMaxDate('date_of_use'),
        responsible_roles: filterValues.responsible_roles
      },
      sort: sortBy,
      listField: listFieldValues ?? []
    }),
    [sortBy, showCount, filterValues]
  );
  return (
    <FiltersContext.Provider value={{ getRequestValues }}>
      {children}
    </FiltersContext.Provider>
  );
};
