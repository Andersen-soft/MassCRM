import React, { FC, useCallback } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { IAttachment } from 'src/interfaces';
import { useSelector } from 'react-redux';
import { getLoader } from 'src/store/slices';
import { Loader } from 'src/view/atoms';
import { Row } from './components';
import { useStyles } from './Attachments.styles';

interface IProps {
  attachments: IAttachment[];
  uploadHandler: Function;
  deleteHandler: (id: number) => void;
}

export const Attachments: FC<IProps> = ({
  attachments,
  uploadHandler,
  deleteHandler
}) => {
  const styles = useStyles();

  const load = useSelector(getLoader);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      file && uploadHandler(file);
    },
    [uploadHandler]
  );

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop });

  return (
    <div
      className={styles.attachment}
      {...getRootProps({ onClick: event => event.stopPropagation() })}
    >
      <input {...getInputProps()} />
      <TableContainer component='div' className={styles.root}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell align='left' className={styles.firstColumn}>
                File
              </TableCell>
              <TableCell align='left' className={styles.middleColumn}>
                User
              </TableCell>
              <TableCell align='left' className={styles.middleColumn}>
                Date added
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {attachments.map(element => (
              <Row
                key={element.id}
                element={element}
                deleteHandler={deleteHandler}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.wrapperTableFooter}>
        <span className={styles.spanInWrapperTableFooter}>
          Drag the file into the box above or
        </span>
        <Button
          variant='contained'
          component='label'
          onClick={open}
          className={styles.uploadButton}
          disableRipple
        >
          Add file
        </Button>
      </div>
      {load && <Loader />}
    </div>
  );
};
