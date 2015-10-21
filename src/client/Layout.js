import React from 'react';
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import SearchForm from './components/SearchForm';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';



export default class Layout extends React.Component {

 constructor(props, context) {
     super(props, context);
     this.context = context;
 }

  render() {
    return (
      <div>
          <div className="navbar navbar-default navbar-static-top" role="navigation">
              <div className="container">
                <div className="navbar-header">
                  <button className="navbar-toggle" type='button' data-toggle='collapse' data-target='.navbar-collapse'/>
                    <span className="span sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <Link className="navbar-brand" to='/app'>Statistiky zahraničního obchodu</Link>
                </div>
                <div className="navbar-collapse collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to='/app'>Úvod</Link></li>
                    <li><Link to='/app/about'>O aplikaci</Link></li>
                    <li><Link to='/app/contact'>Kontakt</Link></li>
                  </ul>
                </div>
              </div>
          </div>
          <div className="container">
            {this.props.children}
          </div>
        </div>
    );
  }
}
