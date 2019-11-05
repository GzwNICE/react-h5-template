import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';

import { history, store } from '@/utils/store';

import App from './App';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
