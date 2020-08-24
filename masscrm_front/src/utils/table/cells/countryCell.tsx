import React from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { ILocation } from 'src/interfaces';
import { LocationCellText } from 'src/components/common/Table/components';

export const countryCell = (
  id: number,
  location: ILocation,
  type: string,
  required?: boolean
) => ({ className }: React.PropsWithChildren<TableCellBaseProps>) => {
  return (
    <LocationCellText
      location={location}
      type={type}
      id={id}
      className={className}
      required={required}
    />
  );
};
