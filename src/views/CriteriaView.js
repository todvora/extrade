import React from 'react'
import { connect } from 'react-redux'
import { actions as criteriaActions } from '../redux/modules/criteria'
import $ from 'jquery'
import moment from 'moment'
import DateInterval from 'components/DateInterval'
import GroupBySelect from 'components/GroupBySelect'
import SuggestBox from 'components/SuggestBox'
import DateUtils from 'utils/DateUtils'
import querystring from 'querystring'

const mapStateToProps = (state) => ({
  criteria: state.criteria
})
export class CriteriaView extends React.Component {
  static propTypes = {
    criteria: React.PropTypes.object.isRequired,
    setInterval: React.PropTypes.func.isRequired,
    setMaxDate: React.PropTypes.func.isRequired,
    setGroupBy: React.PropTypes.func.isRequired,
    addProduct: React.PropTypes.func.isRequired,
    removeProduct: React.PropTypes.func.isRequired,
    addCountry: React.PropTypes.func.isRequired,
    removeCountry: React.PropTypes.func.isRequired,
    history: React.PropTypes.object.isRequired
  }

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    var that = this
    $.get('/api/last-date', function (lastDate) {
      var lastTill = moment({year: lastDate.year, month: lastDate.month - 1}) // months are zero-based
      var lastFrom = lastTill.clone().subtract().subtract(11, 'months').subtract(9, 'years')
      that.props.setMaxDate(lastDate)
      that.props.setInterval({from: {month: lastFrom.month() + 1, year: lastFrom.year()}, till: {month: lastDate.month, year: lastDate.year}})
    })
    $.get('/api/products-preload', result => console.log(result))
  }

  getProductSuggestions (input, callback) {
    $.get('/api/products?q=' + input, function (result) {
      callback(null, result)
    })
  }

  getCountrySuggestions (input, callback) {
    $.get('/api/countries?q=' + input, function (result) {
      callback(null, result)
    })
  }

  handleSubmit () {
    var query = querystring.stringify({
      product: this.props.criteria.selectedProducts.map(product => product.code),
      country: this.props.criteria.selectedCountries.map(country => country.code).filter(code => code !== 'ALL_COUNTRIES'),
      interval: DateUtils.encodeInterval(this.props.criteria.interval),
      groupBy: this.props.criteria.groupBy
    })
    this.props.history.replaceState(null, '/stats?' + query)
  }

  render () {
    return (
      <div className='container'>
        <h1>Statistiky zahraničního obchodu</h1>
        <h3>Interval</h3>
        {this.props.criteria.interval && <DateInterval interval={this.props.criteria.interval} maxDate={this.props.criteria.maxDate} onChange={this.props.setInterval}/>}
        <br/>
        <GroupBySelect value={this.props.criteria.groupBy} onChange={this.props.setGroupBy} />
        <h3>Produkty</h3>
        <SuggestBox selectedValues={this.props.criteria.selectedProducts}
                            onSelected={this.props.addProduct}
                            onDeselected={this.props.removeProduct}
                            getSuggestions={this.getProductSuggestions}
        />
        <h3>Země</h3>
        <SuggestBox selectedValues={this.props.criteria.selectedCountries}
                   onSelected={this.props.addCountry}
                   onDeselected={this.props.removeCountry}
                   getSuggestions={this.getCountrySuggestions}
        />
       <br />
       <button className='btn btn-primary btn-lg' onClick={this.handleSubmit}>
         Zobrazit statistiky
       </button>
      </div>
    )
  }
}

export default connect(mapStateToProps, criteriaActions)(CriteriaView)
