import { IRoles, IUser, ISearchItem } from 'src/interfaces';

const REQUIRED_FIELDS: string[] = [
  'First Name',
  'Last Name',
  'Email',
  'Company',
  'Country',
  'Title',
  'Industry',
  'Website'
];

export const formatSearchList = (usersList: IUser[]): ISearchItem[] =>
  usersList.map(
    (userInfo: IUser): ISearchItem => ({
      key: `${userInfo.id}`,
      label: `${userInfo.name} ${userInfo.surname}`
    })
  );

export const checkRequiredField = (roles: IRoles, fieldsList: string[]) => {
  const errorsArray: string[] = [];

  REQUIRED_FIELDS.forEach(elem => {
    if (!fieldsList.includes(elem)) {
      errorsArray.push(`Please select required columns: ${elem}`);
    }
  });
  if (roles.nc2 && !fieldsList.includes('Job')) {
    errorsArray.push('Please select required columns: "Job"');
  }
  if (fieldsList.includes('Sequence') && !fieldsList.includes('Status')) {
    errorsArray.push('Please select "Status" or skip "Sequence"');
  }
  if (fieldsList.includes('Status') && !fieldsList.includes('Sequence')) {
    errorsArray.push('Please select "Sequence" or skip "Status"');
  }
  if (
    !fieldsList.includes('Job') &&
    fieldsList.includes('Job skills') &&
    fieldsList.includes('Job url') &&
    !roles.nc2
  ) {
    errorsArray.push('Please select "Job" or skip "Job skills" and "Job url"');
  }
  if (
    !fieldsList.includes('Job') &&
    fieldsList.includes('Job skills') &&
    !fieldsList.includes('Job url') &&
    !roles.nc2
  ) {
    errorsArray.push('Please select "Job" or skip "Job skills"');
  }
  if (
    !fieldsList.includes('Job') &&
    !fieldsList.includes('Job skills') &&
    fieldsList.includes('Job url') &&
    !roles.nc2
  ) {
    errorsArray.push('Please select "Job" or skip "Job url"');
  }
  return errorsArray;
};
