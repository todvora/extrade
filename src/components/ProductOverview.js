import React from 'react'
import Chart from './Chart'

export default class ProductOverview extends React.Component {

  render () {
    return (
       <div>
        <Chart product={this.props.product} visible />
       </div>
    )
  }
}

ProductOverview.propTypes = {
  product: React.PropTypes.object.isRequired
}
