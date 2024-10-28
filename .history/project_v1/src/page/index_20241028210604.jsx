// index.jsx
import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicComponentLoader = () => {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '');

  // 动态导入组件
  const Component = lazy(() => import(`./pages/${pageName}.jsx`).catch(() => import('./pages/NotFound')));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default DynamicComponentLoader;
