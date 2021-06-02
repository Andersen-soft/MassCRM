import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CommonButton, FieldLabel } from 'src/view/atoms';
import {
  getImportInfo,
  getUnsuccessfullyProcessedDuplicates,
  getMissedDuplicates
} from 'src/store/slices';
import { useStyles } from './Import.styles';

export const Import = () => {
  const styles = useStyles();

  const info = useSelector(getImportInfo);

  const handleClickUnsuccessfully = useCallback(() => {
    return getUnsuccessfullyProcessedDuplicates(
      info.fileNameUnsuccessfullyDuplicates
    );
  }, [info]);

  const handleClickMissed = useCallback(() => {
    return getMissedDuplicates(info.fileNameMissedDuplicates);
  }, [info]);

  return (
    <div className={styles.root}>
      <FieldLabel
        label='Added new contacts:'
        className={styles.paddingBottom16}
        labelClassName={styles.labelText}
      >
        <span className={styles.num}>{info.countNewContacts}</span>
      </FieldLabel>
      <FieldLabel
        label='Added new companies:'
        className={styles.paddingBottom40}
        labelClassName={styles.labelText}
      >
        <span className={styles.num}>{info.countNewCompanies}</span>
      </FieldLabel>
      <FieldLabel
        label='Processed duplicate contacts:'
        className={styles.paddingBottom16}
        labelClassName={styles.labelText}
      >
        <span className={styles.num}>
          {info.countProcessedDuplicateContacts}
        </span>
      </FieldLabel>
      <FieldLabel
        label='Processed duplicate companies:'
        className={styles.paddingBottom40}
        labelClassName={styles.labelText}
      >
        <span className={styles.num}>
          {info.countProcessedDuplicateCompanies}
        </span>
      </FieldLabel>
      {info.countMissedDuplicates ? (
        <FieldLabel
          label='Missed duplicates:'
          className={styles.paddingBottom16}
          labelClassName={styles.labelText}
        >
          <div className={styles.downloadContainer}>
            <span className={`${styles.num} ${styles.paddingRight24}`}>
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
          className={styles.paddingBottom16}
          labelClassName={styles.labelText}
        >
          <div className={styles.downloadContainer}>
            <span className={`${styles.num} ${styles.paddingRight24}`}>
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
