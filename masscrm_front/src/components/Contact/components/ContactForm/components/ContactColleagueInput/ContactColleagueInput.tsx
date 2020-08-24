import React, { FC, useCallback, useMemo, useState, useRef } from 'react';
import filter from 'lodash.filter';
import {
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  Box,
  Popover,
  PopoverOrigin,
  Button
} from '@material-ui/core';
import { Add, ArrowDropDown, ArrowDropUp, Close } from '@material-ui/icons';
import { CommonIcon } from 'src/components/common/CommonIcon';
import {
  IColleagueFormState,
  IContactColleagueInput,
  IContactColleagueValues
} from 'src/interfaces/IContactColleague';
import { inputStyle } from 'src/styles/CommonInput.style';
import { multiStyle } from 'src/styles/CustomMultiInput.style';
import { ContactColleagueForm } from '../ContactColleagueForm/ContactColleagueForm';
import { ContactColleagueList } from './ContactColleagueList';

const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'right'
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right'
};

export const ContactColleagueInput: FC<IContactColleagueInput> = ({
  items,
  errorMessage,
  onChange
}) => {
  const inputStyles = inputStyle();
  const styles = multiStyle();

  const [anchorList, setAnchorList] = useState<null | HTMLElement>(null);
  const [formData, setFormData] = useState<IContactColleagueValues | null>(
    null
  );
  const [anchorForm, setAnchorForm] = useState<null | {
    el: HTMLElement | SVGElement;
    index: number;
  }>(null);
  const parentElement = useRef(null);
  const openList = Boolean(anchorList);
  const listId = openList ? 'list-popover' : undefined;

  const classControl = useMemo(
    () => ({
      root: `${inputStyles.input} ${errorMessage && inputStyles.inputError}`
    }),
    [errorMessage]
  );
  const classLabel = useMemo(
    () => ({
      outlined: styles.InputLabelOutlined,
      shrink: styles.InputLabelShrink
    }),
    []
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

  const clearField = useCallback(() => {
    onChange('emails', []);
  }, [items]);
  const handleOpenList = useCallback(() => {
    setAnchorList(parentElement.current);
  }, [anchorList]);
  const closeList = useCallback(() => {
    setAnchorList(null);
  }, [anchorList]);
  const handleChange = useCallback(
    (data: IColleagueFormState, index: number) => {
      const newData = [...items];
      if (index === -1) {
        newData.push(data);
      }

      if (index >= 0) {
        newData[index] = data;
      }

      onChange('colleagues', newData);
    },
    [items]
  );
  const closeForm = useCallback(() => {
    setAnchorForm(null);
    setFormData(null);
  }, [formData, anchorForm]);
  const editItem = useCallback(
    (index: number, target: HTMLElement | SVGElement) => {
      setFormData({ full_name: items[index].full_name, index });
      setAnchorForm({ el: target, index });
    },
    [anchorForm, formData]
  );
  const removeItem = useCallback(
    (index: number) => {
      onChange(
        'colleagues',
        filter(items, (val, itemIndex) => itemIndex !== index)
      );
    },
    [items]
  );

  return (
    <div className={styles.wrap}>
      <FormControl variant='outlined' classes={classControl}>
        <InputLabel id='Colleague' classes={classLabel}>
          Colleague
        </InputLabel>
        <OutlinedInput
          aria-describedby='component-error-text'
          ref={parentElement}
          placeholder='Colleague'
          type='text'
          endAdornment={
            <InputAdornment position='end'>
              <div className={styles.multiCount}>{items.length}</div>
              <IconButton
                aria-label=''
                onClick={handleOpenList}
                edge='end'
                className={styles.IconDropdown}
              >
                <CommonIcon
                  IconComponent={anchorList ? ArrowDropUp : ArrowDropDown}
                />
              </IconButton>
              <IconButton
                aria-label=''
                onClick={clearField}
                edge='end'
                className={styles.IconClose}
              >
                <Close fontSize='small' />
              </IconButton>
            </InputAdornment>
          }
        />

        <Popover
          id={listId}
          open={openList}
          className={styles.modal}
          anchorEl={anchorList}
          onClose={closeList}
          anchorOrigin={ANCHOR_ORIGIN}
          transformOrigin={TRANSFORM_ORIGIN}
        >
          <div className={styles.modalHeader}>
            <Button className={styles.addButton} onClick={handleFormOpen}>
              <span>Add colleague</span>
              <CommonIcon IconComponent={Add} />
            </Button>
          </div>
          <div className={styles.modalContent}>
            <ContactColleagueList
              items={items}
              onEditHandler={editItem}
              onRemoveHandler={removeItem}
            />
          </div>
        </Popover>
        <ContactColleagueForm
          anchorForm={anchorForm}
          data={formData}
          onChange={handleChange}
          onClose={closeForm}
        />
      </FormControl>
      {errorMessage && <Box className={inputStyles.error}>{errorMessage}</Box>}
    </div>
  );
};
