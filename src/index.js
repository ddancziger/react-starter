import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

const render = AppComponent => {
  ReactDOM.render(
    <AppComponent/>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => render(require('./app').App)); // eslint-disable-line global-require
}
