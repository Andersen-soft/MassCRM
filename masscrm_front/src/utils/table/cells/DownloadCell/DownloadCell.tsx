import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { GetApp } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { getExportFile } from 'src/actions';
import { CommonIcon } from 'src/components/common';
import { TableCellBaseProps } from '@material-ui/core';
import style from '../cell.scss';

const sn = styleNames(style);

export const downLoadCell = (
  nameFile?: string,
  path?: string,
  openModalHandler?: () => void
) => ({ className }: React.PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();

  const onClickHandler = useCallback(
    () => path && getExportFile(path, nameFile, dispatch),
    [getExportFile, path, dispatch]
  );

  const btn = useMemo(() => {
    switch (true) {
      case Boolean(openModalHandler):
        return (
          <button
            className={sn('download')}
            type='button'
            onClick={openModalHandler}
          >
            <span className={sn('download-title')}>View result</span>
          </button>
        );
      case Boolean(path):
        return (
          <button
            onClick={onClickHandler}
            type='button'
            className={sn('download')}
          >
            <CommonIcon IconComponent={GetApp} />
            <span className={sn('download-title')}>Download</span>
          </button>
        );
      default:
        return null;
    }
  }, [path, onClickHandler, openModalHandler]);

  return <td className={className}>{btn}</td>;
};
