import React from 'react'

import Product from 'components/Product'
import ProductNavigation from 'components/ProductNavigation'
import { connect } from 'react-redux'
import { actions as apiActions } from '../redux/modules/api'

const mapStateToProps = (state) => ({
  progress: state.api.progress,
  products: state.api.products,
  error: state.api.error,
  criteria: state.criteria
})

export class StatsView extends React.Component {

  static propTypes = {
    progress: React.PropTypes.object.isRequired,
    products: React.PropTypes.array.isRequired,
    error: React.PropTypes.string,
    readDataAsync: React.PropTypes.func.isRequired,
    criteria: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.readDataAsync()
  }

  render () {
    return (
      <div className='container'>
        {this.props.error && <div className='alert alert-danger' role='alert'>{this.props.error}</div>}

        {!this.props.progress.finished &&
          <div>
            <p>Probíhá načítání dat z webu Českého statistického úřadu. Chvíli to potrvá.</p>
            <div className='progress'>
              <div className='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style={{width: this.props.progress.percents + '%', minWidth: '5em'}}>
                {this.props.progress.percents + '%'}
              </div>
            </div>
          </div>
        }
        <ProductNavigation products={this.props.products} />
        <div className='products'>
          {this.props.products.map(product => {
            return <Product product={product} criteria={this.props.criteria}/>
          })}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, apiActions)(StatsView)
