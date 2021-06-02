import React, { FC } from 'react';
import { useStyles } from './OcuupiedMessage.styles';

interface IProps {
  message: string[];
}

export const OccupiedMessage: FC<IProps> = ({ message }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapperThree}>
      {message.map(item => (
        <p key={item} className={styles.occupied}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default OccupiedMessage;
