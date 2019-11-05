import { applyMiddleware, compose } from 'redux';

import { init } from '@rematch/core';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createLoadingPlugin from '@rematch/loading';

import * as models from '@/models';

const history = createBrowserHistory();

const composeEnhancers = compose;
const middlewares = [routerMiddleware(history)];
const enhancers = [applyMiddleware(...middlewares)];
const reducers = { router: connectRouter(history) };

const loadingPlugin = createLoadingPlugin({});

const store = init({
  models,
  plugins: [loadingPlugin],
  redux: {
    reducers,
    enhancers: [composeEnhancers(...enhancers)],
  },
});

export { history, store };
