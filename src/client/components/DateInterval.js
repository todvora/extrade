import React from 'react';
import DateSelector from './DateSelector';

export default class DateInterval extends React.Component {

 constructor() {
    super();
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateTillChange = this.onDateTillChange.bind(this);
 }

 onDateFromChange(newDate) {
    this.props.interval.from = newDate;
    this.props.onChange(this.props.index, this.props.interval);
 }

 onDateTillChange(newDate) {
    this.props.interval.till = newDate;
    this.props.onChange(this.props.index, this.props.interval);
 }


 render() {
    return (
      <div>
        Od: <DateSelector currentDate={this.props.interval.from} maxDate={this.props.maxDate} onChange={this.onDateFromChange}/> Do: <DateSelector currentDate={this.props.interval.till} maxDate={this.props.maxDate} onChange={this.onDateTillChange}/>
      </div>
    );
  }
}

DateInterval.propTypes = {
  interval: React.PropTypes.object.isRequired,
  maxDate: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
};