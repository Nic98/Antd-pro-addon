import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {

  var iframe = document.getElementById('iframe');
 
  iframe.onload = function() {
     // 向domain2发送跨域数据
     iframe.contentWindow.postMessage('来自domain1的消息', 'http://www.domain2.com');
     //或  window.frames[0].postMessage('来自domain1的消息', 'http://www.domain2.com');
  };
   
  // 接受domain2返回数据
  window.addEventListener('message',(e) => {
      console.log(e.data);
  }, false);
  
  作者：定栓
  链接：https://juejin.cn/post/7038807108011163661
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

  // const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (
    <div>
      你好啊 fufu
    </div>
  );

};
