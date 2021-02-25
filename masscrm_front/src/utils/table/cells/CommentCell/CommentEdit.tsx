import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Check, Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTextarea, CommonIcon } from 'src/components/common';
import { getAddContactList, updateContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { DoubleClickError } from '../../../errors';
import { ICommentCell, ICommentEdit } from './interfaces';
import style from '../cell.scss';
import { ErrorEmitterContext } from '../../../../context';

const sn = styleNames(style);

export const CommentEdit: FC<ICommentCell & ICommentEdit> = ({
  id,
  value = '',
  handleClose
}) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);
  const [val, setVal] = useState<string>(value);
  const onSubmitHandler = () =>
    updateContact({ comment: val }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errors => {
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: [DoubleClickError(errors)]
        });
      });

  const onChangeHandler = ({
    target: { value: newVal }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setVal(newVal);
  };

  return (
    <div className={sn('comment-edit')}>
      <CustomTextarea
        className={sn('comment-edit_text')}
        value={val || ''}
        onChange={onChangeHandler}
      />
      <div className={sn('comment-edit_btn')}>
        <CommonIcon
          onClick={onSubmitHandler}
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
  );
};
