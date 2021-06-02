import React, { useCallback, PropsWithChildren, FC } from 'react';
// import { useSelector } from 'react-redux';
import { TableCellBaseProps, Typography } from '@material-ui/core';
import {
  DoneRounded,
  ErrorOutline,
  HourglassEmptyRounded
} from '@material-ui/icons';
import cn from 'classnames';
// import {
// getExportList,
// getImportList,
// clearWebsocketProgressBar,
// getExportProgressValue,
// getImportProgressValue
// getFilterExportData,
// getExportDataTableSelector,
// getImportDataTableSelector,
// getCurrentPage
// } from 'src/store/slices';
// import { IExportSearch, IImportSearch, IStatusCell } from 'src/interfaces';
// import { formatDateFilter } from 'src/utils';
import { IStatusCell } from 'src/interfaces';
import { ICell } from './interfaces';
// import { Progress } from './components';
import { useStyles } from './StatusCell.styles';

type IProps = Partial<ICell> & PropsWithChildren<TableCellBaseProps>;

const StatusCellComponent: FC<IProps> = ({
  // rowId,
  status,
  // type,
  className
}) => {
  const styles = useStyles();

  // const isExportTable = type === 'export_contacts';

  // const dispatch = useDispatch();
  // const currentPage: number = useSelector(getCurrentPage);
  // const statusFilter = useSelector(getFilterExportData);
  // const localStorageKey = `${type && `${type.split('_')[0]}`}`;
  // const progressData = useSelector(
  //   isExportTable ? getExportProgressValue : getImportProgressValue
  // );
  // const { show, filter } = useSelector(
  //   isExportTable ? getExportDataTableSelector : getImportDataTableSelector
  // );
  // let progressValue = progressData[`${rowId}`]
  //   ? progressData[`${rowId}`].percent
  //   : (
  //       localStorage.getItem(localStorageKey) &&
  //       JSON.parse(localStorage.getItem(localStorageKey) as string)[`${rowId}`]
  //     )?.percent;

  // useEffect(() => {
  //   // The progress value cannot be zero.
  //   // Value may be changed to zero for small amount of time for no reason after changing
  //   // the export state to "Done".
  //   if (!progressValue) {
  //     progressValue = 100;
  //   }
  // }, [progressValue]);

  const iconOfStatus: { [key: string]: () => JSX.Element } = {
    Done: () => <DoneRounded className={styles.doneIcon} />,
    // 'In progress': () => <Progress value={progressValue} />,
    'In progress': () => <HourglassEmptyRounded color='disabled' />,
    Waiting: () => <HourglassEmptyRounded color='disabled' />,
    Failed: () => <ErrorOutline color='error' />
  };

  const getStatusIcon = useCallback(() => {
    if (!status) return iconOfStatus.error();
    return iconOfStatus[`${status}`]();
  }, [status]);

  // const findStatus = useCallback(
  //   (statusValue: string) => {
  //     const keys = Object.keys(statusFilter);
  //     let result = '';
  //     keys.forEach(item => {
  //       if (statusFilter[item] === statusValue) result = item;
  //     });
  //     return result;
  //   },
  //   [statusFilter]
  // );

  // const requestValues: IExportSearch | IImportSearch = useMemo(
  //   () => ({
  //     limit: show || undefined,
  //     page: currentPage,
  //     search: {
  //       user: filter?.user || undefined,
  //       date: filter?.date ? formatDateFilter(filter?.date) : undefined,
  //       status: filter?.status ? findStatus(filter?.status) : undefined,
  //       name: filter?.name || undefined
  //     }
  //   }),
  //   [currentPage, show, filter]
  // );

  // useEffect(() => {
  //   const isLoadComplete = progressValue === 100;
  //   const isProgressStatus = status === 'In progress';
  //   if (isLoadComplete && isProgressStatus) {
  //     const localStorageData = JSON.parse(
  //       localStorage.getItem(localStorageKey) as string
  //     );
  //     delete localStorageData[`${rowId}`];
  //     localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
  //     // dispatch(clearWebsocketProgressBar(isExportTable, rowId));
  //     // TODO: disabled multiple requests source, fix it until next release
  //     // isExportTable
  //     //   ? dispatch(getExportList(requestValues))
  //     //   : dispatch(getImportList(requestValues));
  //   }
  // }, [progressData]);

  return (
    <td className={cn(styles.root, className)}>
      <Typography className={styles.text}>{status}</Typography>
      <div className={styles.statusWrapper}>{getStatusIcon()}</div>
    </td>
  );
};

export const StatusCell = (props: IStatusCell) => (
  otherProps: TableCellBaseProps
) => StatusCellComponent({ ...props, ...otherProps });
