import React, { useState, useCallback, useMemo, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { InfoOutlined } from '@material-ui/icons';
import {
  Popover,
  TableContainer,
  TableBody,
  TableRow,
  Table
} from '@material-ui/core';
import { CommonIcon } from 'src/view/atoms';
import { getRolesSelector } from 'src/store/slices';
import { IRole } from 'src/interfaces';
import { BOTTOM, getPositionConfig, LEFT, TOP } from 'src/constants';
import { useStyles } from './RolesInfo.styles';

export const RolesInfo = () => {
  const styles = useStyles();

  const roles = useSelector(getRolesSelector);

  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  const classTableBody = useMemo(
    () => ({
      root: styles.customBody
    }),
    []
  );

  const classCustomTableRow = useMemo(
    () => ({
      root: styles.customTableRow
    }),
    []
  );

  const handleClick = useCallback(
    ({ currentTarget }: MouseEvent<SVGSVGElement>) => {
      setAnchorEl(currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div id='roles-info' className={styles.wrapper}>
      <CommonIcon IconComponent={InfoOutlined} onClick={handleClick} />

      <Popover
        id='roles-info-popover'
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={getPositionConfig(TOP, LEFT)}
        transformOrigin={getPositionConfig(BOTTOM, LEFT)}
      >
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableBody classes={classTableBody}>
              <div className={styles.wrapperTableRow}>
                {Object.values(roles).map(({ description, text }: IRole) => (
                  <TableRow classes={classCustomTableRow} key={text}>
                    <div className={styles.mainTitle}>{`${text}:`}</div>
                    <div
                      className={styles.info}
                    >{`${description?.toLowerCase()}`}</div>
                  </TableRow>
                ))}
              </div>
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  );
};
