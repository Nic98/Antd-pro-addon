import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './app/App.jsx';
import Error401 from './error/Error401.jsx';
import Error404 from './error/Error404.jsx';

import Login from '../page/login/Login.jsx';
import pageRoutes from './routesCfg';
import 

const routes = {
    path: '/',
    component: App,
    indexRoute: { component: Login },
    childRoutes: pageRoutes
};

// 做非业务相关的 其他页面效果 如报错页 及找不到的页面
routes.childRoutes.push(
    { path: '/401', component: Error401 },
    { path: '*', component: Error404 }
);


export default class Routes extends Component{

    render(){
      console.log('route data', routes);
      return(
        // redux
          <Router history={ hashHistory } routes={ routes } />
      );
    }
}
