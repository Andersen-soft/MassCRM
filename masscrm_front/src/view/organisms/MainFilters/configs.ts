export const mainFiltersConfig = (
  isFullTable?: boolean,
  rowsForJob?: boolean
) => {
  const BASE_PARAMS = {
    littleInput: true,
    mainFilter: true,
    multiSelect: true,
    isMultiFilterState: false
  };
  const basicFilters = [
    {
      code: 'blacklist',
      name: 'blacklist',
      placeholder: 'Blacklist',
      isHidden: false,
      ...BASE_PARAMS
    },
    {
      code: 'is_in_work',
      name: 'In work',
      placeholder: 'In work',
      isHidden: true,
      ...BASE_PARAMS
    },
    {
      code: 'bounces',
      name: 'Bounces',
      placeholder: 'Bounces',
      isHidden: true,
      ...BASE_PARAMS
    },
    {
      code: 'no_email',
      name: 'noEmail',
      placeholder: 'Noemail@noemail.com',
      littleInput: false,
      mainFilter: true,
      multiSelect: false,
      isHidden: true,
      isMultiFilterState: false
    }
  ];

  const jobsFilters = [
    {
      code: 'has_jobs',
      name: 'hasJobs',
      placeholder: 'Has jobs',
      littleInput: true,
      mainFilter: true,
      multiSelect: false,
      isHidden: false,
      isMultiFilterState: false
    },
    {
      code: 'vacancy_status',
      name: 'vacancyStatus',
      placeholder: 'Vacancy status',
      littleInput: true,
      mainFilter: true,
      multiSelect: false,
      isHidden: false,
      isMultiFilterState: false
    }
  ];

  const fullTableFilters = [
    {
      code: 'responsible',
      name: 'Responsible',
      placeholder: 'Responsible',
      littleInput: false,
      mainFilter: true,
      multiSelect: true,
      isHidden: true,
      isMultiFilterState: true
    },
    {
      code: 'responsible_roles',
      name: 'responsibleRoles',
      placeholder: 'Roles',
      isHidden: true,
      ...BASE_PARAMS
    }
  ];

  if (rowsForJob && !isFullTable) {
    return [...jobsFilters, ...basicFilters];
  }

  if (isFullTable) {
    return [...fullTableFilters, ...jobsFilters, ...basicFilters];
  }

  return basicFilters;
};
