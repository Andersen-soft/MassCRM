import React, { FC, useCallback, useMemo, useState } from 'react';
import filter from 'lodash.filter';
import {
  FormControl,
  Button,
  FormLabel,
  Popover,
  PopoverOrigin,
  Box
} from '@material-ui/core';
import { Add, ArrowDropDown } from '@material-ui/icons';
import { CommonIcon } from 'src/components/common';
import {
  IContactJobValues,
  IContactJobInput
} from 'src/interfaces/IContactJobInput';
import { inputStyle } from 'src/styles/CommonInput.style';
import { multiStyle } from 'src/styles/CustomMultiInput.style';
import { ContactJobRow } from './ContactJobRow';
import { ContactJobForm } from '../ContactJobForm/ContactJobForm';
import { jobInputStyle } from './ContactJobInput.style';

const ARRAY_LIMIT: number = 3;
const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

export const ContactJobInput: FC<IContactJobInput> = ({
  vacancies,
  onChange,
  errorMessage
}) => {
  const inputStyles = inputStyle();
  const multyStyles = multiStyle();
  const style = jobInputStyle();
  const [anchorForm, setAnchorForm] = useState<null | {
    el: HTMLElement;
    index: number;
  }>(null);
  const [anchorList, setAnchorList] = useState<null | HTMLElement>(null);
  const [formData, setFormData] = useState<IContactJobValues | null>(null);
  const [showText, setShowText] = useState<string>('Show more');
  const openForm = Boolean(anchorForm);
  const openList = Boolean(anchorList);
  const formId = openForm ? 'form-popover' : undefined;
  const listId = openList ? 'list-popover' : undefined;

  const classControl = useMemo(
    () => ({
      root: `${inputStyles.input} ${errorMessage && inputStyles.inputError}`
    }),
    [errorMessage]
  );
  const classLabel = useMemo(
    () => ({
      root: `${style.label} ${errorMessage && style.error}`
    }),
    [errorMessage]
  );

  const editJob = useCallback(
    (index, target) => {
      setFormData(vacancies[index]);
      setAnchorForm({ el: target, index });
    },
    [anchorForm, formData]
  );
  const removeJob = useCallback(
    (index: number) => {
      const updatedVacancies = filter(vacancies, (value, key) => {
        return key !== index;
      });

      onChange('vacancies', updatedVacancies);
    },
    [vacancies]
  );
  const jobList = useCallback(
    arrayPosition => {
      const jobsArray =
        arrayPosition === 'first'
          ? vacancies.slice(0, ARRAY_LIMIT)
          : vacancies.slice(ARRAY_LIMIT);
      const index = arrayPosition === 'first' ? 0 : ARRAY_LIMIT;

      return (
        <ContactJobRow
          arrayPosition={arrayPosition}
          jobs={jobsArray}
          indexCorrection={index}
          onRemoveHandler={removeJob}
          onEditHandler={editJob}
        />
      );
    },
    [vacancies]
  );
  const openFormPopover = useCallback(
    (event: HTMLElement, index: number) => {
      setAnchorForm({ el: event, index });
    },
    [anchorForm]
  );
  const handleFormOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    openFormPopover(event.currentTarget, -1);
  }, []);
  const closeForm = useCallback(() => {
    setAnchorForm(null);
    setFormData(null);
  }, [formData, anchorForm]);
  const openListPopover = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorList(event.currentTarget);
      setShowText('Show less');
    },
    [anchorList, showText]
  );
  const closeList = useCallback(() => {
    setAnchorList(null);
    setShowText('Show more');
  }, [anchorList, showText]);

  const handleChange = useCallback(
    (data: IContactJobValues, index: number) => {
      const newVacancies = [...vacancies];

      if (index === -1) {
        newVacancies.push(data);
      }
      if (index >= 0) {
        newVacancies[index] = data;
      }

      onChange('vacancies', newVacancies);
    },
    [vacancies]
  );

  return (
    <div className={style.wrap}>
      <FormControl variant='outlined' classes={classControl}>
        <FormLabel classes={classLabel}>*Job</FormLabel>

        {vacancies.length ? jobList('first') : null}

        <div className={style.buttonsWrap}>
          {vacancies.length > ARRAY_LIMIT ? (
            <Button
              aria-describedby={listId}
              className={multyStyles.addButton}
              onClick={openListPopover}
            >
              <span>{showText}</span>
              <CommonIcon IconComponent={ArrowDropDown} />
            </Button>
          ) : null}

          <Button
            aria-describedby={formId}
            className={multyStyles.addButton}
            onClick={handleFormOpen}
          >
            <span>Add new job</span>
            <CommonIcon IconComponent={Add} />
          </Button>
        </div>

        <ContactJobForm
          data={formData}
          anchorForm={anchorForm}
          onChange={handleChange}
          onClose={closeForm}
        />

        <Popover
          id={listId}
          open={openList}
          className={style.modal}
          anchorEl={anchorList}
          onClose={closeList}
          anchorOrigin={ANCHOR_ORIGIN}
          transformOrigin={TRANSFORM_ORIGIN}
        >
          <div className={style.modalContent}>
            {vacancies.length > ARRAY_LIMIT ? jobList('last') : null}
          </div>
        </Popover>
      </FormControl>
      {errorMessage && <Box className={inputStyles.error}>{errorMessage}</Box>}
    </div>
  );
};
