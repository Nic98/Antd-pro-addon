import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';

const DynamicComponentLoader = () => {


  const iframe = document.getElementById('iframe');
  React.useEffect(() => {

  })



  const url = `http://localhost:5556/preview.html?scenarioName=general`;

  return (
    <iframe
      id="iframe"
      src={url}
      width="100%"
      height="100%"
      frameBorder="0"
      // onLoad={handleLoad}
      style={{
        width: '100%',
        height: '100%',
        border: 'none'
      }}
    />
  );
};

export default DynamicComponentLoader;