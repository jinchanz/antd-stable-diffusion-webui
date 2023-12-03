import axios, { AxiosHeaders } from 'axios';
import { message } from 'antd';

const DEFAULT_ERROR_CODE = 10000;

const request = axios.create({
  baseURL: '/',
});

export class BizError extends Error {
  code: number;
  constructor(message: string, code: number = DEFAULT_ERROR_CODE) {
    super(message);
    this.name = 'BizError';
    this.code = code;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()!.split(';').shift();
  }

  return;
}

const CSRF_KEY = 'x-csrf-token';
request.interceptors.request.use((config) => {
  const token = getCookie(CSRF_KEY);

  const headers = new AxiosHeaders({ ...config.headers, [CSRF_KEY]: token! });

  config.headers = headers;

  return config;
});

let modalRef;

export async function login(params: { username: string, password: string }): Promise<any> {
  const { username, password } = params;

  return request('/login/doLoginByPwd', { method: 'POST', data: {
    username,
    password: btoa(password),
  } });
}

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {

    if (response.data.code === 401) {
      message.error(response.data.message);
      return;
    }
    // 处理请求异常、业务异常
    if (!response.data) {
      return Promise.reject(new BizError('请求失败，未知原因'));
    }
    return response.data;
  },
  (err) => {
    // 对响应错误做点什么
    return Promise.reject(new BizError(err.message));
  },
);

export default request;
