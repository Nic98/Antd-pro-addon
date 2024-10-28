import React from 'react';

// 引入
import Login from 'page/login/Login.jsx';
import Register from 'page/login/Register.jsx';
import Home from 'page/home/index.jsx';
import Goods from 'page/goods/index.jsx';
import User from 'page/user/index.jsx';
import DashBoard from 'page/dashboard/index.jsx';
import Charts from 'page/charts/index.jsx';
import Lowcode from 'page/lowcode/index.jsx';

import PageControl from 'page/pageControl/index.jsx';
import Warehouse from 'page/warehouse/index.jsx';
import Detail from 'page/detail/index.jsx';

// 注册到 路由数组里
let pageRoutes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/dashboard', component: DashBoard },
  { path: '/goods', component: Goods },
  { path: '/user', component: User },
  { path: '/charts', component: Charts },
  { path: '/warehouse', component: Warehouse },
  { path: '/detail', component: Detail },
  { path: '/pageControl', component: PageControl},
  { path: '/lowcode', component: Lowcode },
]

// 逻辑控制页面 是否允许 访问某些页面
pageRoutes.forEach(item => {
  item.onEnter = function(nextState, replace) {

     // 刷新补充跳转到首页逻辑 登录注册退出不做处理 replace 是跳转的方法
    if (item.path !== '/home') {
      if (item.path === '/login' || item.path === '/register') {
        return;
      }
        replace({ 
          pathname: '/home',
          state: { nextPathname: nextState.location.pathname }
        })
    }
  }
});



export default pageRoutes;
