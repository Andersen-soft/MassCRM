import React, { PropsWithChildren } from 'react';
import { TableCellBaseProps } from '@material-ui/core';
import { EditPopup, SocialIcon } from 'src/view/atoms';
import { INetworkCell } from 'src/interfaces';
import { Edit } from './components';

export const networkCell = ({ value, id, doubleClickEdit }: INetworkCell) => (
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
      ContentEdit={Edit}
      doubleClickEdit={doubleClickEdit}
    />
  );
};
