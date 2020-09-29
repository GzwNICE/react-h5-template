/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { Toast } from 'antd-mobile';
// import { push } from 'connected-react-router';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import { createBrowserHistory } from 'history';
import { getBaseUrl } from '@/utils/util';

const domain = `${window.location.protocol}//${getBaseUrl()}`;
const history = createBrowserHistory();
const lang = Cookies.get('lang');

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response } = error;
  console.log(response);
  // const errorless = codeMessage[response && response.status] || response && response.statusText;
  // const { status, url } = response;
  // throw `请求错误 ${status}: ${url}; ${errorless}`;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use(async (url, options) => {
  let uri = `${domain}${url}`;
  // 防止缓存，GET请求默认带_t参数
  if (options.method === 'get') {
    options.params = {
      ...options.params,
      ...{ _t: new Date().getTime() },
    };
  }
  let headers = {
    appId: localStorage.getItem('AppId')
  };
  let token = localStorage.getItem('token');
  if (token) {
    headers = {
      ...headers,
      Authorization: token,
    };
  }
  return {
    url: uri,
    options: { ...options, headers: headers },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async response => {
  const data = await response.clone().json();
  if (data.code === 200) {
    return response;
  }
  if (data.code !== 200) {
    Toast.fail(data.msg , 2);
    return response;
  }
});

export { request };
