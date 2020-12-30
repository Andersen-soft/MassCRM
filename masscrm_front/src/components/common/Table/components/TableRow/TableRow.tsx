import React, { FC, useMemo, useState, useCallback } from 'react';
import { TableCell, TableRow, Dialog } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import {
  CustomCheckBox,
  CommonIcon,
  MoreInformation,
  SocialIcon,
  DefaultPopUp,
  Control
} from 'src/components/common';
import { ShowAllTD } from 'src/utils/table/cells';
import copy from 'assets/svg/copy.svg';
import { ITableCell, ITableRowProps, TOpen } from '../../interfaces';

const INACTIVE_USER = 'Inactive';

export const TableRowItem: FC<ITableRowProps> = ({
  row,
  config,
  data,
  currentPage,
  fetchUsers
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const onSelectHandler = () =>
    config.onSelectRow && config.onSelectRow(row.id);

  const handleChangeOpenState = useCallback(
    (value: boolean) => (): void => {
      setOpen(value);
    },
    []
  );

  const onConfirmDeleteHandler = (id: number) => () => {
    config.onDeleteSelected && config.onDeleteSelected(id);
  };

  const onEditHandler = (id: number, type?: TOpen) => () => {
    config.onEdit && config.onEdit(id, type);
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
        <TableCell className='smallTD' component='th' scope='row' key='delete'>
          <CommonIcon
            IconComponent={Delete}
            onClick={handleChangeOpenState(true)}
          />
          <Dialog open={open}>
            <DefaultPopUp
              questionMessage='Are you sure you want to delete this contact?'
              onClose={handleChangeOpenState(false)}
              onConfirm={onConfirmDeleteHandler(row.id)}
            />
          </Dialog>
        </TableCell>
      ),
    [open]
  );

  const canEdit = useMemo(
    () =>
      config.hasEdit && (
        <TableCell component='th' scope='row' key='edit' className='smallTD'>
          <CommonIcon IconComponent={Edit} onClick={onEditHandler(row.id)} />
        </TableCell>
      ),
    [onEditHandler]
  );

  const canCopy = useMemo(
    () =>
      config.hasCopy && (
        <TableCell component='th' scope='row' key='copy' className='smallTD'>
          <CommonIcon
            IconComponent={copy}
            onClick={onEditHandler(row.id, 'copy')}
          />
        </TableCell>
      ),
    [onEditHandler]
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

  const canControl = useMemo(() => {
    const userActive = row.cells.map(item => Object.values(item));

    return (
      config.hasControl && (
        <TableCell component='th' scope='row' key='edit' className='smallTD'>
          <Control
            id={row.id}
            currentPage={currentPage}
            fetchUsers={fetchUsers}
            disableResetPassword={row.disableResetPassword}
            hasDeleteButton={userActive.flat(1).includes(INACTIVE_USER)}
          />
        </TableCell>
      )
    );
  }, [row, currentPage, config]);

  const cellMapCallback = (
    {
      type,
      data: dataCell,
      socialName = 'linkedin',
      component,
      isBold,
      isBlue,
      isComment
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
    if (isComment) {
      return (
        <TableCell key={index}>
          <ShowAllTD value={String(dataCell)} />
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
      {canCopy}
      {row.cells.map(cellMapCallback)}
      {hasInfo}
      {canControl}
    </TableRow>
  );
};
