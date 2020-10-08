import React, { FC, useEffect } from 'react';
import { styleNames } from 'src/services';
import { Header, TablePanel } from 'src/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersData } from 'src/actions';
import { ExportTable } from './components';
import style from './ExportPage.scss';
import { getExportDataTableSelector } from '../../selectors';

const sn = styleNames(style);

export const ExportPage: FC = () => {
  const { total, show, ...props } = useSelector(getExportDataTableSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiltersData());
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('export')}>
          <TablePanel title='Export details' total={total} show={show} />
          <ExportTable {...props} total={total} show={show} />
        </div>
      </div>
    </>
  );
};
