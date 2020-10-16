import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Index from './containers/Index';

export const urls = {
  index: '/',
  home: '/home',
};

export const routes = (
  <Route path={urls.index} component={Index}>
    <IndexRoute component={Index} />
    <Route path={urls.home} component={Index} />
  </Route>
);