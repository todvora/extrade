import React from 'react';
import './styles/main.less';
//import imgHello from './hello.gif';
//import imgIcon from './icon.png';
import $ from 'jquery';
import SearchForm from './components/SearchForm';

import { Router, Route, Link } from 'react-router'

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <SearchForm history={this.props.route.history}/>
      </div>
    );
  }
}

