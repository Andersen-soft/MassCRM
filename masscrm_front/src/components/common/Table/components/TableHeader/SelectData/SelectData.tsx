import React, { FC, useCallback, useMemo } from 'react';
import { ArrowDropDown } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { styleNames } from 'src/services';
import { MoreInformation, CustomCheckBox } from 'src/components/common';
import { useDispatch } from 'react-redux';
import { setSelectedContacts } from 'src/actions';
import style from './SelectData.scss';
import { ITableRow } from '../../../interfaces';

const sn = styleNames(style);

export const SelectData: FC<{
  isCheckedAll: boolean;
  onSelectAll: Function;
  data?: ITableRow[];
  currentPage?: number;
}> = ({ isCheckedAll, data, currentPage }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const param = new URLSearchParams(location.search);

  const onSelectHandler = useCallback(
    (selection: 'page' | 'all' = 'page') => (value: boolean) => {
      if (!value) {
        dispatch(setSelectedContacts({}));
        param.get('selectAllOnPage') && param.delete('selectAllOnPage');
        param.get('selectAll') && param.delete('selectAll');
      }
      if (selection === 'page' && value) {
        param.get('selectAll') && param.delete('selectAll');
        // eslint-disable-next-line no-unused-expressions
        param.get('selectAllOnPage')
          ? param.delete('selectAllOnPage')
          : param.set('selectAllOnPage', `${currentPage}`);
      }
      if (selection === 'all' && value) {
        param.get('selectAllOnPage') && param.delete('selectAllOnPage');
        param.set('selectAll', 'on');
      }
      history.push({
        search: param.toString()
      });
    },
    [location]
  );

  const setDataOfSelection = useCallback(
    (type: 'page' | 'all') => () => {
      return type === 'page'
        ? onSelectHandler(type)(!param.get('selectAllOnPage'))
        : onSelectHandler(type)(!param.get('selectAll'));
    },
    [location, data]
  );

  const selectList = useMemo(
    () => (
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItem
          button
          component='a'
          selected={param.get('selectAllOnPage') === String(currentPage)}
          onClick={setDataOfSelection('page')}
        >
          <ListItemText primary='All on the page' />
        </ListItem>
        <ListItem
          button
          component='a'
          selected={param.get('selectAll') === 'on'}
          onClick={setDataOfSelection('all')}
        >
          <ListItemText primary='All contacts' />
        </ListItem>
      </List>
    ),
    [location, data]
  );

  return (
    <div className={sn('wrapper')}>
      <CustomCheckBox value={isCheckedAll} onChange={onSelectHandler()} />
      <MoreInformation icon={ArrowDropDown} popperInfo={selectList} autoClose />
    </div>
  );
};
