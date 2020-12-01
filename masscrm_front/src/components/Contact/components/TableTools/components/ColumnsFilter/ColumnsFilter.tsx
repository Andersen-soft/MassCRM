import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { MoreInformation } from 'src/components/common';
import { Tune } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ITableHeaderItem } from 'src/components/common/Table/interfaces';
import { getFilterSettings } from 'src/selectors';
import { setListField } from 'src/actions';
import { styleNames } from 'src/services';
import { ColumnsList } from '../ColumnsList';
import { TableConfigCallBack } from '../../../ContactTable/configs/AddContactTable.config';
import style from '../../TableTools.scss';

const sn = styleNames(style);

export const ColumnsFilter: FC<{ isFullTable: boolean }> = ({
  isFullTable
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = history;
  const { listField } = useSelector(getFilterSettings);
  const contactHeader: Array<ITableHeaderItem> = TableConfigCallBack(
    isFullTable,
    true,
    true
  ).rows;

  const contactColumns = contactHeader.map(
    ({ code, name }: ITableHeaderItem) => ({ code, name })
  );
  const currentParam = new URLSearchParams(location.search);

  listField && currentParam.set('fields', listField?.join(',') || '');

  history.push({
    search: currentParam.toString()
  });

  const onChangeFilter = (code: string) => {
    const list = listField || [];
    const codeArray: Array<string> = list.includes(code)
      ? list?.filter(element => code !== element)
      : [...list, code];
    dispatch(setListField(codeArray));
  };

  const onChangeAllFilter = () => {
    const newListField = listField?.length
      ? []
      : contactColumns.map(item => item.code).filter(item => !!item);
    dispatch(setListField(newListField));
  };

  return (
    <span className={sn('table-tools__icon')}>
      <div className={sn('tooltip')}>
        <MoreInformation
          icon={Tune}
          popperInfo={
            <ColumnsList
              items={contactColumns}
              itemsChecked={listField}
              onChangeFilter={onChangeFilter}
              onChangeAllFilter={onChangeAllFilter}
              indeterminateCheckbox={!!listField?.length}
            />
          }
        />
        <span className={sn('tooltipFilterText')}>
          Configure fields in the table
        </span>
      </div>
    </span>
  );
};
