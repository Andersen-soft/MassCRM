import {
  IContactFiltersState,
  IDefaultFilterValues,
  IFilterValuesUsers,
  IMultiFilterState,
  ISortingState
} from 'src/interfaces';

export const initialUsersFilterState: IFilterValuesUsers = {
  fullName: '',
  email: '',
  login: '',
  roles: [],
  skype: '',
  position: '',
  status: ''
};
export const dateFilterValues: string[] = [
  'contact_created',
  'contact_updated',
  'date_of_birth',
  'company_created',
  'date_of_use',
  'founded',
  'sale_created',
  'last_touch',
  'added_to_mailing'
];

export const initialFiltersState: IContactFiltersState = {
  responsible: [],
  contact_created: [],
  contact_updated: [],
  origin: [],
  first_name: '',
  last_name: '',
  full_name: '',
  gender: [],
  date_of_birth: [],
  country: [],
  region: [],
  city: [],
  position: [],
  linkedin: '',
  social_networks: '',
  phone: '',
  skype: '',
  email: '',
  requires_validation: '',
  confidence: [],
  colleague: '',
  service_id: '',
  added_to_mailing: [],
  last_touch: [],
  sequence: '',
  status: [],
  opens: [],
  views: [],
  deliveries: [],
  replies: [],
  bounces: [],
  mails: '',
  my_notes: '',
  sale_created: [],
  source: [],
  sale_id: 0,
  sale_status: [],
  project_c1: '',
  company: [],
  company_industry: [],
  company_size: [],
  company_linkedin: '',
  company_website: '',
  cto: '',
  founded: [],
  company_created: [],
  company_subsidiary: '',
  company_holding: '',
  company_type: [],
  jobs: '',
  jobs_skills: '',
  blacklist: [],
  date_of_use: [],
  is_in_work: [],
  comment: '',
  no_email: '',
  main_bounces: [],
  responsible_roles: [],
  has_jobs: '',
  vacancy_status: '',
  global: {}
};
export const defaultFilterValues: IDefaultFilterValues = {
  blacklist: ['No'],
  has_jobs: 'Disabled',
  vacancy_status: 'Active'
};

export const initialMultiFilterState: IMultiFilterState = {
  responsible: [],
  country: [],
  region: [],
  city: [],
  position: [],
  company: [],
  company_industry: [],
  source: [],
  company_size: []
};

export const initialSortingState: ISortingState = {
  'Contact created': {
    field_name: 'created_at',
    type_sort: 'DESC'
  },
  'Contact updated': {
    field_name: 'updated_at',
    type_sort: 'DESC'
  },
  'Date of birth': {
    field_name: 'updated_at',
    type_sort: 'DESC'
  },
  'Added to mailing': {
    field_name: 'added_to_mailing',
    type_sort: 'DESC'
  },
  'Last touch': {
    field_name: 'last_touch',
    type_sort: 'DESC'
  },
  'Date of use': {
    field_name: 'date_of_use',
    type_sort: 'DESC'
  }
};
