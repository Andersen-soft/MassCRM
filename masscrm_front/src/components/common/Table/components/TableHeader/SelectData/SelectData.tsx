import React, { FC, useCallback, useMemo, useState } from 'react';
import { ArrowDropDown } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { styleNames } from 'src/services';
import { MoreInformation, CustomCheckBox } from 'src/components/common';
import style from './SelectData.scss';
import { ITableRow } from '../../../interfaces';

const sn = styleNames(style);

export const SelectData: FC<{
  isCheckedAll: boolean;
  onSelectAll: Function;
  data?: ITableRow[];
}> = ({ isCheckedAll, onSelectAll, data }) => {
  const location = useLocation();
  const history = useHistory();
  const [selectData, setSelectData] = useState<'all' | 'page'>(() =>
    new URLSearchParams(location.search).get('selectAll') ? 'all' : 'page'
  );

  const onSelectHandler = useCallback(
    (selection: 'page' | 'all') => (value: boolean): void => {
      const param = new URLSearchParams(location.search);
      if (selection === 'all') {
        param.set('selectAll', value ? 'on' : 'off');
      } else {
        param.delete('selectAll');
        onSelectAll(value);
      }
      history.push({
        search: param.toString()
      });
    },
    [location, data]
  );

  const setDataOfSelection = useCallback(
    (type: 'page' | 'all') => () => {
      setSelectData(type);
      onSelectHandler(type)(true);
    },
    [selectData, setSelectData, data]
  );

  const selectList = useMemo(
    () => (
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItem
          button
          component='a'
          selected={selectData === 'page'}
          onClick={setDataOfSelection('page')}
        >
          <ListItemText primary='All on the page' />
        </ListItem>
        <ListItem
          button
          component='a'
          selected={selectData === 'all'}
          onClick={setDataOfSelection('all')}
        >
          <ListItemText primary='All contacts' />
        </ListItem>
      </List>
    ),
    [selectData, data]
  );

  return (
    <div className={sn('wrapper')}>
      <CustomCheckBox
        value={isCheckedAll}
        onChange={onSelectHandler(selectData)}
      />
      <MoreInformation icon={ArrowDropDown} popperInfo={selectList} autoClose />
    </div>
  );
};
