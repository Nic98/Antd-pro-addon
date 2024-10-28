import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import pageRoutes from './pageRoutes'; // 导入你的路由数组

export default DynamicComponentLoader = () => {
  const location = useLocation();

  return (
    <div>{location}</div>
    <div> nihao </div>
  );
};
