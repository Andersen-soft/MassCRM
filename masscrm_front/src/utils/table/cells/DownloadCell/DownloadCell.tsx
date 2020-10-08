import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { GetApp } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { getExportFile } from 'src/actions';
import { CommonIcon } from 'src/components/common';
import { TableCellBaseProps } from '@material-ui/core';
import style from '../cell.scss';

const sn = styleNames(style);

export const downLoadCell = (nameFile?: string, path?: string) => ({
  className
}: React.PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();
  const onClickHandler = useCallback(
    () => path && getExportFile(path, nameFile, dispatch),
    [getExportFile, path, dispatch]
  );

  return (
    <td className={className}>
      {path ? (
        <button
          onClick={onClickHandler}
          type='button'
          className={sn('download')}
        >
          <CommonIcon IconComponent={GetApp} />
          <span className={sn('download-title')}>Download</span>
        </button>
      ) : null}
    </td>
  );
};
