import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';

interface ICommonShowMoreButtonProps {
  show: string;
  color?: string;
  fontSize?: string;
  toggleVisibility?: () => void;
}

export const CommonShowMoreButton: FC<ICommonShowMoreButtonProps> = props => {
  const { show, color, fontSize, toggleVisibility } = props;
  const useStyles = makeStyles({
    root: {
      color,
      display: 'inline-block',
      fontSize
    },
    spanElement: {
      marginRight: '12px'
    }
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.spanElement}>{show}</span>
      <IconButton aria-label='show' size='small'>
        <ArrowDropDownIcon fontSize='inherit' onClick={toggleVisibility} />
      </IconButton>
    </div>
  );
};
