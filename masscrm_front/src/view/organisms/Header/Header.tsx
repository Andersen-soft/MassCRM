import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Snackbar, SnackbarOrigin } from '@material-ui/core';
import { NotificationsNoneRounded as NotificationsNoneRoundedIcon } from '@material-ui/icons';
import history from 'src/utils/history';
import {
  IStoreState,
  INotification,
  INotificationPayload
} from 'src/interfaces';
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
  getAddContactList,
  getUserRoles,
  setPageAction,
  getCurrentPage,
  getNotificationList
} from 'src/store/slices';
import { FiltersContext } from 'src/contexts';
import { ImportModal } from 'src/view/modals';
import { MoreInformation } from 'src/view/organisms';
import {
  BOTTOM,
  getPositionConfig,
  RIGHT,
  NAVIGATION_CONFIG,
  ADMIN
} from 'src/constants';
import {
  Alert,
  Logo,
  Notification,
  CommonError,
  DisplayErrors,
  ExitIcon
} from './components';
import { useStyles } from './Header.styles';

interface IProps {
  daily?: boolean;
  myContacts?: boolean;
}

export const Header: FC<IProps> = ({ daily, myContacts }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onClose = useCallback(() => setOpenModal(false), []);

  const { location } = window;

  const userRole = useSelector(getUserRoles);
  const numberPageFromStore: number = useSelector(getCurrentPage);
  const user = useSelector((state: IStoreState) => state.users.userData);
  const wsData = useSelector((state: IStoreState) => state.websocket.wsData);
  const notificationList = useSelector(getNotificationList);

  const roles = Object.keys(userRole);

  const styles = useStyles();

  const dispatch = useDispatch();

  const { getRequestValues } = useContext(FiltersContext);

  const { pathname, search } = history.location;

  const numberPageFromUrl =
    Number(new URLSearchParams(search).get('page')) || 1;

  if (numberPageFromStore !== numberPageFromUrl)
    dispatch(setPageAction({ currentPage: numberPageFromUrl }));

  if (search) {
    localStorage.setItem(pathname, search);
  }

  if (!search && localStorage.getItem(pathname)) {
    const urlParams = new URLSearchParams(
      localStorage.getItem(pathname)?.toString()
    );
    const currentPage = Number(urlParams.get('page'));
    const currentFilter = urlParams.get('filter');
    currentPage && urlParams.set('page', currentPage.toString());
    currentFilter && urlParams.set('filter', currentFilter.toString());
    history.replace({
      search: urlParams.toString()
    });
    dispatch(setPageAction({ currentPage }));
  }

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

  const getResult = (type: string, id: number, data: INotificationPayload) => {
    return RESULT[type](id, data);
  };

  const onLogout = useCallback(() => {
    logout().then(() => {
      Cookies.remove('token');
      location.href = '/';
      localStorage.clear();
    });
  }, []);

  const handleClose = () => setOpen(false);

  const headerCallBack = useCallback(() => {
    if (roles.length) {
      return NAVIGATION_CONFIG[roles[0]].navMenu.map(({ title, url }) => (
        <Link
          key={title}
          to={url}
          className={`${styles.headerItem} ${
            history.location.pathname === url ? styles.headerItemActive : ''
          }`}
        >
          <span>{title}</span>
        </Link>
      ));
    }
    return false;
  }, [userRole]);

  const newNotification = notificationList.filter(
    ({ payload: { new: payloadNew } }: INotification) => payloadNew
  );

  const historyNotification = notificationList.filter(
    ({ payload: { new: payloadNew } }: INotification) => !payloadNew
  );

  const getUserName = () => {
    return user?.name && user?.surname ? `${user.name} ${user.surname}` : '';
  };

  useEffect(() => {
    dispatch(getNotification());

    if (wsData?.message) {
      dispatch(finishImportAction());
      setOpen(true);
      dispatch(clearWebsocketData(null));
    }
  }, [wsData]);

  useEffect(() => {
    if (!search && !localStorage.getItem(pathname)) {
      dispatch(setPageAction({ currentPage: 1 }));
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.headerNav}>
          <Logo />
          <nav className={styles.headerMenu}>{headerCallBack()}</nav>
        </div>
        <div className={styles.headerBtns}>
          {!roles.includes(ADMIN) && (
            <Badge
              className={styles.badge}
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
          <span className={styles.headerUser}>{getUserName()}</span>
          <ExitIcon onClickHandler={onLogout} />
        </div>
      </div>
      <DisplayErrors />
      <Snackbar
        className={styles.snackbar}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={getPositionConfig(BOTTOM, RIGHT) as SnackbarOrigin}
      >
        <Alert severity='info'>
          <div className={styles.headerNotificationSnackbar}>
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
