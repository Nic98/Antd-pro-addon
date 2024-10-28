import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {

  const currURL = window.location.href;
  const pageName = currURL.split('/').pop();
  const url = `http://localhost:5556/preview.html?scenarioName=${pageName}`;

  return (
    <div>
      <iframe
        id="iframe"
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{
          
        }}
      >
        
      </iframe>
    </div>
  );

};
