import React, { FC, useState, MouseEvent, useMemo, useCallback } from 'react';
import { Popover } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { SocialIcon, CommonIcon } from 'src/view/atoms';
import { SingleInputForm } from 'src/view/organisms';
import {
  CENTER,
  getPositionConfig,
  TOP,
  BOTTOM,
  NO_REFERRER,
  BLANK
} from 'src/constants';

interface IProps {
  className?: string;
  value: string;
  switchValue?: boolean;
  onSubmitChanges: (value?: string | boolean) => void;
  required?: boolean;
  link?: string;
  validation?: (val: string) => boolean;
  type?: 'link' | 'text' | 'switch' | 'linkedin' | 'skype';
  isDate?: boolean;
  href?: string;
  doubleClickEdit?: boolean;
}

export const Edit: FC<IProps> = ({
  value,
  className,
  link,
  required,
  onSubmitChanges,
  type = '',
  switchValue,
  href,
  doubleClickEdit,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDoubleClickHandler = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : currentTarget);
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

  const generateTD = useCallback(
    (currType: string) => {
      const COMPONENTS: { [index: string]: JSX.Element | HTMLElement } = {
        link: (
          <a href={href || value} rel={NO_REFERRER} target={BLANK}>
            {link}
          </a>
        ),
        linkedin: <SocialIcon socialName='linkedin' link={link || value} />,
        skype: <SocialIcon socialName='skype' link={link || value} />,
        switch: switchTD
      };
      return currType ? COMPONENTS[currType] : <div>{value}</div>;
    },
    [link, value, type, href]
  );

  return (
    <>
      <td
        className={className}
        onDoubleClick={doubleClickEdit ? onDoubleClickHandler : undefined}
      >
        {generateTD(type)}
      </td>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={getPositionConfig(BOTTOM, CENTER)}
        transformOrigin={getPositionConfig(TOP, CENTER)}
      >
        <SingleInputForm
          {...props}
          onSubmit={onSubmitChanges}
          inputProps={inputProps}
          onCancel={handleClose}
          type={type}
          switchValue={switchValue}
          isDoubleClick
        />
      </Popover>
    </>
  );
};
