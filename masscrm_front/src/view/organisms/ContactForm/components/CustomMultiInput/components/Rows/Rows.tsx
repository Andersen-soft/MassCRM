import React, { FC, useCallback, MouseEvent } from 'react';
import { Close, Edit } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { multiInputStyles } from 'src/styles';

interface IProps {
  items: string[];
  placeholder?: string;
  onEditHandler: (index: number, event: EventTarget) => void;
  onRemoveHandler: (index: number) => void;
}

export const Rows: FC<IProps> = ({
  items,
  placeholder,
  onEditHandler,
  onRemoveHandler
}) => {
  const multiInputClasses = multiInputStyles();

  const removeHandler = (index: number) => () => {
    onRemoveHandler(index);
  };

  const editHandler = (index: number) => ({ currentTarget }: MouseEvent) => {
    onEditHandler(index, currentTarget);
  };

  const renderItems = useCallback(() => {
    return items.map((item, index) => {
      const linkURI = placeholder === 'Email' ? `mailto:${item}` : '';

      return (
        <li className={multiInputClasses.listEl} key={item}>
          <span>
            <a href={linkURI} className={multiInputClasses.listLink}>
              {item}
            </a>
          </span>
          <span className={multiInputClasses.lastInList}>
            <CommonIcon
              IconComponent={Close}
              className={multiInputClasses.IconFormControl}
              onClick={removeHandler(index)}
            />
          </span>
          <span>
            <CommonIcon
              IconComponent={Edit}
              className={multiInputClasses.IconFormControl}
              onClick={editHandler(index)}
            />
          </span>
        </li>
      );
    });
  }, [items]);

  return <ul className={multiInputClasses.list}>{renderItems()}</ul>;
};
