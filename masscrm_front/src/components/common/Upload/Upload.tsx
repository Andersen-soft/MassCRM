import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import GetAppIcon from '@material-ui/icons/GetApp';
import cn from 'classnames';
import { useStyles } from './Upload.styles';

const MAX_FILE_SIZE = 1;

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

export const Upload: React.FC<Props> = props => {
  const classes = useStyles();

  const {
    fetching,
    fileInfoClassName = '',
    fileExtensions,
    fileName,
    fileSize,
    onUpload,
    onClear
  } = props;

  const handleClear = React.useCallback(() => {
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  const onDrop = React.useCallback(acceptedFiles => {
    const [file] = acceptedFiles;

    if (file) {
      onUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: Boolean(fileName),
    maxFiles: MAX_FILE_SIZE,
    accept:
      fileExtensions || '.csv, .xls, .xlsx, text/csv, application/vnd.ms-excel'
  });

  return (
    <div className={classes.root}>
      <div {...getRootProps()} className={classes.dropZone}>
        <input {...getInputProps()} />
        <div className={classes.dropZoneField}>
          <GetAppIcon className={classes.uploadIcon} />
          <p className={classes.dropZoneFieldText}>Drag and drop files here</p>
        </div>
        <div className={classes.dropZoneField}>
          <p className={classes.dropZoneFieldText}>or</p>
          <div
            className={cn({
              [classes.uploadArea]: true,
              [classes.uploadAreaBlocked]: !fileName
            })}
          >
            Upload
          </div>
        </div>
      </div>
      {!fetching && fileName && (
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
      )}
    </div>
  );
};
