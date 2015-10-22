import React from 'react';
import chartjs from 'chart.js';
import BarChart from './ChartWithLegend'
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

    const safeInt = (input) => {const parsed = parseInt(input); return Number.isInteger(parsed) ? parsed : 0};

    const getSum = function(direction, property) {
      return self.props.product.intervals
            .map(interval => interval[direction])
            .map(rows => rows.reduce((acc, current) => acc + safeInt(current[property]), 0));
    }

    const labels = this.props.product.intervals.map(interval => `${interval.from} - ${interval.till}`);

    const importData = getSum('import', property);
    const exportData = getSum('export', property);

    const imports = {
      label: "Import",
      fillColor: "rgba(255,200,112,0.2)",
      strokeColor: "rgba(255,200,112,1)",
      pointColor: "rgba(255,200,112,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(255,200,112,1)",
      data: importData
    };
    const exports = {
      label: "Export",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: exportData
    };

    return {
      labels: labels,
      datasets: [imports, exports]
    };
  }

  render() {
    return (
      <div>
        <div>
          <div className="btn-group" role="group" style={{clear:'both', margin:'20px 0'}}>
            <a className={"btn btn-default " + (this.state.property == 'price' ? 'btn-primary' : '')} href="#" onClick={this.selectProperty.bind(this, 'price')}>Cena</a>
            <a className={"btn btn-default " + (this.state.property == 'count' ? 'btn-primary' : '')} href="#" onClick={this.selectProperty.bind(this, 'count')}>Množství</a>
            <a className={"btn btn-default " + (this.state.property == 'weight' ? 'btn-primary' : '')} href="#" onClick={this.selectProperty.bind(this, 'weight')}>Hmotnost</a>
          </div>
        </div>

        <div>
          { this.props.visible &&
            <div>
              <BarChart data={this.getData()} width="1000" height="300" />
            </div>
            }
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  product: React.PropTypes.object.isRequired,
  visible: React.PropTypes.bool.isRequired
};