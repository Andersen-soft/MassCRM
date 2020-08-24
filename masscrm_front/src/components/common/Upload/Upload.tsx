import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import uniqueId from 'lodash.uniqueid';
import { useStyles } from './Upload.styles';
import { CommonButton } from '../CommonButton';

interface Props {
  fetching?: boolean;
  fileInfoClassName?: string;
  fileExtensions?: string;
  fileName?: string;
  fileSize?: string;
  disabled?: boolean;
  onUpload: (file: File) => void;
  onClear?: () => void;
}

const id = uniqueId('file_');

export const Upload: React.FC<Props> = props => {
  const classes = useStyles(props);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const {
    fetching,
    fileInfoClassName = '',
    fileExtensions,
    fileName,
    fileSize,
    disabled,
    onUpload,
    onClear
  } = props;

  const handleUpload = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (files?.[0]) {
        onUpload(files[0]);
      }
    },
    [onUpload]
  );

  const handleClear = React.useCallback(() => {
    if (onClear) {
      onClear();

      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onClear]);

  return (
    <div className={classes.root}>
      <input
        ref={fileInputRef}
        type='file'
        accept={
          fileExtensions ||
          '.csv, .xls, .xlsx, text/csv, application/vnd.ms-excel'
        }
        id={id}
        onChange={handleUpload}
        className={classes.customInputFile}
      />

      <CommonButton
        className={classes.uploadBtn}
        text=''
        color='white'
        disabled={disabled}
      >
        <label htmlFor={id} className={classes.label}>
          {fetching ? 'Uploading...' : 'Upload'}
        </label>
      </CommonButton>
      {!fetching && fileName ? (
        <div className={`${classes.fileInfoContainer} ${fileInfoClassName}`}>
          <div className={classes.fileInfo}>
            <span className={classes.fileName}>{fileName}</span>
            {fileSize && <span className={classes.fileSize}>{fileSize}</span>}
          </div>
          <IconButton
            aria-label=''
            onClick={handleClear}
            className={classes.iconBtn}
          >
            <Close className={classes.closeIcon} />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
