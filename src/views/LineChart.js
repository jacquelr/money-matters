import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

class LineChart extends Component {
 constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['2021-01-01', '2021-01-02', '2021-01-03', '2021-01-04', '2021-01-05'],
        datasets: [
          {
            label: 'Serie 1',
            data: [10, 20, 30, 20, 10],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      },
    };
 }

 render() {
    return (
      <div className="container">
        <h2>Gráfica de Línea</h2>
        <Line data={this.state.chartData} options={{}} />
      </div>
    );
 }
}

export default LineChart;