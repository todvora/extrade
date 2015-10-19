import React from 'react';
import ProductTable from './ProductTable';

export default class Product extends React.Component {

  constructor(props) {
    super();
    this.getTablesConfig = this.getTablesConfig.bind(this);
  }

  getTablesConfig() {
    return [
      {direction:"import",property:"price", cssClass:"active"},
      {direction:"import",property:"count", cssClass:""},
      {direction:"import",property:"weight", cssClass:""},
      {direction:"export",property:"price", cssClass:""},
      {direction:"export",property:"count", cssClass:""},
      {direction:"export",property:"weight", cssClass:""},
    ]
  }

  render() {
    return (
      <div>
        <a name={'product-' + this.props.product.code}/>
        <div className="panel panel-default">
          <div className="panel-heading"><strong>{this.props.product.name}</strong></div>
          <div className="panel-body">
          <ul className="nav nav-tabs" role="tablist">
            {this.getTablesConfig().map(config => {
                return <li role="presentation" className={config.cssClass}>
                          <a href={'#' + this.props.product.code +'-' + config.direction +'-' + config.property} aria-controls={this.props.product.code +'-' + config.direction +'-' + config.property} role="tab" data-toggle="tab">
                            {config.direction}, {config.property}
                          </a>
                      </li>
            })}
          </ul>
            <div className="tab-content">
               {this.getTablesConfig().map(config => {
                  return <div className={'tab-pane ' + config.cssClass} role="tabpanel" id={this.props.product.code +'-' + config.direction +'-' + config.property}>
                          <ProductTable
                             product={this.props.product}
                             direction={config.direction}
                             property={config.property} />
                         </div>
               })}
             </div>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  product: React.PropTypes.object.isRequired
};