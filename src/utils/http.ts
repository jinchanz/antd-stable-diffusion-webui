import request from './request';
import { message } from 'antd';
import { AxiosRequestConfig } from 'axios';

export interface IPageQueryParams {
  pageNo: number;
  pageSize: number;
}

export interface IPageResult<T> {
  data: T[];
  total: number;
  pageNo?: number;
  pageSize?: number;
}

export interface IHttpResult<T> {
  code: number | string;
  data: T;
  message: string;
  success: boolean;
}


class HttpError extends Error {
  static create(e) {
    return new HttpError(e.code || 500, e.message);
  }

  code: string | number;
  message: string;
  constructor(code: string | number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

const CODE_MESSAGE_MAP = {

};

function handleError(e) {
  let errorMessage;
  if (!e || !e.code) {
    errorMessage = '服务器偷懒啦！';
  } else if (e.code === 401) {
    return;
  } else {
    errorMessage = CODE_MESSAGE_MAP[e.code];
  }

  if (!message) {
    errorMessage = e.message;
  }

  message.error(errorMessage);
}


export default {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResult<T> | null> {
    try {
      return await request.get(url, config);
    } catch (e) {
      handleError(e);
      return null;
    }
  },

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<IHttpResult<T> | null> {
    try {
      return await request.post(url, data, config);
    } catch (e) {
      handleError(e);
      return null;
    }
  },
};
