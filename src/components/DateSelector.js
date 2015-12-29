import React, {findDOMNode} from 'react'

export default class DateSelector extends React.Component {

  constructor (props) {
    super(props)
    this.months = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']
    this.years = []
    for (var i = 1999; i <= props.maxDate.year; i++) {
      this.years.push(i)
    }
    this.onDateChange = this.onDateChange.bind(this)
  }

 onDateChange (event) {
   this.props.onChange({
     month: findDOMNode(this.refs.month).value,
     year: findDOMNode(this.refs.year).value
   })
 }

 render () {
   return (
      <span>
          <select className='form-control' onChange={this.onDateChange} onKeyUp={this.onDateChange} ref='month' value={parseInt(this.props.currentDate.month, 10)}>
             {this.months.map((month, index) => {
               return <option key={month} value={index + 1}>{month}</option>
             }, this)}
          </select>
          <select className='form-control' onChange={this.onDateChange} onKeyUp={this.onDateChange} ref='year' value={this.props.currentDate.year}>
          {this.years.map(year => {
            return <option key={year} value={year}>{year}</option>
          }, this)}
          </select>
      </span>
    )
 }
}

DateSelector.propTypes = {
  currentDate: React.PropTypes.object.isRequired,
  maxDate: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
}
