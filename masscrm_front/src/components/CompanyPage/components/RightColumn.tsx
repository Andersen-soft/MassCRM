import React, { useState } from 'react';
import { styleNames } from 'src/services';
import style from '../CompanyPage.scss';

const sn = styleNames(style);

export const RightColumn = () => {
  const [isCommentsVisible, setCommentsVisible] = useState<boolean>(true);
  const toggleComments = () => setCommentsVisible(isVisible => !isVisible);

  return (
    <div className={sn('rightContainer')}>
      <div className={sn('tabLinksContainer')}>
        <button
          type='button'
          className={sn('tabLinksLeft')}
          onClick={toggleComments}
          disabled={isCommentsVisible}
        >
          Comments
        </button>
        <button
          type='button'
          className={sn('tabLinksRight')}
          onClick={toggleComments}
          disabled={!isCommentsVisible}
        >
          Attachments
        </button>
      </div>
      <div className={sn('breakline')} />
      {isCommentsVisible ? <p>comment content</p> : <p>attachment content</p>}
    </div>
  );
};
