import React from 'react';
import { Router, Route} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

// app pages
import Stats from './routes/stats';
import About from './routes/about';
import Contact from './routes/contact';
import Homepage from './routes/homepage';

// layout
import Layout from './Layout';

// webpack dependencies, that will be included in html
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const history = createBrowserHistory();

React.render((
  <Router history={history}>
    <Route path="/" component={Layout}>
      <Route path="/app" component={Homepage} history={history}/>
      <Route path="/app/about" component={About} />
      <Route path="/app/stats" component={Stats} />
      <Route path="/app/contact" component={Contact} />
    </Route>
  </Router>
), document.getElementById('app-root'));
