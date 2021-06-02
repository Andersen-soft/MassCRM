import React, { useEffect, useState, FC } from 'react';
import { Header } from 'src/view/organisms';
import { TablePanel, AddForm } from './components';
import { MAX_LINES } from './constants';

interface IProps {
  blacklistPage: boolean;
}

export const Blacklist: FC<IProps> = ({ blacklistPage }) => {
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
        <TablePanel
          showTable={showTable}
          changeShowTable={onChangeShowTable}
          blacklistPage={blacklistPage}
        />
      </div>
    </>
  );
};

export default Blacklist;
