import { IJob } from 'src/interfaces';

const HTTP_REG_EXP = /https?:\/\//;

export const checkUrl = (value: string) => {
  const checkedSpace = value.replace(/\s+/g, '');
  const includesHttp = HTTP_REG_EXP.test(checkedSpace);
  return includesHttp ? checkedSpace : `https://${checkedSpace}`;
};

export const checkJobUrl = (obj: IJob) => {
  const currentObject = obj;
  if (currentObject.link) {
    currentObject.link = checkUrl(currentObject.link);
  }
  return currentObject;
};
