export const mainFiltersConfig = (isFullTable?: boolean) => {
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
      ...BASE_PARAMS
    },
    {
      name: 'In work',
      placeholder: 'In work',
      ...BASE_PARAMS
    },
    {
      name: 'Bounces',
      placeholder: 'Bounces',
      ...BASE_PARAMS
    },
    {
      name: 'noEmail',
      placeholder: 'Noemail@noemail.com',
      littleInput: false,
      mainFilter: true,
      multiSelect: false,
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
      isMultiFilterState: true
    }
  ];

  if (isFullTable) {
    return [...basicFilters, ...fullTableFilters];
  }

  return basicFilters;
};
