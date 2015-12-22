import React from 'react'

export default class ProductNavigation extends React.Component {

  render () {
    return (
       <div className='row'>
          <div className='col-md-8'>
             <div className='list-group'>
                {this.props.products.map(product => {
                  return <a className='btn btn-default list-group-item' href={'#product-' + product.code}>{product.name}</a>
                })}
             </div>
          </div>
       </div>
    )
  }
}

ProductNavigation.propTypes = {
  products: React.PropTypes.array.isRequired
}
