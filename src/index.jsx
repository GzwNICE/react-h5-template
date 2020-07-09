import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import intl from 'react-intl-universal';
import { history, store } from '@/utils/store';
import { isIPhoneX } from '@/utils/util';
import { request } from '@/utils/request';
import Cookies from 'js-cookie';
import 'antd-mobile/dist/antd-mobile.less';
import './index.less';
import App from './App';

let lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
lang = lang.substr(0, 2);
if (lang === 'vi' || lang === 'zh') Cookies.set('lang', lang);

const locales = {
  vi: require('./locales/vi.json'),
  zh: require('./locales/zh.json'),
};

let currentLocale = intl.determineLocale({
  // urlLocaleKey: 'lang',
  cookieLocaleKey: 'lang',
});

intl.init({
  currentLocale, // determine locale here
  locales,
});

Cookies.set('IPhoneX', isIPhoneX(), { expires: 30 });

request('/app/system/conf/enable', { method: 'get' }).then(res => {
  if (res.code === 200) {
    localStorage.setItem('configuration', JSON.stringify(res.data));
  }
});

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
