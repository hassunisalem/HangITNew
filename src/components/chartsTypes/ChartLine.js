import React, { Component } from "react";

import { Line } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    legendPosition: "right",
    location: "City"
  };

  render() {
    return (
      <div className="chart">
        <Line
          data={this.props.data}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Antal Gæster",
              fontSize: 15
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            layout: {
              padding: {
                left: 0,
                right: 200,
                top: 10,
                bottom: 0
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
