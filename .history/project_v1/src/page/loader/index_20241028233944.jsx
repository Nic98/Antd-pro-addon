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

作者：定栓
链接：https://juejin.cn/post/7038807108011163661
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

  // const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (
    <div>
      <iframe id="iframe" src="http://www.domain2.com/b.html"></iframe>
    </div>
  );

};
