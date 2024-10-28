import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {

  handleLoad = () => {
    const iframe = document.getElementById('iframe');
    const currentUrl = iframe.contentWindow.location.href;
    console.log('Current URL:', currentUrl);
  };

  const url = `http://localhost:5556/preview.html?scenarioName=${pageName}`;

    return (
      <iframe
        id="iframe"
        src={url}
        width="100%"
        height="100%"
        frameBorder="0"
        onLoad={this.handleLoad}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    );

};
