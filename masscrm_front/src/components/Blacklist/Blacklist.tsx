import React, { useEffect, useState } from 'react';
import { Header } from '../common/Header';
import { AddForm } from './components/AddForm';
import { TablePanel } from './components/TablePanel';

export const Blacklist = () => {
  const MAX_LINES = 7;
  const [lines, setLines] = useState<null | number>(null);
  const [areaHeight, setAreaHeight] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(true);

  const onChangeLines = (value: number) => setLines(value);

  const onChangeShowTable = () => setShowTable(prev => !prev);

  const changeHeight = () => {
    setAreaHeight(true);
    setShowTable(false);
  };

  useEffect(() => {
    return lines && lines >= MAX_LINES ? changeHeight() : setAreaHeight(false);
  }, [lines]);

  return (
    <>
      <Header />
      <div className='container'>
        <AddForm changeLines={onChangeLines} tall={areaHeight} />
        <TablePanel showTable={showTable} changeShowTable={onChangeShowTable} />
      </div>
    </>
  );
};

export default Blacklist;
