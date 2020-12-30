import React, { PropsWithChildren, useMemo } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from '..';
import { CompanyEdit } from '.';
import { ICompanyCell } from './interfaces/ICompanyCell';

export const companyCell = ({ value, type, href, ...props }: ICompanyCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const companies = useMemo(() => {
    return value?.map(({ name }) => name).join(',');
  }, [value]);

  const contentTD = () =>
    type === 'name' ? (
      <a href={href} rel='noreferrer' target='_blank'>
        {companies}
      </a>
    ) : (
      <div>{companies}</div>
    );

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, type, ...props }}
      ContentTD={contentTD}
      ContentEdit={CompanyEdit}
      disabled={!type}
    />
  );
};
