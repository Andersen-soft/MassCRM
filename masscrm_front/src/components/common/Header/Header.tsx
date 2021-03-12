import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import history from 'src/utils/history';
import { rolesConfig, header } from 'src/data/header';
import { INotificationStore, IStoreState } from 'src/interfaces/store';
import { getUserRoles } from 'src/selectors';
import Badge from '@material-ui/core/Badge';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {
  changeViewed,
  clearWebsocketData,
  finishImportAction,
  getContactExportFile,
  getImportResult,
  getNotification,
  setSelectedTabAction,
  getExportFile,
  logout,
  setPage,
  getAddContactList
} from 'src/actions';
import { INotification, INotificationPayload } from 'src/interfaces';
import { FilterContext } from 'src/context';
import {
  localStorageContactPageNames,
  removeLocalStorageItems
} from 'src/utils/localStorage';
import { Logo } from '../Logo';
import style from './Header.scss';
import { ExitIcon } from '../ExitIcon';
import { MoreInformation } from '../MoreInformation';
import { useStyles } from './Header.style';
import { CommonError } from '..';
import { ImportModal } from '../../ImportModal';
import { Notification } from '../../Notification';
import { DisplayErrors } from '../../DisplayErrors';

const sn = styleNames(style);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const Header: FC<{ daily?: boolean; myContacts?: boolean }> = ({
  daily,
  myContacts
}) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onClose = () => setOpenModal(false);
  const { location } = window;
  const userRole = useSelector(getUserRoles);
  const roles = Object.keys(userRole);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { getRequestValues } = useContext(FilterContext);

  const RESULT: { [key: string]: Function } = {
    export_blacklist_finished: (id: number, data: INotificationPayload) => {
      getExportFile(data.file_path, 'Blacklist').then(() => {
        if (data.new) {
          changeViewed(id).then(() => dispatch(getNotification()));
        }
      });
    },
    export_contacts_finished: (id: number, data: INotificationPayload) => {
      getContactExportFile(data.file_path, data.created_at).then(() => {
        if (data.new) {
          changeViewed(id).then(() => dispatch(getNotification()));
        }
      });
    },
    import_finished: (id: number, data: INotificationPayload) => {
      dispatch(setSelectedTabAction('Import'));
      dispatch(getImportResult(data.operation_id));
      if (data.new) {
        changeViewed(id).then(() => dispatch(getNotification()));
      }
      setOpenModal(true);
    },
    is_in_work_updated: (id: number, data: INotificationPayload) => {
      dispatch(getAddContactList(getRequestValues({ daily, myContacts })));
      if (data.new) {
        changeViewed(id).then(() => dispatch(getNotification()));
      }
    }
  };

  const getResult = (type: string, id: number, data: INotificationPayload) =>
    RESULT[type](id, data);

  const onLogout = useCallback(() => {
    logout().then(() => {
      Cookies.remove('token');
      location.href = '/';

      removeLocalStorageItems(localStorageContactPageNames);
    });
  }, []);

  const handleClose = () => setOpen(false);

  const onFirstPage = () => dispatch(setPage(1));

  const headerCallBack = useCallback(() => {
    if (roles.length > 0) {
      return rolesConfig.availablePages[roles[0]]?.map(url => {
        const name = header[url.split('/')[1]];

        return (
          name && (
            <Link
              key={name}
              to={url}
              className={`${sn('header__item')} ${
                history.location.pathname === url
                  ? sn('header__item_active')
                  : ''
              }`}
              onClick={onFirstPage}
            >
              <span>{name}</span>
            </Link>
          )
        );
      });
    }
    return false;
  }, [userRole]);

  const user = useSelector((state: IStoreState) => state.users.userData);
  const wsData = useSelector((state: IStoreState) => state.websocket.wsData);

  const notificationList = useSelector(
    (state: INotificationStore) => state.notification.data
  );
  const newNotification = notificationList.filter(
    (item: INotification) => item.payload.new
  );
  const historyNotification = notificationList.filter(
    (item: INotification) => !item.payload.new
  );

  useEffect(() => {
    dispatch(getNotification());
    if (wsData?.message) {
      dispatch(finishImportAction());
      setOpen(true);
      dispatch(clearWebsocketData(null));
    }
  }, [wsData]);

  return (
    <header className={sn('header')}>
      <div className={`${sn('header__container')} container`}>
        <div className={sn('header__nav')}>
          <Logo />
          <nav className={sn('header__menu')}>{headerCallBack()}</nav>
        </div>
        <div className={sn('header__btns')}>
          {!roles.includes('administrator') && (
            <Badge
              className={classes.badge}
              badgeContent={newNotification?.length}
              overlap='circle'
            >
              <MoreInformation
                data-testid='notification'
                icon={NotificationsNoneRoundedIcon}
                notification
                popperInfo={
                  <Notification
                    getResult={getResult}
                    newNotification={newNotification}
                    historyNotification={historyNotification}
                  />
                }
              />
            </Badge>
          )}
          <span className={sn('header__user')}>
            {user?.name ? user.name : ''}
          </span>
          <ExitIcon onClickHandler={onLogout} />
        </div>
      </div>
      <DisplayErrors />
      <Snackbar
        className={classes.snackbar}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='info'>
          <div className={sn('header__notification-snackbar')}>
            <span>New notification! Click on </span>
            <NotificationsNoneRoundedIcon />
            <span> to see details.</span>
          </div>
        </Alert>
      </Snackbar>
      <ImportModal open={openModal} onClose={onClose} importTabs='Import' />
      <CommonError />
    </header>
  );
};
