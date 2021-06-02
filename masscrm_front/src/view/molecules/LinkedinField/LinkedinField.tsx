import React, { FC } from 'react';
import { SocialIcon } from 'src/view/atoms';

interface IProps {
  linkType: string;
  link?: string;
}

export const LinkedinField: FC<IProps> = ({ link, linkType }) => (
  <SocialIcon socialName={linkType} link={link} />
);
