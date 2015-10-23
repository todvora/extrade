import React from 'react';
import DateSelector from './DateSelector';
import moment from 'moment';

export default class DateInterval extends React.Component {

 constructor() {
    super();
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateTillChange = this.onDateTillChange.bind(this);
    this.getIntervalLength = this.getIntervalLength.bind(this);
 }

 onDateFromChange(newDate) {
    this.props.interval.from = newDate;
    this.props.onChange(this.props.interval);
 }

 onDateTillChange(newDate) {
    this.props.interval.till = newDate;
    this.props.onChange(this.props.interval);
 }

  getIntervalLength() {
    moment.locale('cs');
    var start = moment([parseInt(this.props.interval.from.year), parseInt(this.props.interval.from.month) -1, 0]);
    var end = moment([parseInt(this.props.interval.till.year), parseInt(this.props.interval.till.month) - 1, 1]).endOf('month');
    return end.from(start, true);
  }

 render() {
    return (
      <div>
        Od: <DateSelector currentDate={this.props.interval.from} maxDate={this.props.maxDate} onChange={this.onDateFromChange}/>
        Do: <DateSelector currentDate={this.props.interval.till} maxDate={this.props.maxDate} onChange={this.onDateTillChange}/>
        <small>
          &nbsp;(&nbsp;=&nbsp;{this.getIntervalLength()})
        </small>
      </div>
    );
  }
}

DateInterval.propTypes = {
  interval: React.PropTypes.object.isRequired,
  maxDate: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};