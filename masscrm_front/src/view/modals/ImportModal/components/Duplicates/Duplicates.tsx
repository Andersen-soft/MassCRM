import React, { FC, useMemo, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip
} from '@material-ui/core';
import { FieldLabel } from 'src/view/atoms';
import { getSelectedDuplicationAction } from 'src/store/slices';
import { TOP_END } from 'src/constants';
import { useStyles } from './Duplicates.styles';
import {
  DUPLICATES_SKIPPED,
  EXISTING_DATA_REPLACED,
  ONLY_EMPTY_FIELDS_FILLED
} from './constants';

interface IProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Duplicates: FC<IProps> = props => {
  const styles = useStyles(props);

  const { onChange } = props;

  const selectedDuplicationAction = useSelector(getSelectedDuplicationAction);

  const tooltipClasses = useMemo(
    () => ({
      tooltip: styles.tooltip
    }),
    [styles.radioBtn]
  );

  const RadioBtn = useMemo(
    () => (
      <Radio color='default' size='small' classes={{ root: styles.radioBtn }} />
    ),
    [styles.radioBtn]
  );

  return (
    <div className={styles.root}>
      <FieldLabel label='Duplicate actions:' labelClassName={styles.labelText}>
        <RadioGroup
          aria-label='gender'
          name='duplicationAction'
          row
          onChange={onChange}
          value={selectedDuplicationAction}
        >
          <Tooltip
            classes={tooltipClasses}
            title={EXISTING_DATA_REPLACED}
            placement={TOP_END}
          >
            <FormControlLabel
              value='replace'
              label='Replace'
              control={RadioBtn}
              labelPlacement='start'
            />
          </Tooltip>
          <Tooltip
            classes={tooltipClasses}
            title={ONLY_EMPTY_FIELDS_FILLED}
            placement={TOP_END}
          >
            <FormControlLabel
              value='merge'
              label='Merge'
              control={RadioBtn}
              labelPlacement='start'
            />
          </Tooltip>
          <Tooltip
            classes={tooltipClasses}
            title={DUPLICATES_SKIPPED}
            placement={TOP_END}
          >
            <FormControlLabel
              value='skip'
              label='Skip'
              control={RadioBtn}
              labelPlacement='start'
            />
          </Tooltip>
        </RadioGroup>
      </FieldLabel>
    </div>
  );
};
