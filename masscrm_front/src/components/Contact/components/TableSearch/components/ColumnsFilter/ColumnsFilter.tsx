import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { MoreInformation } from 'src/components/common';
import { Tune } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ITableHeaderItem } from 'src/components/common/Table/interfaces';
import { getFilterSettings } from 'src/selectors';
// import history from 'src/store/history';
import { setListField } from 'src/actions';
import { styleNames } from 'src/services';
import { ColumnsList } from '../ColumnsList';
import { TableConfigCallBack } from '../../../ContactTable/configs/AddContactTable.config';
import style from '../../TableSearch.scss';

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
    true
  ).rows;

  const contactColumns = contactHeader?.map(
    ({ code, name }: ITableHeaderItem) => ({ code, name })
  );
  const currentParam = new URLSearchParams(location.search);

  listField && currentParam.set('fields', listField?.join(',') || '');

  history.push({
    search: currentParam.toString()
  });

  const onChangeFilter = (code: string) => {
    dispatch(setListField(code));
  };

  return (
    <span className={sn('table-search__icon')}>
      <div className={sn('tooltip')}>
        <MoreInformation
          icon={Tune}
          popperInfo={
            <ColumnsList
              items={contactColumns}
              itemsChecked={listField}
              onChangeFilter={onChangeFilter}
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
