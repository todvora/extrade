import React from 'react';
import _ from 'lodash';

export default class ProductTable extends React.Component {


  constructor(props) {
    super(props);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.getRowValue = this.getRowValue.bind(this);
  }

  getAllCountries() {
    return _.uniq(this.props.product.intervals
      .map(interval => interval[this.props.direction])
      .reduce((acc, val) =>  acc.concat(val), []) // flatten
      .map(row => {
        return {country:row.country, countryName:row.countryName}
      }), 'country')
      .sort(function (a, b) {
         return a.country.localeCompare(b.country);
       });
  }

  getRowValue(countryCode, interval) {
    const value = this.props.product.intervals
      .filter(i => i.from == interval.from && i.till == interval.till)
      .map(i => i[this.props.direction])
      .reduce((acc, val) =>  acc.concat(val), []) // flatten
      .filter(row => row.country == countryCode)
      .map(row => row[this.props.property])
    return value.length > 0 ? value[0] : 0;
  }

  render() {
    return (
      <div>
        <h3>{this.props.direction}, {this.props.property}</h3>
        <table className="table table-condensed table-hover table-bordered">
          <thead>
            <tr>
             <th>Kód země</th>
             <th>Název země</th>
             {this.props.product.intervals.map(interval => {
                return <th>{interval.from}<br/>{interval.till}</th>
             })}
            </tr>
          </thead>
        <tbody>
          {this.getAllCountries().map(row => {
              return <tr key={row.country}>
                  <td>{row.country}</td>
                  <td>{row.countryName}</td>
                   {this.props.product.intervals.map(interval => {
                      return <td>{this.getRowValue(row.country, interval)}</td>
                   })}
                </tr>
          })}
        </tbody>
        </table>
      </div>
    );
  }
}

ProductTable.propTypes = {
  product: React.PropTypes.object.isRequired,
  direction: React.PropTypes.string.isRequired,
  property: React.PropTypes.string.isRequired
};