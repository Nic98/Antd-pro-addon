import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';

export default function DynamicComponentLoader() {
  goBack = ()=>{
		browserHistory.goBack();
	}
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
