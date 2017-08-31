// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from '../../Pages/HomePage';

const Routes = () => (
  <div>
    <Route exact path="/" component={ HomePage }/>
    <Route path="/about" render={ () => <div> About </div> }/>
  </div>
);

export default Routes;
