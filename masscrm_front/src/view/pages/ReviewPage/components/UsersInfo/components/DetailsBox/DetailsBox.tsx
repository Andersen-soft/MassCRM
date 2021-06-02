import React, { FC } from 'react';
import { useStyles } from './DetailsBox.styles';

interface IProps {
  fieldsConfig: {
    title: string;
    descr: string | number;
  }[];
}

export const DetailsBox: FC<IProps> = ({ fieldsConfig }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      {fieldsConfig.map(({ title, descr }) => (
        <div key={descr} className={styles.itemBlock}>
          <div className={styles.blockWrapper}>
            <div className={styles.title}>{`${title}:`}</div>
            <div className={styles.descr}>{descr}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsBox;
