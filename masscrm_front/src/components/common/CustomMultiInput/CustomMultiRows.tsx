import React, { FC, useCallback } from 'react';
import { ICustomMultiRows } from 'src/interfaces/ICustomMultiInput';
import { Close, Edit } from '@material-ui/icons';
import { CommonIcon } from 'src/components/common/CommonIcon';
import { multiStyle } from 'src/styles/CustomMultiInput.style';

export const CustomMultiRows: FC<ICustomMultiRows> = ({
  items,
  placeholder,
  onEditHandler,
  onRemoveHandler
}) => {
  const styles = multiStyle();

  const removeHandler = (index: number) => () => {
    onRemoveHandler(index);
  };
  const editHandler = (index: number) => (event: React.MouseEvent) => {
    onEditHandler(index, event.currentTarget);
  };

  const renderItems = useCallback(() => {
    return items.map((item, index) => {
      const linkURI = placeholder === 'Email' ? `mailto:${item}` : '';

      return (
        <li className={styles.listEl} key={item}>
          <span>
            <a href={linkURI} className={styles.listLink}>
              {item}
            </a>
          </span>
          <span className={styles.lastInList}>
            <CommonIcon
              IconComponent={Close}
              className={styles.IconFormControl}
              onClick={removeHandler(index)}
            />
          </span>
          <span>
            <CommonIcon
              IconComponent={Edit}
              className={styles.IconFormControl}
              onClick={editHandler(index)}
            />
          </span>
        </li>
      );
    });
  }, [items]);

  return <ul className={styles.list}>{renderItems()}</ul>;
};
