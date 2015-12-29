import React from 'react'
import ProductTable from './ProductTable'
import Map from './Map'
import update from 'react-addons-update'
import $ from 'jquery'
import ProductOverview from './ProductOverview'

export default class Product extends React.Component {

  constructor (props) {
    super()
    this.getTablesConfig = this.getTablesConfig.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)

    this.state = {
      visibleMap: false
    }
  }

  componentDidMount () {
    $('.product-' + this.props.product.code + ' a.map-tab').on('shown.bs.tab', function (e) {
      this.setState(update(this.state, {visibleMap: {$set: true}}))
    }.bind(this))
  }

  getTablesConfig () {
    return [
      {direction: 'import', property: 'price', label: 'Import, cena v CZK'},
      {direction: 'import', property: 'count', label: 'Import, množství'},
      {direction: 'import', property: 'weight', label: 'Import, hmotnost'},
      {direction: 'export', property: 'price', label: 'Export, cena v CZK'},
      {direction: 'export', property: 'count', label: 'Export, množství'},
      {direction: 'export', property: 'weight', label: 'Export, hmotnost'}
    ]
  }

  render () {
    return (
      <div className={'product-' + this.props.product.code}>
        <a name={'product-' + this.props.product.code}/>
        <div className='panel panel-default' data-id={this.props.product.code}>
          <div className='panel-heading'><strong>{this.props.product.name}</strong></div>
          <div className='panel-body'>
          <ul className='nav nav-tabs' role='tablist'>
          <li role='presentation' className='active'>
               <a href={'#' + this.props.product.code + '-overview'} aria-controls={this.props.product.code + '-overview'} role='tab' data-toggle='tab'>Přehled</a>
          </li>
          <li role='presentation'>
             <a href={'#' + this.props.product.code + '-maps'} aria-controls={this.props.product.code + '-maps'} role='tab' data-toggle='tab' className='map-tab'>Mapy</a>
          </li>
            {this.getTablesConfig().map(config => {
              return <li role='presentation'>
                          <a href={'#' + this.props.product.code + '-' + config.direction + '-' + config.property} aria-controls={this.props.product.code + '-' + config.direction + '-' + config.property} role='tab' data-toggle='tab'>
                            {config.label}
                          </a>
                      </li>
            })}

          </ul>
            <div className='tab-content'>
              <div role='tabpanel' id={this.props.product.code + '-overview'} className='tab-pane active'>
               <ProductOverview product={this.props.product}/>
              </div>
               <div className='tab-pane' role='tabpanel' id={this.props.product.code + '-maps'}>
                 <Map product={this.props.product} visible={this.state.visibleMap}/>
               </div>
               {this.getTablesConfig().map(config => {
                 return <div className='tab-pane' role='tabpanel' id={this.props.product.code + '-' + config.direction + '-' + config.property}>
                          <ProductTable
                             product={this.props.product}
                             direction={config.direction}
                             property={config.property}
                             label={config.label}
                             criteria={this.props.criteria}
                              />
                         </div>
               })}
             </div>
          </div>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  product: React.PropTypes.object.isRequired,
  criteria: React.PropTypes.object.isRequired
}
