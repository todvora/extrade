import React from 'react'
import _ from 'lodash'
import '../styles/ProductTable.less'
import VerifyLink from 'components/VerifyLink'

export default class ProductTable extends React.Component {

  constructor (props) {
    super(props)
    this.getAllCountries = this.getAllCountries.bind(this)
    this.getRowValue = this.getRowValue.bind(this)
  }

  getAllCountries () {
    return _.uniq(this.props.product.intervals
      .map(interval => interval[this.props.direction])
      .reduce((acc, val) => acc.concat(val), []) // flatten
      .map(row => {
        return {country: row.country, countryName: row.countryName}
      }), 'country')
      .sort(function (a, b) {
        return a.country.localeCompare(b.country)
      })
  }

  getRowValue (countryCode, interval, direction) {
    const value = this.props.product.intervals
      .filter(i => i.period === interval)
      .map(i => i[direction])
      .reduce((acc, val) => acc.concat(val), []) // flatten
      .filter(row => row.country === countryCode)
      .map(row => row[this.props.property])
    const result = value.length > 0 ? value[0] : 0
    return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0')
  }

  render () {
    return (
      <div className='product-table'>
        <h3>{this.props.label}</h3>
        <table className='table table-condensed table-hover table-bordered'>
          <thead>
            <tr>
             <th>Kód země</th>
             <th>Název země</th>
             {this.props.product.intervals.map(interval => {
               return <th className='value'>{interval.period}</th>
             })}
            </tr>
          </thead>
        <tbody>
          {this.getAllCountries().map(row => {
            return <tr key={row.country}>
                  <td>{row.country}</td>
                  <td>{row.countryName}</td>
                   {this.props.product.intervals.map(interval => {
                     return <td className='value'>{this.getRowValue(row.country, interval.period, this.props.direction)}</td>
                   })}
                </tr>
          })}
        </tbody>
        </table>
        <div className='verify-link'>
          <VerifyLink product={this.props.product} direction={this.props.direction} criteria={this.props.criteria} />
        </div>
      </div>
    )
  }
}

ProductTable.propTypes = {
  product: React.PropTypes.object.isRequired,
  direction: React.PropTypes.string.isRequired,
  property: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  criteria: React.PropTypes.object.isRequired
}
