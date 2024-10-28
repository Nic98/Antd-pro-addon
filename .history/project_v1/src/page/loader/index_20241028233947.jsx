import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {

// 接收domain1的数据
window.addEventListener('message',(e) => {
  console.log(e.data);

  if(e.origin !== 'http://www.domain1.com') return;

  // 发送消息给domain1
  window.parent.postMessage('来自domain2的消息', e.origin);
  // 或 window.top.postMessage('来自domain2的消息', e.origin);
  // 或 e.source.postMessage('来自domain2的消息', e.origin);
}, false);


  // const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (
    <div>
      <iframe id="iframe" src="http://www.domain2.com/b.html"></iframe>
    </div>
  );

};
