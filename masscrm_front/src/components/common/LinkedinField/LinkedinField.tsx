import React, { FC } from 'react';
import { ILinkedinField } from 'src/interfaces';
import { SocialIcon } from 'src/components/common';

export const LinkedinField: FC<ILinkedinField> = ({ link, linkType }) => (
  <SocialIcon socialName={linkType} link={link} />
);
