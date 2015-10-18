import React from 'react';
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './app';

import Stats from './routes/stats';
import Criteria from './routes/criteria';
import About from './routes/about';

const reactHtmlEl = document.getElementById('app-root');
const history = createBrowserHistory();

React.render((
  <Router history={history}>
    <Route path="/app" component={App} history={history}/>
    <Route path="/app/about" component={About} />
    <Route path="/app/stats" component={Stats} />
  </Router>
), reactHtmlEl);
