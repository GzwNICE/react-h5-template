import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import intl from 'react-intl-universal';
import { history, store } from '@/utils/store';
import { isIPhoneX } from '@/utils/util';
import Cookies from 'js-cookie';
import 'antd-mobile/dist/antd-mobile.less';
import './index.less';
import App from './App';

const locales = {
  vi: require('./locales/vi.json'),
  zh: require('./locales/zh.json'),
};

let currentLocale = intl.determineLocale({
  urlLocaleKey: 'lang',
});

intl.init({
  currentLocale, // determine locale here
  locales,
});

Cookies.set('IPhoneX', isIPhoneX(), { expires: 30 });

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
