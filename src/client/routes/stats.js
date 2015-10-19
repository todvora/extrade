import React from 'react';
import '../styles/main.less';
//import imgHello from './hello.gif';
//import imgIcon from './icon.png';
import $ from 'jquery';
import Product from '../components/Product';
import ProductNavigation from '../components/ProductNavigation';
import querystring from 'querystring';

export default class Stats extends React.Component {

 constructor() {
    super();
    this.state = {products:[]};
  }

  componentDidMount() {
    var query = querystring.stringify(this.props.location.query);
    $.get('/api/data?' + query, function(result) {
      console.log(result);
     this.setState({products: result});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <ProductNavigation products={this.state.products} />
        <div className="products">
          {this.state.products.map(product => {
            return <Product product={product}/>
          })}
        </div>
      </div>
    );
  }
}

