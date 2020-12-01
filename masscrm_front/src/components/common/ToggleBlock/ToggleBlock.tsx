import React, { FC, useCallback, useState } from 'react';
import { styleNames } from 'src/services';
import { ShowAll } from '..';
import style from './ToggleBlock.scss';

const sn = styleNames(style);

export const ToggleBlock: FC<{
  label: string;
}> = ({ label, children }) => {
  const [active, setActive] = useState(false);

  const setActiveHandler = useCallback((): void => {
    setActive(value => !value);
  }, []);

  return (
    <div className={sn('toggle-block')}>
      <div className={sn('toggle-header')}>
        <span className={sn('toggle-title')}>{label}</span>
        <ShowAll
          onClick={setActiveHandler}
          isOpen={active}
          title={active ? 'hide' : 'show'}
        />
      </div>
      {active && children}
    </div>
  );
};
