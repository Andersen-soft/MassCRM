import React, { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Tune } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterSettings, setListField } from 'src/store/slices';
import { MoreInformation } from 'src/view/organisms';
import { tableConfigCallback } from 'src/utils';
import { ITableHeaderItem } from 'src/interfaces';
import { tooltipStyles } from 'src/styles';
import { TOP_START } from 'src/constants';
import { List } from './components';
import { useStyles } from './ColumnsFilter.styles';

interface IProps {
  isFullTable: boolean;
  rowsForJob?: boolean;
}

export const ColumnsFilter: FC<IProps> = ({ isFullTable, rowsForJob }) => {
  const styles = useStyles();
  const tooltipClasses = tooltipStyles();

  const dispatch = useDispatch();

  const history = useHistory();
  const { search: locationSearch } = useLocation();

  const { listField } = useSelector(getFilterSettings);

  const contactHeader: ITableHeaderItem[] = tableConfigCallback(
    isFullTable,
    !!rowsForJob,
    true
  ).rows;

  const contactColumns = contactHeader.map(
    ({ code, name }: ITableHeaderItem) => ({ code, name })
  );
  const currentParam = new URLSearchParams(locationSearch);

  const onChangeFilter = (code: string) => {
    const list = listField || [];
    const codeArray: string[] = list.includes(code)
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

  useEffect(() => {
    listField && currentParam.set('fields', listField?.join(',') || '');

    history.push({
      search: currentParam.toString()
    });
  }, [listField]);

  return (
    <Tooltip
      title='Configure fields in the table'
      classes={tooltipClasses}
      placement={TOP_START}
    >
      <div className={styles.tooltip} data-testid='configure_fields_button'>
        <MoreInformation
          icon={Tune}
          popperInfo={
            <List
              items={contactColumns}
              itemsChecked={listField}
              onChangeFilter={onChangeFilter}
              onChangeAllFilter={onChangeAllFilter}
              indeterminateCheckbox={!!listField?.length}
            />
          }
        />
        {/* <span className={classes.tooltipFilterText}>
          Configure fields in the table
        </span> */}
      </div>
    </Tooltip>
  );
};
