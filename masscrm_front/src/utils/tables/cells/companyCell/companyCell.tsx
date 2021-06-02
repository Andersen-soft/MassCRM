import React, { PropsWithChildren, useMemo } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup } from 'src/view/atoms';
import { ICompanyCell } from 'src/interfaces';
import { BLANK, NO_REFERRER } from 'src/constants';
import { Edit } from './components';

export const companyCell = ({
  value,
  type,
  href,
  doubleClickEdit,
  ...props
}: ICompanyCell) => (tdProps: PropsWithChildren<TableCellBaseProps>) => {
  const companies = useMemo(() => {
    return value?.map(({ name }) => name).join(',');
  }, [value]);

  const contentTD = () =>
    type === 'name' ? (
      <a href={href} rel={NO_REFERRER} target={BLANK}>
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
      ContentEdit={Edit}
      doubleClickEdit={doubleClickEdit}
      disabled={!type}
    />
  );
};
