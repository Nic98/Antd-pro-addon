import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

export default function DynamicComponentLoader() => {
  const location = useLocation();

  return (
    <div>你好fufu</div>
  );
};
