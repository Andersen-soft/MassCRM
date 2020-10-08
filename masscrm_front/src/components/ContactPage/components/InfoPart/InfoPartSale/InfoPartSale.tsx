import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import style from './InfoPartSale.scss';
import { styleNames } from '../../../../../services';
import { IStoreState } from '../../../../../interfaces';
import { getOneContactRequest } from '../../../../../actions';
import { ISale } from '../../../../Contact/components/ContactForm/interfaces';

export const InfoPartSale = () => {
  const sn = styleNames(style);
  const dispatch = useDispatch();
  const location = useLocation();
  const contactId = Number(new URLSearchParams(location.search).get('id'));
  const oneContactDataSales = useSelector(
    (state: IStoreState) => state.oneContact.data.sales
  );
  const titleArray = [
    'Sale created:',
    'Source:',
    'Sale ID:',
    'Sale Status:',
    '1C Project:'
  ];
  const stringTransform = (myString: string) => {
    const castedString = myString
      .replace('id', 'Sale ID')
      .replace('status', 'Sale Status')
      .replace('created_at', 'Sale created')
      .replace('project_c1', '1C Project');
    return castedString.charAt(0).toUpperCase() + castedString.slice(1);
  };

  useEffect(() => {
    dispatch(getOneContactRequest(contactId));
  }, []);

  const saleDataCallback = (saleArray: Array<ISale>) => {
    if (saleArray.length > 0) {
      return saleArray
        .map(({ link, ...sale }) => sale)
        .map(sale => Object.entries(sale))
        .flat()
        .map(([left, right]) => {
          return (
            <div key={left.toString()}>
              <span className={sn('spanLeft')}>{stringTransform(left)}</span>
              <span className={sn('spanRight')}>{right}</span>
            </div>
          );
        });
    }
    return titleArray.map(element => (
      <div key={element}>
        <span className={sn('spanLeft')}>{element}</span>
        <span className={sn('spanRight')} />
      </div>
    ));
  };

  return (
    <div className={sn('column')}>{saleDataCallback(oneContactDataSales)}</div>
  );
};
