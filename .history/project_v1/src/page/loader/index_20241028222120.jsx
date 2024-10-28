import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
const browserHistory = createBrowserHistory();
import createBrowserHistory from 'history/es/createBrowserHistory'

export default function DynamicComponentLoader() {

  return (
    <div>
      <div style={{ color: 'red' }}>
      <p>你好啊</p>
      </div>
      <div style={{ color: 'red' }}>
      <p>你好啊</p>
      </div>
      <div style={{ color: 'red' }}>
      <p>你好啊</p>
      </div>
      <div style={{ color: 'red' }}>
      <p>你好啊</p>
      </div>
          <div style={{ color: 'red' }}>
      <p>你好啊</p>
    </div>
    </div>

  );

};
