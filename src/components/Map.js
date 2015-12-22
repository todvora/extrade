import React from 'react'
import update from 'react-addons-update'

import LeafletMap from './LeafletMap'
import PropertySelector from './PropertySelector'
import _ from 'lodash'

import LeafletCountryPopup from './LeafletCountryPopup'

export default class Map extends React.Component {

  constructor (props) {
    super()

    this.state = {
      direction: 'import'
    }

    this.directions = [
      {name: 'import', label: 'Import'},
      {name: 'export', label: 'Export'}
    ]

    this.selectDirection = this.selectDirection.bind(this)
    this.infoboxRenderer = this.infoboxRenderer.bind(this)

    this.getAllCountries = this.getAllCountries.bind(this)
    this.getVisibleCountries = this.getVisibleCountries.bind(this)
  }

  selectDirection (direction, event) {
    event.preventDefault()
    this.setState(update(this.state, {direction: {$set: direction}}))
  }

  infoboxRenderer (feature, event) {
    return React.renderToStaticMarkup(
      <LeafletCountryPopup countryCode={feature.properties.iso_a2} product={this.props.product} direction={this.state.direction} />
    )
  }

  getAllCountries () {
    const result = _.uniq(this.props.product.intervals
        .map(interval => interval[this.state.direction])
        .reduce((acc, val) => acc.concat(val), []) // flatten
        .map(row => {
          return {country: row.country, countryName: row.countryName}
        }), 'country')
    console.log(result)
    return result
  }

  getVisibleCountries () {
    return this.getAllCountries().map(country => country.country)
  }

  render () {
    return (
       <div>
        {this.props.visible &&
         <div>
           <PropertySelector defaultProperty={this.state.direction} onChange={this.selectDirection} availableProperties={this.directions} />
           <LeafletMap countries={this.getVisibleCountries()} infoboxRenderer={this.infoboxRenderer} />
         </div>
         }
     </div>
     )
  }
}

Map.propTypes = {
  product: React.PropTypes.object.isRequired,
  visible: React.PropTypes.bool.isRequired
}
