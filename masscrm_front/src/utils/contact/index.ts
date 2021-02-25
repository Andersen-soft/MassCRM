interface IGetFullNameArgs {
  firstName: string;
  lastName: string;
  fullName?: string;
}

export const getFullName = ({
  firstName,
  lastName,
  fullName
}: IGetFullNameArgs) =>
  fullName || `${firstName || ''}${lastName ? ' ' : ''}${lastName || ''}`;
