import React from 'react';
var Chart = require("react-chartjs").Line;
import '../styles/ChartWithLegend.less';

export default class ChartWithLegend extends React.Component {

 constructor(props) {
    super();
    this.state = {legend:''};
  }

  componentDidMount() {
    var legend = this.refs.chart.getChart().generateLegend();
    this.setState({
      legend: legend
    });
  }

  render() {
    return (
      <div>
        <Chart ref="chart" {...this.props} options={{multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>"}}/>
        <div className="legend" dangerouslySetInnerHTML={{ __html: this.state.legend  }} />
      </div>
    );
  }
}