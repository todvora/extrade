import React from 'react'
import '../styles/PropertySelector.less'

export default class PropertySelector extends React.Component {

 constructor (props) {
   super()
   this.getAdditionalCssClass = this.getAdditionalCssClass.bind(this)
 }

 getAdditionalCssClass (propertyName) {
   if (this.props.defaultProperty === propertyName) {
     return 'btn-primary'
   } else {
     return ''
   }
 }

  render () {
    return (
        <div className='property-selector'>
        <div className='btn-group' role='group' style={{clear: 'both', margin: '20px 0'}}>
          {this.props.availableProperties.map(property =>
            <a className={'btn btn-default ' + this.getAdditionalCssClass(property.name)} href='#' onClick={this.props.onChange.bind(this, property.name)}>{property.label}</a>
          )}
        </div>
      </div>
    )
  }
}

PropertySelector.propTypes = {
  availableProperties: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  defaultProperty: React.PropTypes.string.isRequired
}
