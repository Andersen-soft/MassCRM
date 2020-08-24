import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip
} from '@material-ui/core';
import { FieldLabel } from 'src/components/common/FieldLabel';
import { IStoreState } from 'src/interfaces';
import { useStyles } from './Duplicates.styles';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Duplicates: React.FC<Props> = props => {
  const classes = useStyles(props);
  const { onChange } = props;

  const selectedDuplicationAction = useSelector(
    (state: IStoreState) => state.import.formState.duplicationAction
  );

  const tooltipClasses = React.useMemo(
    () => ({
      tooltip: classes.tooltip
    }),
    [classes.radioBtn]
  );

  const RadioBtn = React.useMemo(
    () => (
      <Radio
        color='default'
        size='small'
        classes={{ root: classes.radioBtn }}
      />
    ),
    [classes.radioBtn]
  );

  return (
    <div className={classes.root}>
      <FieldLabel label='Duplicate actions:' labelClassName={classes.labelText}>
        <RadioGroup
          aria-label='gender'
          name='duplicationAction'
          row
          onChange={onChange}
          value={selectedDuplicationAction}
        >
          <Tooltip
            classes={tooltipClasses}
            title='Existing data are replaced by the data from the file.'
            placement='top-end'
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
            title='Only empty fields in the system are filled in with data from the file.'
            placement='top-end'
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
            title='Duplicates are skipped. At the end of the import, the file with the missing data is available.'
            placement='top-end'
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
