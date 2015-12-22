import React from 'react'
import _ from 'lodash'
import properties from 'resources/properties.json'
import units from 'resources/units.json'

import '../styles/LeafletCountryPopup.less'

export default class LeafletCountryPopup extends React.Component {

  constructor (props) {
    super()
    this.getData = this.getData.bind(this)
    this.getCountryName = this.getCountryName.bind(this)
  }

  getCountryName () {
    const self = this
    var result = this.props.product.intervals
      .map(interval => interval[self.props.direction])
      .reduce((acc, val) => acc.concat(val), []) // flatten
      .filter(row => row.country === self.props.countryCode)
    return result[0].countryName
  };

  getData () {
    const self = this
    return this.props.product.intervals
      .map(interval => {
        const period = interval.period
        var rows = interval[self.props.direction]
        var filtered = rows.filter(row => row.country === self.props.countryCode)
        var result = {
          period: period
        }
        return _.assign(result, filtered[0] || {})
      })
  }

  render () {
    return (
      <div>
        <table className='table table-condensed table-hover table-bordered'>
           <thead>
              <tr>
               <th className='countryName'>{this.getCountryName()}</th>
               {this.getData().map(interval => {
                 return <th>{interval.period}</th>
               })}
              </tr>
           </thead>
          <tbody>
            {properties.map(property => {
              return (<tr>
                <td>{property.labelPattern.replace('{units}', this.props.product.unit)}</td>
                {this.getData().map(interval => {
                  return <td>{interval[property.name] || 0}</td>
                })}
              </tr>)
            })}
          </tbody>
        </table>
        <small>{this.props.product.unit} = {units[this.props.product.unit]}</small>
      </div>
    )
  }
}

LeafletCountryPopup.propTypes = {
  countryCode: React.PropTypes.string.isRequired,
  product: React.PropTypes.object.isRequired,
  direction: React.PropTypes.string.isRequired
}
