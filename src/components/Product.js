import React from 'react'
import ProductTable from './ProductTable'
import Chart from './Chart'
import Map from './Map'
import update from 'react-addons-update'
import $ from 'jquery'

export default class Product extends React.Component {

  constructor (props) {
    super()
    this.getTablesConfig = this.getTablesConfig.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)

    this.state = {
      visibleChart: false,
      visibleMap: false
    }
  }

  componentDidMount () {
    $('.product-' + this.props.product.code + ' a.chart-tab').on('shown.bs.tab', function (e) {
      this.setState(update(this.state, {visibleChart: {$set: true}}))
    }.bind(this))
    $('.product-' + this.props.product.code + ' a.map-tab').on('shown.bs.tab', function (e) {
      this.setState(update(this.state, {visibleMap: {$set: true}}))
    }.bind(this))
  }

  getTablesConfig () {
    return [
      {direction: 'import', property: 'price', label: 'Import, cena v CZK', cssClass: 'active'},
      {direction: 'import', property: 'count', label: 'Import, množství', cssClass: ''},
      {direction: 'import', property: 'weight', label: 'Import, hmotnost', cssClass: ''},
      {direction: 'export', property: 'price', label: 'Export, cena v CZK', cssClass: ''},
      {direction: 'export', property: 'count', label: 'Export, množství', cssClass: ''},
      {direction: 'export', property: 'weight', label: 'Export, hmotnost', cssClass: ''}
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
            {this.getTablesConfig().map(config => {
              return <li role='presentation' className={config.cssClass}>
                          <a href={'#' + this.props.product.code + '-' + config.direction + '-' + config.property} aria-controls={this.props.product.code + '-' + config.direction + '-' + config.property} role='tab' data-toggle='tab'>
                            {config.label}
                          </a>
                      </li>
            })}
             <li role='presentation'>
                  <a href={'#' + this.props.product.code + '-charts'} aria-controls={this.props.product.code + '-charts'} role='tab' data-toggle='tab' className='chart-tab'>Grafy</a>
             </li>
              <li role='presentation'>
                 <a href={'#' + this.props.product.code + '-maps'} aria-controls={this.props.product.code + '-maps'} role='tab' data-toggle='tab' className='map-tab'>Mapy</a>
              </li>
          </ul>
            <div className='tab-content'>
               {this.getTablesConfig().map(config => {
                 return <div className={'tab-pane ' + config.cssClass} role='tabpanel' id={this.props.product.code + '-' + config.direction + '-' + config.property}>
                          <ProductTable
                             product={this.props.product}
                             direction={config.direction}
                             property={config.property}
                             label={config.label}
                              />
                         </div>
               })}
               <div className='tab-pane' role='tabpanel' id={this.props.product.code + '-charts'}>
                 <Chart product={this.props.product} visible={this.state.visibleChart}/>
               </div>
               <div className='tab-pane' role='tabpanel' id={this.props.product.code + '-maps'}>
                 <Map product={this.props.product} visible={this.state.visibleMap}/>
               </div>
             </div>
          </div>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  product: React.PropTypes.object.isRequired
}
