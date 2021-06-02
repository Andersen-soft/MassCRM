import React, { FC, memo } from 'react';
import { CommonButton } from 'src/view/atoms';

interface IProps {
  isContinueDisabled: boolean;
  selectedTab: string | number;
  onClancel: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export const Actions: FC<IProps> = memo(
  ({ isContinueDisabled, selectedTab, onClancel, onBack, onContinue }) => {
    const isImportSelected = selectedTab === 'Import';

    return (
      <>
        {isImportSelected ? null : (
          <CommonButton
            text='Cancel'
            onClickHandler={onClancel}
            color='white'
            size='big'
          />
        )}
        {selectedTab === 'UploadingSettings' ? null : (
          <CommonButton
            text='Back'
            onClickHandler={onBack}
            color='white'
            size='big'
          />
        )}
        <CommonButton
          text={isImportSelected ? 'Ready' : 'Continue'}
          onClickHandler={isImportSelected ? onClancel : onContinue}
          color='yellow'
          size='big'
          disabled={isImportSelected ? false : isContinueDisabled}
        />
      </>
    );
  }
);
