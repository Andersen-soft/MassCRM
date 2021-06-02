import React, { FC, useMemo, useState, useCallback } from 'react';
import { TableCell, TableRow, Dialog } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { CommonIcon, CustomCheckBox, SocialIcon } from 'src/view/atoms';
import { DefaultPopup } from 'src/view/molecules';
import { ShowAllTD, MoreInformation } from 'src/view/organisms';
import {
  ITableRow,
  ITableBodyConfig,
  ITableColumnConfig,
  Open,
  ITableCell
} from 'src/interfaces';
import { DELETE_CONTACT_CONFIRM } from 'src/constants';
import { CopyIcon, Control } from './components';

interface IProps {
  fetchUsers?: () => void;
  row: ITableRow;
  config: ITableColumnConfig;
  data: ITableBodyConfig;
  onSelect?: (id: number) => void;
  currentPage?: number;
  isNC2myContacts?: boolean;
  canEditContact?: boolean;
}

export const TableRowItem: FC<IProps> = ({
  row,
  config,
  data,
  currentPage,
  fetchUsers,
  isNC2myContacts,
  canEditContact
}) => {
  const [open, setOpen] = useState(false);

  const onSelectHandler = () =>
    config.onSelectRow &&
    config.onSelectRow(row.id)(!data.selectedRows?.includes(row.id));

  const handleChangeOpenState = useCallback(
    (value: boolean) => (): void => {
      setOpen(value);
    },
    []
  );

  const onConfirmDeleteHandler = (id: number) => () => {
    config.onDeleteSelected && config.onDeleteSelected(id);
  };

  const onEditHandler = (id: number, type?: Open) => () => {
    config.onEdit && config.onEdit(id, type);
  };

  const canSelected = useMemo(
    () =>
      config.hasSelectAll && (
        <TableCell
          component='th'
          scope='row'
          key='select'
          className='smallTD'
          data-testid={`table_select_${row.id}`}
        >
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
      config.hasDelete &&
      !isNC2myContacts && (
        <TableCell
          className='smallTD'
          component='th'
          scope='row'
          key='delete'
          data-testid={`table_delete_${row.id}`}
        >
          <CommonIcon
            IconComponent={Delete}
            onClick={handleChangeOpenState(true)}
          />
          <Dialog open={open}>
            <DefaultPopup
              questionMessage={DELETE_CONTACT_CONFIRM}
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
      config.hasEdit &&
      canEditContact && (
        <TableCell
          component='th'
          scope='row'
          key='edit'
          className='smallTD'
          data-testid={`table_edit_${row.id}`}
        >
          <CommonIcon IconComponent={Edit} onClick={onEditHandler(row.id)} />
        </TableCell>
      ),
    [onEditHandler]
  );

  const canCopy = useMemo(
    () =>
      config.hasCopy && (
        <TableCell
          component='th'
          scope='row'
          key='copy'
          className='smallTD'
          data-testid={`table_copy_${row.id}`}
        >
          <CommonIcon
            IconComponent={CopyIcon}
            onClick={onEditHandler(row.id, 'copy')}
          />
        </TableCell>
      ),
    [onEditHandler]
  );

  const hasInfo = useMemo(
    () =>
      config.hasInfo && (
        <TableCell
          component='th'
          scope='row'
          key='info'
          data-testid={`table_hasinfo_${row.id}`}
        >
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
        <TableCell
          component='th'
          scope='row'
          key='edit'
          className='smallTD'
          data-testid={`table_cancontrol_${row.id}`}
        >
          <Control
            id={row.id}
            currentPage={currentPage}
            fetchUsers={fetchUsers}
            disableResetPassword={row.disableResetPassword}
          />
        </TableCell>
      ),
    [row, currentPage, config]
  );

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
          <ShowAllTD value={`${dataCell}`} />
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
    return null;
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
