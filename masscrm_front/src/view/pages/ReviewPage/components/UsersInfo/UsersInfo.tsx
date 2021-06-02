import React, { FC } from 'react';
import { IMock } from 'src/view/pages';
import { DetailsBox } from './components';
import { IFieldsConfigItem } from './interfaces';
import { useStyles } from './UserInfo.styles';

interface IProps {
  usersInfo: IMock[];
}

export const UsersInfo: FC<IProps> = ({ usersInfo }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      {usersInfo.map(item => {
        const fieldsConfig: IFieldsConfigItem[] = Object.keys(item).map(
          key => ({
            title: key,
            descr: item[key]
          })
        );
        // TODO for key put 'id' when backend will be implemented
        return <DetailsBox fieldsConfig={fieldsConfig} />;
      })}
    </div>
  );
};

export default UsersInfo;
