import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect
} from 'react';
import { connect } from 'formik';
import filter from 'lodash.filter';
import {
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  Box,
  Popover,
  Popper,
  PopoverOrigin
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Close } from '@material-ui/icons';
import { CommonIcon, CustomMultiForm } from 'src/components/common';
import {
  ICustomMultiInput,
  ICustomMultiValues
} from 'src/interfaces/ICustomMultiInput';
import { inputStyle } from 'src/styles/CommonInput.style';
import { multiStyle } from 'src/styles/CustomMultiInput.style';
import { CustomMultiRows } from './CustomMultiRows';

const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'right'
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right'
};

export const CustomMultiInput = connect<ICustomMultiInput>(
  ({
    id,
    name,
    items,
    placeholder,
    errorMessage,
    errorRequired,
    required,
    onChange,
    formik,
    clear,
    resetClearInputState,
    validationSchema
  }) => {
    const inputStyles = inputStyle();
    const styles = multiStyle();

    const [isTipOpen, setTipOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [anchorList, setAnchorList] = useState<null | HTMLElement>(null);
    const [formData, setFormData] = useState<ICustomMultiValues | null>(null);
    const [anchorForm, setAnchorForm] = useState<null | {
      el: HTMLElement | SVGElement;
      index: number;
    }>(null);
    const parentElement = useRef(null);
    const openList = Boolean(anchorList);
    const listId = openList ? 'list-popover' : undefined;
    const [showError, setShowError] = useState<boolean>(true);
    const [duplicatedMess, setDuplicatedMess] = useState<string>();

    useEffect(() => {
      if (clear) {
        setInputValue('');
        resetClearInputState && resetClearInputState();
      }
    }, [clear]);

    const classControl = useMemo(
      () => ({
        root: `${inputStyles.input} ${showError &&
          (errorMessage || duplicatedMess) &&
          inputStyles.inputError} ${required && inputStyles.inputRequire}`
      }),
      [showError, errorMessage, duplicatedMess]
    );
    const classLabel = useMemo(
      () => ({
        outlined: styles.InputLabelOutlined,
        shrink: styles.InputLabelShrink
      }),
      []
    );

    const onChangeHandler = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInputValue(event.target.value);
        formik.handleChange(event);
        setShowError(false);
        setTipOpen(true);
      },
      [items, setInputValue, setShowError, setTipOpen, formik]
    );

    const onKeyHandler = useCallback(
      (key: string, value: string) => {
        if (key === 'Enter' && !errorMessage && value) {
          if (items.includes(value)) {
            setDuplicatedMess('Already exist');
            setShowError(true);
          } else {
            onChange(name, [...items, value]);
            setInputValue('');
            setShowError(false);
            setDuplicatedMess('');
          }
        }
        if ((key === 'Enter' && errorMessage) || duplicatedMess) {
          setShowError(true);
        }
      },
      [items, errorMessage, duplicatedMess]
    );
    const clearField = useCallback(() => {
      onChange(name, []);
      onChange(id, '');
      setInputValue('');
      setShowError(true);
    }, [items]);

    const handleOpenList = useCallback(() => {
      setAnchorList(parentElement.current);
      setTipOpen(false);
    }, [anchorList]);
    const openTip = useCallback(() => {
      setTipOpen(true);
    }, [isTipOpen]);
    const closeTip = useCallback(() => {
      setTipOpen(false);
    }, [isTipOpen]);
    const closeList = useCallback(() => {
      setAnchorList(null);
    }, [anchorList]);

    const handleChange = useCallback(
      (data: ICustomMultiValues, index: number) => {
        const newData = [...items];
        newData[index] = data.formMulti;
        onChange(name, newData);
      },
      [items, onChange]
    );

    const closeForm = useCallback(() => {
      setAnchorForm(null);
      setFormData(null);
    }, [formData, anchorForm]);

    const editItem = useCallback(
      (index, target) => {
        setFormData({ formMulti: items[index], index });
        setAnchorForm({ el: target, index });
      },
      [items, formData, setFormData, setAnchorForm]
    );

    const removeItem = useCallback(
      (index: number) => {
        onChange(
          name,
          filter(items, (val, itemIndex) => itemIndex !== index)
        );
      },
      [items]
    );

    const editData = useMemo(
      () =>
        anchorForm && (
          <CustomMultiForm
            anchorForm={anchorForm}
            data={formData}
            onChange={handleChange}
            onClose={closeForm}
            placeholder={placeholder}
            validationSchema={validationSchema}
          />
        ),
      [anchorForm, formData]
    );

    const addNewItem = useCallback(
      ({
        key,
        target: { value }
      }: React.KeyboardEvent & React.ChangeEvent<HTMLInputElement>) =>
        onKeyHandler(key, value),
      [onKeyHandler]
    );

    useEffect(() => {
      !inputValue && setDuplicatedMess('');
    }, [inputValue]);

    return (
      <div className={styles.wrap}>
        <FormControl variant='outlined' classes={classControl}>
          <InputLabel htmlFor={id} classes={classLabel}>
            {placeholder}
          </InputLabel>
          <OutlinedInput
            aria-describedby='component-error-text'
            ref={parentElement}
            inputProps={{ id }}
            value={inputValue}
            onChange={onChangeHandler}
            onKeyPress={addNewItem}
            onMouseEnter={openTip}
            onMouseLeave={closeTip}
            placeholder={placeholder}
            type='text'
            error={Boolean(
              (showError && errorMessage) || duplicatedMess || errorRequired
            )}
            endAdornment={
              <InputAdornment position='end'>
                <div className={styles.multiCount}>{items?.length}</div>
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
          <Popper
            className={styles.popper}
            open={isTipOpen}
            anchorEl={parentElement.current}
          >
            <div className={styles.tipContent}>
              <span>To add {placeholder} click “Enter”</span>
            </div>
          </Popper>
          <Popover
            id={listId}
            open={openList}
            className={styles.modal}
            anchorEl={anchorList}
            onClose={closeList}
            anchorOrigin={ANCHOR_ORIGIN}
            transformOrigin={TRANSFORM_ORIGIN}
          >
            <div className={styles.modalContent}>
              <CustomMultiRows
                items={items}
                onEditHandler={editItem}
                onRemoveHandler={removeItem}
              />
            </div>
          </Popover>
          {editData}
        </FormControl>
        {((showError && errorMessage) || duplicatedMess || errorRequired) && (
          <Box className={inputStyles.error}>
            {errorMessage || errorRequired || duplicatedMess}
          </Box>
        )}
      </div>
    );
  }
);
