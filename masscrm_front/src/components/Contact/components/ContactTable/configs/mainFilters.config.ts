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
      name: 'blacklist',
      placeholder: 'Blacklist',
      isHidden: false,
      ...BASE_PARAMS
    },
    {
      name: 'In work',
      placeholder: 'In work',
      isHidden: true,
      ...BASE_PARAMS
    },
    {
      name: 'Bounces',
      placeholder: 'Bounces',
      isHidden: true,
      ...BASE_PARAMS
    },
    {
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
      name: 'hasJobs',
      placeholder: 'Has jobs',
      littleInput: true,
      mainFilter: true,
      multiSelect: false,
      isHidden: false,
      isMultiFilterState: false
    },
    {
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
      name: 'Responsible',
      placeholder: 'Responsible',
      littleInput: false,
      mainFilter: true,
      multiSelect: true,
      isHidden: true,
      isMultiFilterState: true
    },
    {
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
