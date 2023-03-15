import * as React from "react";
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
          stepSize: 10,
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          callback: function (value, index, values) {
            let str = value.split("-", 3);
            let newData = str[1] + "-" + str[2];
            return newData;
          },
        },
      },
    ],
  },
  legend: {
    display: false,
    position: "bottom",
  },
};
const lineChart = {
  labels: ["", "", "", "", "", ""],
  datasets: [
    {
      label: "New",
      backgroundColor: "rgba(252, 203, 80, 0.7)",
      borderColor: "rgba(252, 203, 80, 1)",
      data: [],
    },
    {
      label: "InProgress",
      backgroundColor: "rgba(109, 219, 146, 0.7)",
      borderColor: "rgba(109, 219, 146, 1)",
      data: [],
    },
    {
      label: "Resolved",
      backgroundColor: "rgba(250, 125, 137, 0.7)",
      borderColor: "rgba(250, 125, 137, 1)",
      data: [],
    },
  ],
};

class AlertVolumeByStatusChart extends React.Component {
  chart;
  constructor(props) {
    super(props);
    this.state = {};
    this.chart = null;
  }

  componentDidMount() {
    if (this.chart) {
      this.setState({
        legends: this.chart.chartInstance.legend.legendItems,
      });
    }
    try {
      this.fetchData();
    } catch (err) {
      console.log("Alert Volume data by status failed. Error: ", err);
    }
  }
  fetchData = () => {
    fetch(`http://34.199.12.114:5055/api/getAlertVolumeByStatus`).then(
      (response) => {
        this.setState({
          datasets: [
            {
              label: "New",
              backgroundColor: "rgba(252, 203, 80, 0.7)",
              borderColor: "rgba(252, 203, 80, 1)",
              data: response.newAlertList,
            },
            {
              label: "InProgress",
              backgroundColor: "rgba(109, 219, 146, 0.7)",
              borderColor: "rgba(109, 219, 146, 1)",
              data: response.inProgressList,
            },
            {
              label: "Resolved",
              backgroundColor: "rgba(250, 125, 137, 0.7)",
              borderColor: "rgba(250, 125, 137, 1)",
              data: response.closedAlertList,
            },
          ],
          labels: response.daysList,
        });
        console.log("Total alert data :::::: ", response);
      }
    );
  };

  createLegend = () => {
    const text = [];
    const { legends } = this.state;
    if (legends && legends.length > 0) {
      for (var i = 0; i < legends.length; i++) {
        text.push(
          <li>
            <div className="chart-legend">
              <span
                className="legend-background"
                style={{ backgroundColor: legends[i].fillStyle }}
              ></span>
              <span className="legend-label">{legends[i].text}</span>
            </div>
          </li>
        );
      }
    }
    return text;
  };

  render() {
    return (
      <div
        className="row"
        style={{ width: "100%", height: "100%", marginLeft: "0px" }}
      >
        <Line
          ref={(ref) => (this.chart = ref)}
          data={lineChart}
          options={options}
        />
        <div className="legend-container">
          <ul className="custom-chart-legends">{this.createLegend()}</ul>
        </div>
      </div>
    );
  }
}

export default AlertVolumeByStatusChart;
