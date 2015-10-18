import React from 'react';
import '../styles/main.less';
//import imgHello from './hello.gif';
//import imgIcon from './icon.png';
import $ from 'jquery';
import ProductTable from '../components/ProductTable';
import querystring from 'querystring';

export default class Stats extends React.Component {

 constructor() {
    super();
    this.state = {products:[]};
  }

  componentDidMount() {
    var query = querystring.stringify(this.props.location.query);
    $.get('/api/data?' + query, function(result) {
     this.setState({products: result.results});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h1>Stats</h1>
        <ProductTable products={this.state.products}/>
      </div>
    );
  }
}

