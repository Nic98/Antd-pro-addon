import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {

  // 接收domain1的数据
  window.addEventListener('message',(e) => {
    console.log(e.data);

    if(e.origin !== 'localhost:8080') return;

  }, false);


  // const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (
    <div>
      <iframe id="iframe" src="http://www.domain2.com/b.html"></iframe>
    </div>
  );

};
