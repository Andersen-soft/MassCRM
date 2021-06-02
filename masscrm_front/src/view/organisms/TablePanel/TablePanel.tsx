import React, { ChangeEvent, FC, memo } from 'react';
import { PermIdentity } from '@material-ui/icons';
import { ShowCountSelect } from 'src/view/atoms';
import { LabelIconGroup } from 'src/view/molecules';
import { IShowCountItem } from 'src/interfaces';
import { useStyles } from './TablePanel.styles';

interface IProps {
  countConfig: IShowCountItem[];
  handleChangeShowCount: (event: ChangeEvent<{ value: unknown }>) => void;
  title?: string;
  total: number;
  show: number;
  Search?: FC;
}

const Panel: FC<IProps> = ({
  title,
  total,
  show,
  Search,
  countConfig,
  handleChangeShowCount
}) => {
  const styles = useStyles();

  return (
    <div className={styles.panel}>
      <div className={styles.panelItem}>
        <div className={styles.panelTitle}>{title}</div>
        {Search && <Search />}
      </div>
      <div className={styles.panelItem}>
        <ShowCountSelect
          handleChangeShowCount={handleChangeShowCount}
          showCount={show}
          countConfig={countConfig}
        />
        <LabelIconGroup
          label='Total'
          count={total}
          icon={PermIdentity}
          isActive
        />
        <LabelIconGroup
          label='Show'
          count={show}
          icon={PermIdentity}
          isActive
          className={styles.panelLabel}
        />
      </div>
    </div>
  );
};

export const TablePanel = memo(Panel);
