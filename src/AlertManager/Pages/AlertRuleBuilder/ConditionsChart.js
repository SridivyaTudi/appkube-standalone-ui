import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          stepSize: 0.5,
          beginAtZero: true,
        },
      },
    ],
  },
};

const lineChart = {
  labels: ["", "05:18", "05:20", "05:22", "05:24", "05:26", "05:28", ""],
  datasets: [],
};

class ConditionsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="chart-select-menu">
          <label>Send Data from</label>
          <div className="select-menu">
            <i className="fa fa-clock-o"></i>
            <select>
              <option value="Past 15m">Past 15m</option>
              <option value="Past 20m">Past 20m</option>
              <option value="Past 25m">Past 25m</option>
              <option value="Past 30m">Past 30m</option>
            </select>
          </div>
        </div>
        <div className="cq-query-text">
          <span>cq-queryOK</span>
        </div>
        <div className="line-chart">
          <Line data={lineChart} options={options} />
        </div>
      </div>
    );
  }
}

export default ConditionsChart;
