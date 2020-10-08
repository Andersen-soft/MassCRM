import React, { FC, useState, MouseEvent, useMemo } from 'react';
import { Popover } from '@material-ui/core';
import { SingleInputForm } from 'src/components/common/SingleInputForm';
import { Done } from '@material-ui/icons';
import { ITableCellText } from './interfaces';
import { CommonIcon } from '../../../CommonIcon';
import { SocialIcon } from '../../../SocialIcon';

export const TableCellText: FC<ITableCellText> = ({
  value,
  className,
  link,
  required,
  onSubmitChanges,
  type,
  switchValue,
  href,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDoubleClickHandler = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onChangeValue = () => false;

  const inputProps = {
    value,
    onChangeValue,
    required
  };

  const switchTD = useMemo(
    () =>
      switchValue ? (
        <CommonIcon IconComponent={Done} style={{ color: '#46C662' }} />
      ) : (
        <></>
      ),
    [switchValue, type]
  );

  const td = useMemo(() => {
    switch (true) {
      case type === 'link':
        return (
          <a href={href || value} rel='noreferrer' target='_blank'>
            {link}
          </a>
        );
      case type === 'switch':
        return switchTD;
      case type === 'linkedin':
        return <SocialIcon socialName='linkedin' link={link || value} />;
      case type === 'skype':
        return <SocialIcon socialName='skype' link={link || value} />;
      default:
        return <div>{value}</div>;
    }
  }, [link, value, type]);

  return (
    <>
      <td className={className} onDoubleClick={onDoubleClickHandler}>
        {td}
      </td>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <SingleInputForm
          {...props}
          onSubmit={onSubmitChanges}
          inputProps={inputProps}
          onCancel={handleClose}
          type={type}
          switchValue={switchValue}
        />
      </Popover>
    </>
  );
};
