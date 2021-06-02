import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { ILocation } from 'src/interfaces';
import { Edit } from './components';

interface IProps {
  id: number;
  location: ILocation;
  type: string;
  required?: boolean;
  doubleClickEdit?: boolean;
}

export const countryCell = ({
  id,
  location,
  type,
  required,
  doubleClickEdit
}: IProps) => ({ className }: PropsWithChildren<TableCellBaseProps>) => (
  <Edit
    location={location}
    type={type}
    id={id}
    className={className}
    required={required}
    doubleClickEdit={doubleClickEdit}
  />
);
