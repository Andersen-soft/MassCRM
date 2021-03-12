import { MenuItem, Select } from '@material-ui/core';
import React, { FC } from 'react';
import { IShowCountItem } from 'src/interfaces';
import { useStyles } from './ShowCountSelect.styles';

interface IShowCountSelect {
  countConfig: { title: string; value: number }[];
  showCount?: number;
  handleChangeShowCount: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}
export const ShowCountSelect: FC<IShowCountSelect> = ({
  countConfig,
  showCount,
  handleChangeShowCount
}) => {
  const classes = useStyles();

  return (
    <Select
      className={classes.countSelect}
      variant='outlined'
      value={showCount}
      onChange={handleChangeShowCount}
    >
      {countConfig.map(({ title, value }: IShowCountItem) => (
        <MenuItem key={value} value={value}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ShowCountSelect;
