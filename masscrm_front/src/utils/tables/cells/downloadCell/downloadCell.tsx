import React, { useCallback, useMemo, PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { TableCellBaseProps } from '@material-ui/core';
import { getExportFile } from 'src/store/slices';
import { createProperty } from 'src/utils/object';
import { Download, ViewResult } from './components';

export const downloadCell = (
  nameFile?: string,
  path?: string,
  openModalHandler?: () => void
) => ({ className }: PropsWithChildren<TableCellBaseProps>) => {
  const dispatch = useDispatch();

  const onClickHandler = useCallback(
    () => path && getExportFile(path, nameFile, dispatch),
    [getExportFile, path, dispatch]
  );

  const btn = useMemo(() => {
    const COMPONENTS: { [index: string]: JSX.Element | null } = {
      [createProperty('ViewResult', !!openModalHandler)]: (
        <ViewResult openModalHandler={openModalHandler} />
      ),
      [createProperty('Download', !!path)]: (
        <Download onClickHandler={onClickHandler} />
      ),
      default: null
    };

    return COMPONENTS[
      Object.keys(COMPONENTS).find(component => component) || 'default'
    ];
  }, [path, onClickHandler, openModalHandler]);

  return <td className={className}>{btn}</td>;
};
