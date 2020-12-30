import axios from 'axios';
import Cookies from 'js-cookie';
import { backendUrl } from 'src/constants';

const redirectOnTokenExpiration = (error: { [key: string]: string[] }) => {
  const token = Cookies.get('token');
  if (error.token) {
    token && Cookies.remove('token');
    window.location.href = '/';
  }
};

export const instance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Access-Control-Allow-Origin': true,
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  config => {
    const res = { ...config };
    const token = Cookies.get('token');
    if (token) {
      res.headers.Authorization = `Bearer ${token}`;
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  ({ data: { data } }) => {
    if (data.access_token) {
      return data.access_token;
    }
    return data;
  },
  error => {
    redirectOnTokenExpiration(error);

    return Promise.reject(error);
  }
);

const onFullfiled = (response: any) => {
  return response.data;
};

const onRejectedServerError = () => {
  window.location.href = '/error';
};

const onRejected = (reject: any) => {
  const { errors, statusCode } = reject.response.data;

  redirectOnTokenExpiration(errors);
  if (statusCode === 502 || statusCode === 503 || statusCode === 504) {
    onRejectedServerError();
  }
  return Promise.reject(errors);
};

const HTTP = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

HTTP.interceptors.request.use((config: any) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${Cookies.get('token')}`
  }
}));

HTTP.interceptors.response.use(onFullfiled, onRejected);

export default HTTP;

const onFullfiledFile = (response: any) => response;

export const HTTPFile = axios.create({
  baseURL: backendUrl
});

HTTPFile.interceptors.request.use((config: any) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${Cookies.get('token')}`
  }
}));

HTTPFile.interceptors.response.use(onFullfiledFile, onRejected);
