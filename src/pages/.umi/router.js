import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/login',
    component: require('../../layouts/LoginLayout').default,
    routes: [
      {
        path: '/login',
        component: require('../Auth/Login').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        component: () =>
          React.createElement(
            require('E:/develop/quark/quark-ui/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'quark',
        _title_default: 'quark',
      },
    ],
    _title: 'quark',
    _title_default: 'quark',
  },
  {
    path: '/',
    component: require('../../layouts/AdminLayout').default,
    routes: [
      {
        path: '/',
        component: require('../Dashboard/Index').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/index',
        component: require('../Dashboard/Index').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/dashboard/index',
        component: require('../Dashboard/Index').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/upgrade/index',
        component: require('../Upgrade/Index').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/quark/engine',
        component: require('../Quark/Engine').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/account',
        component: require('../Account/Settings/Info').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/account/settings',
        component: require('../Account/Settings/Info').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/account/settings/info',
        component: require('../Account/Settings/Info').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/account/settings/security',
        component: require('../Account/Settings/Security').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/sms/send',
        component: require('../Sms/Send').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/goodsAttribute/create',
        component: require('../GoodsAttribute/Create').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        path: '/goodsAttribute/edit',
        component: require('../GoodsAttribute/Edit').default,
        exact: true,
        _title: 'quark',
        _title_default: 'quark',
      },
      {
        component: () =>
          React.createElement(
            require('E:/develop/quark/quark-ui/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'quark',
        _title_default: 'quark',
      },
    ],
    _title: 'quark',
    _title_default: 'quark',
  },
  {
    component: () =>
      React.createElement(
        require('E:/develop/quark/quark-ui/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'quark',
    _title_default: 'quark',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
