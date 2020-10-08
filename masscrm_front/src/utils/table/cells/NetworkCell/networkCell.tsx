import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { SocialIcon } from 'src/components/common/SocialIcon';
import { EditPopup } from '..';
import { NetworkEdit } from '.';
import { INetworkCell } from './interfaces/INetworkCell';

export const networkCell = ({ value, id }: INetworkCell) => (
  tdProps: PropsWithChildren<TableCellBaseProps>
) => {
  const contentTD = () => (
    <div>
      {value?.map(({ link, id: idSN }) => {
        const network = link?.split('/')[2]?.split('.');
        return (
          <SocialIcon
            socialName={network && network[0]}
            link={link}
            key={idSN}
          />
        );
      })}
    </div>
  );

  return (
    <EditPopup
      tdProps={tdProps}
      editProps={{ value, id }}
      ContentTD={contentTD}
      ContentEdit={NetworkEdit}
    />
  );
};
