import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent
} from 'react';
import { connect, FormikProps } from 'formik';
import {
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
  InputLabel,
  Box,
  Popover,
  Popper
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Close } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { multiInputStyles, commonInputStyles } from 'src/styles';
import {
  BOTTOM,
  getPositionConfig,
  KEY_ENTER,
  RIGHT,
  TOP
} from 'src/constants';
import { Rows, Form } from './components';
import { ICustomMultiValues } from './interfaces';

export interface IProps {
  items: string[];
  value?: string;
  id: string;
  name: string;
  placeholder?: string;
  keys?: string[];
  required?: boolean;
  errorMessage?: string;
  errorRequired?: string;
  width?: string;
  disabled?: boolean;
  hideClearBtn?: boolean;
  onChange: (fieldName: string, value: string[] | string) => void;
  formik?: FormikProps<string[] | string | boolean | undefined>;
  clear?: boolean;
  resetClearInputState?: () => void;
  validationSchema?: Function;
}

export const CustomMultiInput = connect<IProps>(
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
    const commonInputClasses = commonInputStyles();
    const multiInputClasses = multiInputStyles();

    const [isTipOpen, setTipOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [anchorList, setAnchorList] = useState<null | HTMLElement>(null);
    const [formData, setFormData] = useState<ICustomMultiValues | null>(null);
    const [anchorForm, setAnchorForm] = useState<null | {
      el: HTMLElement | SVGElement;
      index: number;
    }>(null);
    const [showError, setShowError] = useState<boolean>(true);
    const [duplicatedMess, setDuplicatedMess] = useState<string>();

    const parentElement = useRef(null);

    const openList = !!anchorList;

    const listId = openList ? 'list-popover' : undefined;

    useEffect(() => {
      if (clear) {
        setInputValue('');
        resetClearInputState && resetClearInputState();
      }
    }, [clear]);

    const classControl = useMemo(
      () => ({
        root: `${commonInputClasses.input} ${showError &&
          (errorMessage || duplicatedMess) &&
          commonInputClasses.inputError} ${required &&
          commonInputClasses.inputRequire}`
      }),
      [showError, errorMessage, duplicatedMess]
    );
    const classLabel = useMemo(
      () => ({
        outlined: multiInputClasses.InputLabelOutlined,
        shrink: multiInputClasses.InputLabelShrink
      }),
      []
    );

    const onChangeHandler = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInputValue(event.target.value);
        formik.handleChange(event);
        setShowError(false);
        setTipOpen(true);
      },
      [items, setInputValue, setShowError, setTipOpen, formik]
    );

    const onKeyHandler = useCallback(
      (_: string, value: string) => {
        if (KEY_ENTER.keyName && !errorMessage && value) {
          setTipOpen(false);

          if (items.includes(value)) {
            setDuplicatedMess('Already exist');
            setShowError(true);
          } else if (_ === KEY_ENTER.keyName) {
            onChange(name, [...items, value]);
            setInputValue('');
            setShowError(false);
            setDuplicatedMess('');
          }
        }
        if ((KEY_ENTER.keyName && errorMessage) || duplicatedMess) {
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

    const handleOpenTip = () => setTipOpen(prev => !prev);

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
          items.filter((_, itemIndex) => itemIndex !== index)
        );
      },
      [items]
    );

    const editData = useMemo(
      () =>
        anchorForm && (
          <Form
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
      }: KeyboardEvent & ChangeEvent<HTMLInputElement>) =>
        onKeyHandler(key, value),
      [onKeyHandler]
    );

    useEffect(() => {
      !inputValue && setDuplicatedMess('');
    }, [inputValue]);

    return (
      <div className={multiInputClasses.wrap}>
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
            onMouseEnter={handleOpenTip}
            onMouseLeave={handleOpenTip}
            placeholder={placeholder}
            type='text'
            error={
              !!((showError && errorMessage) || duplicatedMess || errorRequired)
            }
            endAdornment={
              <InputAdornment position='end'>
                <div className={multiInputClasses.multiCount}>
                  {items?.length}
                </div>
                <IconButton
                  aria-label=''
                  onClick={handleOpenList}
                  edge='end'
                  className={multiInputClasses.IconDropdown}
                >
                  <CommonIcon
                    IconComponent={anchorList ? ArrowDropUp : ArrowDropDown}
                  />
                </IconButton>
                <IconButton
                  aria-label=''
                  onClick={clearField}
                  edge='end'
                  className={multiInputClasses.IconClose}
                >
                  <Close fontSize='small' />
                </IconButton>
              </InputAdornment>
            }
          />
          <Popper
            className={multiInputClasses.popper}
            open={isTipOpen}
            anchorEl={parentElement.current}
          >
            <div className={multiInputClasses.tipContent}>
              <span>To add {placeholder} click “Enter”</span>
            </div>
          </Popper>
          <Popover
            id={listId}
            open={openList}
            className={multiInputClasses.modal}
            anchorEl={anchorList}
            onClose={closeList}
            anchorOrigin={getPositionConfig(BOTTOM, RIGHT)}
            transformOrigin={getPositionConfig(TOP, RIGHT)}
          >
            <div className={multiInputClasses.modalContent}>
              <Rows
                items={items}
                onEditHandler={editItem}
                onRemoveHandler={removeItem}
              />
            </div>
          </Popover>
          {editData}
        </FormControl>
        {((showError && errorMessage) || duplicatedMess || errorRequired) && (
          <Box className={commonInputClasses.error}>
            {errorMessage || errorRequired || duplicatedMess}
          </Box>
        )}
      </div>
    );
  }
);
