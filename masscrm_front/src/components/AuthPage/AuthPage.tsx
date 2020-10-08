import React, { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState, IRoles } from 'src/interfaces';
import { closeImportModalAction, websocketActions } from 'src/actions';
import history from 'src/store/history';
import { ImportModal, Authentication } from 'src/components';
import { rolesConfig } from '../../data/header';

interface Props {
  token?: string;
  userRole: IRoles;
}

export const AuthPage: FC<Props> = ({ children, token, userRole }) => {
  const dispatch = useDispatch();
  const currentPage = history.location.pathname;
  const roles = Object.keys(userRole);
  const hasRoles = roles.length > 0;

  const { isImportModalOpen, ws } = useSelector((state: IStoreState) => ({
    isImportModalOpen: state.import.isImportModalOpen,
    ws: state.websocket.ws
  }));

  const handleCloseImportModal = useCallback(() => {
    dispatch(closeImportModalAction(false));
  }, [dispatch]);

  useEffect(() => {
    if (hasRoles) {
      const { availablePages } = rolesConfig;

      if (!availablePages[roles[0]]?.includes(currentPage)) {
        history.push(availablePages[roles[0]][0]);
      }
    }
  }, [userRole, currentPage]);

  useEffect(() => {
    if (token && !ws) {
      dispatch(websocketActions.connectAction());
    }
  }, [token, ws]);

  if (!token) {
    return <Authentication />;
  }

  return (
    <>
      {hasRoles && children}
      <ImportModal open={isImportModalOpen} onClose={handleCloseImportModal} />
    </>
  );
};
