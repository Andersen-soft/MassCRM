import React, { useCallback, useEffect, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { IStoreState } from '../../../../interfaces';
import { AttachmentPartTableRows } from './components/AttachmentPartTableRows';
import {
  getOneContactAttachment,
  uploadContactFile
} from '../../../../actions';

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

export const AttachmentPartTable = () => {
  const classes = useStyles();
  const oneContactAttachmentArray = useSelector(
    (state: IStoreState) => state.oneContactAttachment.data
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));
  const inputChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const [file] = event?.target?.files ?? [];
    await uploadContactFile(file, contactId);
  };

  const buttonClickHandler = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]): Promise<void> => {
    const file = acceptedFiles[0];
    await uploadContactFile(file, contactId);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    dispatch(getOneContactAttachment(contactId));
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} style={{ display: 'none' }} />
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
            {oneContactAttachmentArray.map(element => (
              <AttachmentPartTableRows key={element.id} {...element} />
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
        <input
          ref={inputRef}
          type='file'
          style={{ display: 'none' }}
          onChange={inputChangeHandler}
        />
      </div>
    </div>
  );
};
