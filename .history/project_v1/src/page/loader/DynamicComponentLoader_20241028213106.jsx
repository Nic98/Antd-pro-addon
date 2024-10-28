import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

export default DynamicComponentLoader = () => {
  const location = useLocation();

  return (
    <div>{location}</div>
  );
};
