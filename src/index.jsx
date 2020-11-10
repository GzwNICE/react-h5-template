import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history, store } from '@/utils/store';
import { isIPhoneX } from '@/utils/util';
import { request } from '@/utils/request';
import Cookies from 'js-cookie';
import 'antd-mobile/dist/antd-mobile.less';
import './index.less';
import App from './App';

Cookies.set('IPhoneX', isIPhoneX(), { expires: 30 });

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
