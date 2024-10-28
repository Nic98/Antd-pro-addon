import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {

  const currURL = window.location.href;
  console.log(currURL.split('/').pop());
  // const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (
    <div>
      <iframe id="iframe" src="http://www.domain2.com/b.html"></iframe>
    </div>
  );

};
