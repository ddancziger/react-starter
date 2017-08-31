// @flow
import React from 'react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Header } from './components/Header';
import { Routes } from './components/Routes';
import store from './store';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store.routes);

const App = () => (
  <Provider { ...store }>
    <Router history={ history }>
      <div>
        <Header/>
        <Routes/>
      </div>
    </Router>
  </Provider>
);

export default App;
