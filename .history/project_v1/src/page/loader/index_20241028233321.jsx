import React from 'react';
// import { Route, Switch, useLocation } from 'react-router-dom';
import _ from 'lodash';
export default function DynamicComponentLoader() {
  const getScenarioName = function () {
    if (location.search) {
      return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'general';
    }
    return 'general';
  };
  const url = `http://localhost:5556/preview.html?scenarioName=${item.pageName}`;

  return (

  );

};
