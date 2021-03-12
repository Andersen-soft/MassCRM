import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableCellBaseProps, Typography } from '@material-ui/core';
import {
  DoneRounded,
  ErrorOutline,
  HourglassEmptyRounded
} from '@material-ui/icons';
import cn from 'classnames';
import { Progress } from 'src/components/common';
import {
  getExportList,
  getImportList,
  clearWebsocketProgressBar
} from 'src/actions';
import {
  getExportProgressValue,
  getImportProgressValue,
  getFilterExportData,
  getExportDataTableSelector,
  getImportDataTableSelector,
  getCurrentPage
} from 'src/selectors';
import { IExportSearch, IImportSearch } from 'src/interfaces';
import { formatDateFilter } from 'src/utils/form/date';
import { IStatusCell } from './interfaces';
import { useStyles } from './StatusCell.styles';

interface IStatusCellProps {
  rowId: number;
  status?: string;
  type?: string;
}

type StatusCellComponentProps = Partial<IStatusCellProps> &
  React.PropsWithChildren<TableCellBaseProps>;

const StatusCellComponent = ({
  rowId,
  status,
  type,
  className
}: StatusCellComponentProps) => {
  const classes = useStyles();
  const isExportTable = type === 'export_contacts';
  const dispatch = useDispatch();
  const currentPage: number = useSelector(getCurrentPage);
  const statusFilter = useSelector(getFilterExportData);
  const progressData = useSelector(
    isExportTable ? getExportProgressValue : getImportProgressValue
  );
  const { show, filter } = useSelector(
    isExportTable ? getExportDataTableSelector : getImportDataTableSelector
  );
  const progressValue = progressData[`${rowId}`]?.percent;

  const iconOfStatus: { [key: string]: () => JSX.Element } = {
    Done: () => <DoneRounded className={classes.doneIcon} />,
    'In progress': () => <Progress value={progressValue} />,
    Waiting: () => <HourglassEmptyRounded color='disabled' />,
    Failed: () => <ErrorOutline color='error' />
  };

  const getStatusIcon = useCallback(() => {
    if (!status) return iconOfStatus.error();
    return iconOfStatus[`${status}`]();
  }, [status, progressData]);

  const findStatus = useCallback(
    (statusValue: string) => {
      const keys = Object.keys(statusFilter);
      let result = '';
      keys.forEach(item => {
        if (statusFilter[item] === statusValue) result = item;
      });
      return result;
    },
    [statusFilter]
  );

  const requestValues: IExportSearch | IImportSearch = useMemo(
    () => ({
      limit: show || undefined,
      page: currentPage,
      search: {
        user: filter?.user || undefined,
        date: filter?.date ? formatDateFilter(filter?.date) : undefined,
        status: filter?.status ? findStatus(filter?.status) : undefined,
        name: filter?.name || undefined
      }
    }),
    [currentPage, show, filter]
  );

  useEffect(() => {
    const isLoadComplete = progressValue === 100;
    const isProgressStatus = status === 'In progress';
    if (isLoadComplete && isProgressStatus) {
      dispatch(clearWebsocketProgressBar(isExportTable, rowId));
      // eslint-disable-next-line no-unused-expressions
      isExportTable
        ? dispatch(getExportList(requestValues))
        : dispatch(getImportList(requestValues));
    }
  }, [progressData]);

  return (
    <td className={cn(classes.root, className)}>
      <Typography className={classes.text}>{status}</Typography>
      <div className={classes.statusWrapper}>{getStatusIcon()}</div>
    </td>
  );
};

export const StatusCell = (props: IStatusCell) => (
  otherProps: TableCellBaseProps
) => StatusCellComponent({ ...props, ...otherProps });
