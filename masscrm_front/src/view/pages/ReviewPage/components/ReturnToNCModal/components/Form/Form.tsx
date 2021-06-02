import React, { useState } from 'react';
import { Close, Delete, Add } from '@material-ui/icons';
import { CommonButton, CommonIcon, CustomTextarea } from 'src/view/atoms';
import { Button } from '@material-ui/core';
import { multiInputStyles } from 'src/styles';
import { ColumnTypeInput } from './components';
import { useStyles } from './Form.styles';

interface IProps {
  [key: string]: string;
  column: string;
  comment: string;
}

export const Form = () => {
  const styles = useStyles();
  const multiInputClasses = multiInputStyles();

  const [inputsList, setInputsList] = useState<IProps[]>([
    { column: '', comment: '' }
  ]);

  const handleAddInput = () => {
    setInputsList([...inputsList, { column: '', comment: '' }]);
  };

  const hadleRemoveInput = (index: number) => () => {
    const list = [...inputsList];
    list.splice(index, 1);
    setInputsList(list);
  };

  return (
    <form className={styles.form}>
      <div className={styles.formBlocks}>
        {inputsList.map(({ column, comment }, index: number) => (
          <div className={styles.formBlock} key={index}>
            <div className={styles.inputColumn}>
              {/* TODO replace by real methods on the stage of implementing functionality */}
              <ColumnTypeInput value={column} onChange={() => {}} />
            </div>
            <div className={styles.commentWrapper}>
              <CustomTextarea
                name='comment'
                className={styles.commentField}
                width='400px'
                placeholder='Comment'
                value={comment}
                // TODO replace by real methods on the stage of implementing functionality
                onChange={() => {}}
              />
            </div>
            <div className={styles.formControls}>
              <CommonIcon
                IconComponent={Close}
                className={styles.formControl}
                // TODO replace by real methods on the stage of implementing functionality
                onClick={() => {}}
              />
              <CommonIcon
                IconComponent={Delete}
                className={styles.formControl}
                onClick={hadleRemoveInput(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <Button className={multiInputClasses.addButton} onClick={handleAddInput}>
        <span>Add more</span>
        <CommonIcon IconComponent={Add} />
      </Button>
      <div className={styles.formButtons}>
        {/* TODO replace by real methods on the stage of implementing functionality */}
        <CommonButton text='Cancel' type='reset' onClickHandler={() => {}} />
        {/* TODO replace by real methods on the stage of implementing functionality */}
        <CommonButton text='Return' color='yellow' onClickHandler={() => {}} />
      </div>
    </form>
  );
};

export default Form;
