import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/extensions
import App from './components/App.jsx';

const ID = window.location.pathname.match(/\/(\d+)\//)[1];

ReactDOM.render(
  <App id={ID} />,
  document.getElementById('similarHomesCarousel'),
);
