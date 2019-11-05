import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from '@/utils/routes';

const App = () => <Switch>{renderRoutes(routes)}</Switch>;

export default hot(App);
