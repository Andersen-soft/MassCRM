import React, { FC, useContext, useState } from 'react';
import { Formik } from 'formik';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { addCitySchema } from 'src/utils/form/validationAddCity';
import { addNewCity } from 'src/actions';
import { ICity } from 'src/interfaces';
import { ErrorEmitterContext } from 'src/context';
import { CommonIcon } from '../CommonIcon';
import { addCityStyle } from './CityModal.style';
import { TOpen } from '../Table/interfaces';
import { CityFormUI } from './components';
import { IFormItem, IAddCityFomValues } from './interfaces';

const INITIAL_VALUES: IAddCityFomValues = {
  location: [
    {
      city: '',
      region: '',
      country: '',
      countryCode: '',
      countryId: '',
      regionCode: '',
      regionId: ''
    }
  ]
};

export const CityModal: FC<{
  handleClose: () => void;
  open: TOpen;
  autoFocus?: string;
  onSubmitSuccess?: Function;
}> = ({ handleClose, open }) => {
  const style = addCityStyle();
  const [cities, setCities] = useState<ICity[]>([]);
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);

  const handleSubmit = async (formValue: IAddCityFomValues) => {
    const locationArray = formValue.location.map(
      ({ city, regionId, countryId }) => ({
        city,
        region: Number(regionId),
        country: Number(countryId)
      })
    );
    await addNewCity(locationArray, errorsEventEmitter);
    handleClose();
  };

  const onDelete = (
    val: IFormItem[],
    idItem: number,
    setVal: Function
  ) => () => {
    const withoutDeleteItem = val.filter((item, index) => index !== idItem);
    return setVal('location', withoutDeleteItem);
  };

  const setFieldValues = (index: number, changeItemFunction: Function) => (
    value: IFormItem
  ) => {
    setCities(state =>
      value.cities ? [...new Set([...state, ...value.cities])] : [...state]
    );
    return changeItemFunction(index, { ...value });
  };

  return (
    <Dialog
      className={style.dialog}
      onClose={handleClose}
      maxWidth='lg'
      open={Boolean(open)}
    >
      <CommonIcon
        className={style.closeIcon}
        IconComponent={CloseRoundedIcon}
        onClick={handleClose}
      />
      <DialogTitle>
        <span>Add City</span>
      </DialogTitle>
      <DialogContent className={style.contentWrapper}>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={addCitySchema(cities)}
          onSubmit={handleSubmit}
          validateOnChange
        >
          {({ values, setFieldValue, errors, touched, ...formikProps }) => {
            return (
              <CityFormUI
                formik={{
                  errors,
                  touched,
                  setFieldValue,
                  ...formikProps
                }}
                initialValues={INITIAL_VALUES}
                onDelete={onDelete}
                setFieldValues={setFieldValues}
                handleClose={handleClose}
              />
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
