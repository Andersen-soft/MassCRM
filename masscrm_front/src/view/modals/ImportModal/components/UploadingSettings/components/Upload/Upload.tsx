import React, { useCallback, FC } from 'react';
import { IconButton } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { GetApp as GetAppIcon, Close } from '@material-ui/icons';
import cn from 'classnames';
import { MAX_FILE_SIZE, DEFAULT_FILES_EXTENSIONS } from './constants';
import { useStyles } from './Upload.styles';

interface IProps {
  fetching?: boolean;
  fileInfoClassName?: string;
  fileExtensions?: string;
  fileName?: string;
  fileSize?: string;
  disabled?: boolean;
  onUpload: (file: File) => void;
  onClear?: () => void;
}

export const Upload: FC<IProps> = ({
  fetching,
  fileInfoClassName = '',
  fileExtensions,
  fileName,
  fileSize,
  onUpload,
  onClear
}) => {
  const styles = useStyles();

  const handleClear = useCallback(() => {
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  const onDrop = useCallback(acceptedFiles => {
    const [file] = acceptedFiles;

    if (file) {
      onUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: !!fileName,
    maxFiles: MAX_FILE_SIZE,
    accept: fileExtensions || DEFAULT_FILES_EXTENSIONS
  });

  return (
    <div className={styles.root}>
      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        <div className={styles.dropZoneField}>
          <GetAppIcon className={styles.uploadIcon} />
          <p className={styles.dropZoneFieldText}>Drag and drop files here</p>
        </div>
        <div className={styles.dropZoneField}>
          <p className={styles.dropZoneFieldText}>or</p>
          <div
            className={cn({
              [styles.uploadArea]: true,
              [styles.uploadAreaBlocked]: !fileName
            })}
          >
            Upload
          </div>
        </div>
      </div>
      {!fetching && fileName && (
        <div className={`${styles.fileInfoContainer} ${fileInfoClassName}`}>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{fileName}</span>
            {fileSize && <span className={styles.fileSize}>{fileSize}</span>}
          </div>
          <IconButton
            aria-label=''
            onClick={handleClear}
            className={styles.iconBtn}
          >
            <Close className={styles.closeIcon} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Upload;
