import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {
  if()
  console.log(URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general');


  // const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (
    <div>
      你好啊 fufu
    </div>
  );

};
