import React, { FC } from 'react';

export const PopUp: FC<{ component: FC }> = ({ component }) => {
  return <div>{component}</div>;
};
