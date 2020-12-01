import React, { FC, useState, useCallback, useMemo, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { CommonIcon } from 'src/components/common';
import {
  Popover,
  PopoverOrigin,
  TableContainer,
  TableBody,
  TableRow,
  Table
} from '@material-ui/core';
import { getRoles } from 'src/selectors/user.selector';
import { InfoOutlined } from '@material-ui/icons';
import { rolesInfoStyles } from './RolesInfo.style';
import styles from './RolesInfo.scss';

const anchorOriginValue: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

const transformOriginValue: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};

export const RolesInfo: FC = () => {
  const style = rolesInfoStyles();

  const roles = useSelector(getRoles);

  const rolesArray = Object.values(roles);

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const classTableBody = useMemo(
    () => ({
      root: style.customBody
    }),
    []
  );

  const classCustomTableRow = useMemo(
    () => ({
      root: style.customTableRow
    }),
    []
  );

  const handleClick = useCallback((event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <div className={styles.wrapper}>
      <CommonIcon IconComponent={InfoOutlined} onClick={handleClick} />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOriginValue}
        transformOrigin={transformOriginValue}
      >
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableBody classes={classTableBody}>
              <div className={styles.wrapperTableRow}>
                {rolesArray.map(item => {
                  return (
                    <TableRow classes={classCustomTableRow} key={item.text}>
                      <div className={styles.mainTitle}>{`${item.text}:`}</div>
                      <div
                        className={styles.info}
                      >{`${item.description?.toLowerCase()}`}</div>
                    </TableRow>
                  );
                })}
              </div>
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  );
};
