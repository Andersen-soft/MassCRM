import React, { FC, memo } from 'react';
import { Tooltip } from '@material-ui/core';
import { tooltipStyles } from 'src/styles';
import { cutStringWithEllipsis } from 'src/utils';
import { BLANK, NO_REFERRER, TOP_START } from 'src/constants';
import { useStyles } from './Item.styles';

interface IProps {
  title: string;
  value: string;
  isLink?: boolean;
}

const Item: FC<IProps> = ({ value = '', title, isLink }) => {
  const tooltipClasses = tooltipStyles();

  const getValue = () => (value ? cutStringWithEllipsis(value, 40) : '');

  const styles = useStyles();

  return (
    <div className={styles.item}>
      <span className={styles.spanLeft}>{title}:</span>
      {isLink ? (
        <Tooltip title={value} placement={TOP_START} classes={tooltipClasses}>
          <a
            href={value}
            rel={NO_REFERRER}
            target={BLANK}
            className={`${styles.spanRight} ${styles.link}`}
          >
            {getValue()}
          </a>
        </Tooltip>
      ) : (
        <Tooltip title={value} placement={TOP_START} classes={tooltipClasses}>
          <span className={styles.spanRight}>{getValue()}</span>
        </Tooltip>
      )}
    </div>
  );
};

export const InfoPartJobItem = memo(Item);
