import * as React from 'react';
import { CommonButton } from '../../common';

interface Props {
  isContinueDisabled: boolean;
  selectedTab: string | number;
  onClancel: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export const ImportModalActions: React.FC<Props> = React.memo(props => {
  const {
    isContinueDisabled,
    selectedTab,
    onClancel,
    onBack,
    onContinue
  } = props;
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
});
