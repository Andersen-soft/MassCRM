import React, { FC, useCallback, useState } from 'react';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
  makeStyles,
  Paper
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FilterListIcon from '@material-ui/icons/FilterList';
import TuneIcon from '@material-ui/icons/Tune';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { ErrorOutline } from '@material-ui/icons';
import { SocialIcon } from '../common/SocialIcon';
import { ExitIcon } from '../common/ExitIcon';
import { CommonButton } from '../common/CommonButton';
import { CommonInput } from '../common/CommonInput';
import { SearchInput } from '../common/SearchInput';
import { CustomCheckBox } from '../common/CustomCheckBox';
import { Gender } from '../common/Gender';
import { CustomSwitch } from '../common/CustomSwitch';
import { CustomSelect } from '../common/CustomSelect';
import { DateRange } from '../common/DateRangePicker';
import { Header } from '../common/Header';
import { styleNames } from '../../services';
import styles from './Demo.scss';

const sn = styleNames(styles);

const useStyles = makeStyles({
  icons: {
    color: '#DADADA',
    cursor: 'pointer',
    '&:hover': {
      color: '#69738F'
    }
  },
  box: {
    borderTop: 'solid',
    marginTop: '50px',
    padding: '20px 0'
  }
});

export const Demo: FC = () => {
  const style = useStyles();
  const [selectorValue, setSelectorValue] = useState<Array<string>>([]);
  const [switchValue, setSwitchValue] = useState<boolean>();
  const mockFun = useCallback(() => false, []);

  const onClickSwitch = (event: string) => setSwitchValue(!event);

  return (
    <>
      <Header />
      <Container>
        <Typography variant='h2' component='h2' className={sn('block')}>
          Components
        </Typography>
        <Box className={style.box}>
          <Typography variant='h3' component='h2' className={sn('typography')}>
            ICons
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Group</TableCell>
                  <TableCell align='right'>Icons</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    Social
                  </TableCell>
                  <TableCell align='right'>
                    <Box>
                      <SocialIcon socialName='linkedin' />
                      <SocialIcon socialName='angel' />
                      <SocialIcon socialName='skype' />
                      <SocialIcon socialName='video' />
                      <SocialIcon socialName='xing' />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    Without group
                  </TableCell>
                  <TableCell align='right'>
                    <Box>
                      <ExitIcon onClickHandler={mockFun} />
                      <EditIcon className={style.icons} />
                      <DeleteIcon className={style.icons} />
                      <SendIcon className={style.icons} />
                      <MoreVertIcon className={style.icons} />
                      <FilterListIcon className={style.icons} />
                      <TuneIcon className={style.icons} />
                      <DoneIcon className={style.icons} />
                      <GetAppIcon className={style.icons} />
                      <PublishIcon className={style.icons} />
                      <PermIdentityIcon className={style.icons} />
                      <CloseIcon className={style.icons} />
                      <ErrorOutline className={style.icons} />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className={style.box}>
          <Typography variant='h3' component='h2' className={sn('typography')}>
            Buttons
          </Typography>
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      default Small
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='white'
                        />
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='yellow'
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      disabled Small
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='white'
                          disabled
                        />
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='yellow'
                          disabled
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      default Big
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='white'
                          size='big'
                        />
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='yellow'
                          size='big'
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      disabled Big
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='white'
                          disabled
                          size='big'
                        />
                        <CommonButton
                          text='Click me'
                          onClickHandler={mockFun}
                          color='yellow'
                          disabled
                          size='big'
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box className={style.box}>
          <Typography variant='h3' component='h2' className={sn('typography')}>
            Selectors
          </Typography>
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      single selector
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <CustomSelect
                          items={['America', 'Belarus', 'Russia', 'Ukraine']}
                          placeholder='Countres1'
                          onChange={() => (value: Array<string>) =>
                            setSelectorValue(value)}
                          value={selectorValue || []}
                          multi={false}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      multi selector
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <CustomSelect
                          items={['America', 'Belarus', 'Russia', 'Ukraine']}
                          placeholder='Countres2'
                          onChange={(
                            value: React.SetStateAction<Array<string>>
                          ) => setSelectorValue(value)}
                          value={selectorValue || []}
                          multi
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box className={style.box}>
          <Typography variant='h3' component='h2' className={sn('typography')}>
            Inputs
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    text input
                  </TableCell>
                  <TableCell align='right'>
                    <Box>
                      <CommonInput
                        type='text'
                        onChangeValue={mockFun}
                        isValid
                        placeholder='example'
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    not valid input
                  </TableCell>
                  <TableCell align='right'>
                    <Box>
                      <CommonInput
                        type='text'
                        onChangeValue={mockFun}
                        placeholder='Test'
                        isValid={false}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    Search input
                  </TableCell>
                  <TableCell align='right'>
                    <Box>
                      <SearchInput
                        items={['America', 'Belarus', 'Russia', 'Ukraine']}
                        placeholder='Countres'
                        onChange={mockFun}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    CheckBox
                  </TableCell>
                  <TableCell align='right'>
                    <Box>
                      <CustomCheckBox value onChange={mockFun} />
                      <CustomCheckBox value={false} onChange={mockFun} />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    radio Input
                  </TableCell>
                  <TableCell align='left'>
                    <Box>
                      <Gender onChangeHandler={mockFun} />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    Switch
                  </TableCell>
                  <TableCell align='left'>
                    <Box>
                      <CustomSwitch
                        value={switchValue || false}
                        onChangeHandler={onClickSwitch}
                        label='Switch'
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className={style.box}>
          <Typography variant='h3' component='h2' className={sn('typography')}>
            Date Range Pickers
          </Typography>
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Date range
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <DateRange
                          onChange={mockFun}
                          placeholder='demo dates'
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Singular date
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <DateRange
                          onChange={mockFun}
                          placeholder='demo dates'
                          singular
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      Without year
                    </TableCell>
                    <TableCell align='right'>
                      <Box>
                        <DateRange
                          onChange={mockFun}
                          placeholder='demo dates'
                          disabledYear
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};
