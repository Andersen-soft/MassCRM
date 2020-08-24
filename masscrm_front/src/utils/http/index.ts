import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { backendUrl } from 'src/constants';

const redirectOnTokenExpiration = (error: AxiosError) => {
  const token = Cookies.get('token');
  if (token && error.response?.status === 401) {
    // token has expired or user isn't logged in
    // redirecting to login page
    Cookies.remove('token');

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
  ({ data }) => {
    if (data.payload.access_token) {
      return data.payload.access_token;
    }
    if (data.payload.login) {
      return data.payload;
    }
    if (data.payload.id) {
      return data.payload;
    }
    if (data.payload) {
      return data.payload;
    }
    return data;
  },
  error => {
    redirectOnTokenExpiration(error);

    return Promise.reject(error);
  }
);

const onFullfiled = (response: any) => {
  return response.data.payload;
};

const onRejected = (reject: any) => {
  redirectOnTokenExpiration(reject);

  return Promise.reject(reject.response.data.payload.errors);
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
