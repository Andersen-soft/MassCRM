import React, { FC, useCallback, useRef } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import { IAttachment } from 'src/interfaces';
import { styleNames } from 'src/services';
import { useSelector } from 'react-redux';
import { getLoader } from 'src/selectors';
import { AttachmentRow } from './components';
import style from './Attachment.scss';
import { Loader } from '../Loader';

const sn = styleNames(style);

const useStyles = makeStyles({
  root: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    '& .MuiTablePagination-root': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  tableHead: {
    '& .MuiTableRow-root:nth-child(odd)': {
      color: '#78829D'
    },
    '& .MuiTableCell-root': {
      color: '#78829D'
    }
  },
  tableBody: {
    '& .MuiTableRow-root:nth-child(odd)': {
      backgroundColor: '#F9F9FA'
    }
  },
  wrapperTableFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '30px'
  },
  spanInWrapperTableFooter: {
    paddingTop: '9px',
    paddingRight: '16px',
    color: '#78829D',
    fontFamily: 'Roboto',
    fontSize: '14px',
    lineHeight: '16px'
  },
  uploadButton: {
    backgroundColor: '#FEDA00',
    borderRadius: '50px',
    fontSize: '14px',
    lineHeight: '16px',
    marginRight: '24px',
    width: '140px',
    height: '32px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#FEDA00'
    }
  },
  firstColumn: {
    width: '30%',
    borderBottom: 'none',
    paddingLeft: '24px'
  },
  middleColumn: {
    width: '20%',
    borderBottom: 'none'
  }
});

export const Attachments: FC<{
  attachments: Array<IAttachment>;
  uploadHandler: Function;
  deleteHandler: (id: number) => void;
}> = ({ attachments, uploadHandler, deleteHandler }) => {
  const classes = useStyles();
  const load = useSelector(getLoader);
  const inputRef = useRef<HTMLInputElement>(null);

  const buttonClickHandler = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      uploadHandler(acceptedFiles[0]);
    },
    [uploadHandler]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className={sn('attachment')}
      {...getRootProps({ onClick: event => event.stopPropagation() })}
    >
      <input {...getInputProps()} style={{ display: 'none' }} ref={inputRef} />
      <TableContainer component='div' className={classes.root}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell align='left' className={classes.firstColumn}>
                File
              </TableCell>
              <TableCell align='left' className={classes.middleColumn}>
                User
              </TableCell>
              <TableCell align='left' className={classes.middleColumn}>
                Date added
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {attachments.map(element => (
              <AttachmentRow
                key={element.id}
                element={element}
                deleteHandler={deleteHandler}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.wrapperTableFooter}>
        <span className={classes.spanInWrapperTableFooter}>
          Drag the file into the box above or
        </span>
        <Button
          variant='contained'
          component='label'
          onClick={buttonClickHandler}
          className={classes.uploadButton}
          disableRipple
        >
          Add file
        </Button>
      </div>
      {load && <Loader />}
    </div>
  );
};
