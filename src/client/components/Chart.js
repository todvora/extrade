import React from 'react';
import chartjs from 'chart.js';
var BarChart = require("react-chartjs").Bar;
import update from 'react-addons-update';

export default class Chart extends React.Component {

  constructor(props) {
    super();

    this.state = {
      property: 'price'
    }

    this.getData = this.getData.bind(this);
    this.selectProperty = this.selectProperty.bind(this);
  }

  selectProperty(property, event) {
    event.preventDefault();
    this.setState(update(this.state, {property:{$set: property}}));
  }

  getData() {

    const self = this;

    const property = this.state.property;

    const getSum = function(direction, property) {
      return self.props.product.intervals
            .map(interval => interval[direction])
            .map(rows => rows.reduce((acc, current) => acc + parseInt(current[property]), 0));
    }

    const labels = this.props.product.intervals.map(interval => `${interval.from} - ${interval.till}`);

    const imports = {
      label: "Import",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: getSum('import', property)
    };
    const exports = {
      label: "Export",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: getSum('export', property)

    };

    return {
      labels: labels,
      datasets: [imports, exports]
    };
  }

  render() {
    return (
      <div>

        <div className="btn-group" role="group" style={{clear:'both', margin:'20px 0'}}>
          <a className={"btn btn-default " + (this.state.property == 'price' ? 'btn-primary' : '')} href="#" onClick={this.selectProperty.bind(this, 'price')}>Cena</a>
          <a className={"btn btn-default " + (this.state.property == 'count' ? 'btn-primary' : '')} href="#" onClick={this.selectProperty.bind(this, 'count')}>Množství</a>
          <a className={"btn btn-default " + (this.state.property == 'weight' ? 'btn-primary' : '')} href="#" onClick={this.selectProperty.bind(this, 'weight')}>Hmotnost</a>
        </div>

        <div>
          {this.props.visible && <BarChart data={this.getData()} options={{}} width="600" height="250"/>}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  product: React.PropTypes.object.isRequired,
  visible: React.PropTypes.bool.isRequired
};