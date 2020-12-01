import { IJob } from 'src/interfaces/IJob';

const HTTP_REG_EXP = /https?:\/\//;

export const checkUrl = (value: string) => {
  const includesHttp = HTTP_REG_EXP.test(value);
  return includesHttp ? value : `https://${value}`;
};

export const checkJobUrl = (obj: IJob) => {
  const currentObject = obj;
  if (currentObject.link) {
    currentObject.link = checkUrl(currentObject.link);
  }
  return currentObject;
};
