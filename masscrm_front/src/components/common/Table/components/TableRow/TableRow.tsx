import React, { FC, useMemo } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import {
  CustomCheckBox,
  CommonIcon,
  MoreInformation,
  SocialIcon
} from 'src/components/common';
import { ITableCell, ITableRowProps } from '../../interfaces';
import { Control } from '../../../Control';

export const TableRowItem: FC<ITableRowProps> = ({
  row,
  config,
  data,
  currentPage
}) => {
  const onSelectHandler = () =>
    config.onSelectRow && config.onSelectRow(row.id);

  const onDeleteHandler = (id: number) => () => {
    config.onDeleteSelected && config.onDeleteSelected(id);
  };

  const onEditHandler = (id: number) => () => {
    config.onEdit && config.onEdit(id);
  };

  const canSelected = useMemo(
    () =>
      config.hasSelectAll &&
      onSelectHandler && (
        <TableCell component='th' scope='row' key='select' className='smallTD'>
          <CustomCheckBox
            value={data.selectedRows?.includes(row.id)}
            onChange={onSelectHandler}
          />
        </TableCell>
      ),
    [data.selectedRows]
  );

  const canDeleted = useMemo(
    () =>
      config.hasDelete && (
        <TableCell component='th' scope='row' key='delete' className='smallTD'>
          <CommonIcon
            IconComponent={Delete}
            onClick={onDeleteHandler(row.id)}
          />
        </TableCell>
      ),
    []
  );

  const canEdit = useMemo(
    () =>
      config.hasEdit && (
        <TableCell component='th' scope='row' key='edit' className='smallTD'>
          <CommonIcon IconComponent={Edit} onClick={onEditHandler(row.id)} />
        </TableCell>
      ),
    []
  );

  const hasInfo = useMemo(
    () =>
      config.hasInfo && (
        <TableCell component='th' scope='row' key='info'>
          <MoreInformation
            popperInfo={config.moreInfoRow && config.moreInfoRow(row.id)}
          />
        </TableCell>
      ),
    []
  );

  const canControl = useMemo(
    () =>
      config.hasControl && (
        <TableCell component='th' scope='row' key='edit' className='smallTD'>
          <Control
            id={row.id}
            disableResetPassword={row.disableResetPassword}
            currentPage={currentPage}
          />
        </TableCell>
      ),
    []
  );

  const cellMapCallback = (
    {
      type,
      data: dataCell,
      socialName = 'linkedin',
      component,
      isBold,
      isBlue
    }: ITableCell,
    index: number
  ) => {
    if (component) {
      return <TableCell key={index} component={component} />;
    }
    if (isBold) {
      return (
        <TableCell key={index} className='bold'>
          {dataCell}
        </TableCell>
      );
    }
    if (isBlue) {
      return (
        <TableCell key={index} className='blueText'>
          {dataCell}
        </TableCell>
      );
    }
    if (!type || type === 'string') {
      return <TableCell key={index}>{dataCell}</TableCell>;
    }
    if (type === 'socialIcon') {
      return (
        <TableCell
          key={index}
          component={props => (
            <td className={props.className}>
              <SocialIcon socialName={socialName} link={dataCell as string} />
            </td>
          )}
        />
      );
    }
    return false;
  };

  return (
    <TableRow>
      {canSelected}
      {canDeleted}
      {canEdit}
      {row.cells.map(cellMapCallback)}
      {hasInfo}
      {canControl}
    </TableRow>
  );
};
