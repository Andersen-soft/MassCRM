import React, { FC } from 'react';
import { Check, Close, Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonIcon, CommonInput } from 'src/components/common';
import { getAddContactList, updateContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { FieldArray, Formik, Form } from 'formik';
import { IContactCell, IContactEdit } from './interfaces';
import style from './ContactCell.scss';

const sn = styleNames(style);

interface IContactForm {
  items: Array<string>;
}

export const ContactEdit: FC<IContactCell & IContactEdit> = ({
  id,
  value = [],
  handleClose,
  type
}) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);

  const onSubmit = async ({ items }: IContactForm) => {
    await updateContact({ [type]: items.filter(item => !!item) }, id);
    dispatch(getAddContactList(filter));
  };

  return (
    <div className={sn('list-td_wrap')}>
      <Formik initialValues={{ items: value }} onSubmit={onSubmit}>
        {({ values, handleSubmit, handleChange, errors }) => (
          <Form>
            <FieldArray
              name='items'
              render={arrayHelpers => (
                <>
                  {values.items.map((item, index) => (
                    <div className={sn('list-td_input')} key={`items.${item}`}>
                      <CommonInput
                        name={`items.${index}`}
                        value={item}
                        errorMessage={errors.items && errors.items[index]}
                        onChangeValue={handleChange}
                      />
                    </div>
                  ))}
                  <div className={sn('list-td_btns')}>
                    <CommonIcon
                      onClick={() => arrayHelpers.push('')}
                      IconComponent={Add}
                      fontSize='large'
                      className={sn('icon')}
                    />
                    <div className={sn('list-td_btns-form')}>
                      <CommonIcon
                        onClick={() => handleSubmit()}
                        IconComponent={Check}
                        fontSize='large'
                        className={sn('icon')}
                      />
                      <CommonIcon
                        IconComponent={Close}
                        onClick={handleClose}
                        fontSize='large'
                        className={sn('icon')}
                      />
                    </div>
                  </div>
                </>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
