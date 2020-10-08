import React, { FC, useMemo, useState } from 'react';
import { Header } from 'src/components/common';
import { styleNames } from 'src/services';
import style from './ContactPage.scss';
import { InfoPart } from './components/InfoPart';
import { HeaderForAttachmentAndActivityLog } from './components/HeaderForAttachmentAndActivityLog/HeaderForAttachmentAndActivityLog';
import { CommonShowMoreButton } from '../common/CommonShowMoreButton/CommonShowMoreButton';
import { ActivityLogPartTable } from './components/ActivityLogPartTable/ActivityLogPartTable';
import { AttachmentPartTable } from './components/AttachmentPartTable/AttachmentPartTable';

export const ContactPage: FC = () => {
  const [activityVisible, setActivityVisible] = useState(false);
  const [attachmentVisible, setAttachmentVisible] = useState(false);

  const toggleActivityVisibilityHandler = (): void => {
    setActivityVisible(value => !value);
  };

  const toggleAttachmentVisibleHandler = (): void => {
    setAttachmentVisible(value => !value);
  };

  const HIDE_VALUE = 'hide';
  const SHOW_VALUE = 'show';
  const getValue = (key: boolean) => (key ? HIDE_VALUE : SHOW_VALUE);
  const [labelTextActivity, labelTextAttachment] = useMemo(
    () => [getValue(activityVisible), getValue(attachmentVisible)],
    [activityVisible, attachmentVisible]
  );

  const sn = styleNames(style);
  return (
    <>
      <Header />
      <div className='container'>
        <div className={sn('info_part')}>
          <InfoPart />
        </div>
        <div className={sn('attachment_activity_part')}>
          <HeaderForAttachmentAndActivityLog
            label='Attachment'
            buttonElement={
              <CommonShowMoreButton
                show={labelTextActivity}
                color='#78829D'
                fontSize='12px'
                toggleVisibility={toggleActivityVisibilityHandler}
              />
            }
          />
          <div>{activityVisible && <AttachmentPartTable />}</div>
        </div>
        <div className={sn('attachment_activity_part')}>
          <HeaderForAttachmentAndActivityLog
            label='Activity log'
            buttonElement={
              <CommonShowMoreButton
                show={labelTextAttachment}
                color='#78829D'
                fontSize='12px'
                toggleVisibility={toggleAttachmentVisibleHandler}
              />
            }
          />
          <div>{attachmentVisible && <ActivityLogPartTable />}</div>
        </div>
      </div>
    </>
  );
};
