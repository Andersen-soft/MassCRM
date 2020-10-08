import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FieldLabel } from 'src/components/common/FieldLabel';
import { CommonButton } from 'src/components/common';
import { IStoreState } from 'src/interfaces';
import { useStyles } from './Import.styles';
import {
  getUnsuccessfullyProcessedDuplicates,
  getMissedDuplicates
} from '../../../../actions';

export const Import: FC = () => {
  const classes = useStyles();
  const info = useSelector((state: IStoreState) => state.import.info);

  const handleClickUnsuccessfully = useCallback(() => {
    return getUnsuccessfullyProcessedDuplicates(
      info.fileNameUnsuccessfullyDuplicates
    );
  }, [info]);

  const handleClickMissed = useCallback(() => {
    return getMissedDuplicates(info.fileNameMissedDuplicates);
  }, [info]);

  return (
    <div className={classes.root}>
      <FieldLabel
        label='Added new contacts:'
        className={classes.paddingBottom16}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>{info.countNewContacts}</span>
      </FieldLabel>
      <FieldLabel
        label='Added new companies:'
        className={classes.paddingBottom40}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>{info.countNewCompanies}</span>
      </FieldLabel>
      <FieldLabel
        label='Processed duplicate contacts:'
        className={classes.paddingBottom16}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>
          {info.countProcessedDuplicateContacts}
        </span>
      </FieldLabel>
      <FieldLabel
        label='Processed duplicate companies:'
        className={classes.paddingBottom40}
        labelClassName={classes.labelText}
      >
        <span className={classes.num}>
          {info.countProcessedDuplicateCompanies}
        </span>
      </FieldLabel>
      {info.countMissedDuplicates ? (
        <FieldLabel
          label='Missed duplicates:'
          className={classes.paddingBottom16}
          labelClassName={classes.labelText}
        >
          <div className={classes.downloadContainer}>
            <span className={`${classes.num} ${classes.paddingRight24}`}>
              {info.countMissedDuplicates}
            </span>
            <CommonButton
              text=''
              color='white'
              onClickHandler={handleClickMissed}
            >
              Download file
            </CommonButton>
          </div>
        </FieldLabel>
      ) : null}
      {info.countUnsuccessfully ? (
        <FieldLabel
          label='Unsuccessfully processed duplicates:'
          className={classes.paddingBottom16}
          labelClassName={classes.labelText}
        >
          <div className={classes.downloadContainer}>
            <span className={`${classes.num} ${classes.paddingRight24}`}>
              {info.countUnsuccessfully}
            </span>
            <CommonButton
              text=''
              color='white'
              onClickHandler={handleClickUnsuccessfully}
            >
              Download file
            </CommonButton>
          </div>
        </FieldLabel>
      ) : null}
    </div>
  );
};
