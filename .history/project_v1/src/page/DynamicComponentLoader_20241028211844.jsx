import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import pageRoutes from './pageRoutes'; // 导入你的路由数组

const DynamicComponentLoader = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      {pageRoutes.map(route => (
        <Route 
          key={route.path} 
          path={route.path} 
          component={route.component} 
        />
      ))}
      {/* 404处理 */}
      <Route render={() => <h2>404 Not Found</h2>} />
    </Switch>
  );
};

export default DynamicComponentLoader;
