import React, { FC, useCallback, useState } from 'react';
import { ShowAll } from 'src/view/molecules';
import { useStyles } from './ToggleBlock.styles';

interface IProps {
  label: string;
}

export const ToggleBlock: FC<IProps> = ({ label, children }) => {
  const [active, setActive] = useState(false);

  const setActiveHandler = useCallback((): void => {
    setActive(value => !value);
  }, []);

  const styles = useStyles();

  return (
    <div className={styles.toggleBlock}>
      <div className={styles.toggleHeader}>
        <span className={styles.toggleTitle}>{label}</span>
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
