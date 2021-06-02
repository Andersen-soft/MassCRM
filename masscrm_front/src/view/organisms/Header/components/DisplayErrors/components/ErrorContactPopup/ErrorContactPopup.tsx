import React, { FC } from 'react';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { BLANK, NO_REFERRER } from 'src/constants';
import { IErrorsItem } from './interfaces';
import { useStyles } from './ErrorContactPopup.styles';

interface IProps {
  errorsData: string[];
  handleClose: () => void;
}

export const ErrorContactPopup: FC<IProps> = ({ errorsData, handleClose }) => {
  const parseData = errorsData.map(item => JSON.parse(item)).flat();

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <CommonIcon
        className={styles.close}
        IconComponent={CloseRoundedIcon}
        onClick={handleClose}
      />
      {parseData.map(
        ({ title, link, name, responsible, created_at }: IErrorsItem) => (
          <div key={link} className={styles.item}>
            <p className={styles.itemTitle}>{title}</p>
            <div className={styles.itemInfo}>
              <div className={styles.itemInfoDiv}>
                <a
                  href={link}
                  target={BLANK}
                  rel={NO_REFERRER}
                  className={styles.name}
                >
                  {name}
                </a>
              </div>
              <div className={styles.itemInfoDiv}>
                <span className={styles.created}>created:&nbsp;</span>
                <span className={styles.date}>{created_at}</span>
              </div>
              <div className={styles.itemInfoDiv}>
                <span className={styles.responsible}>responsible:&nbsp;</span>
                <span className={styles.responsiblePerson}>{responsible}</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
