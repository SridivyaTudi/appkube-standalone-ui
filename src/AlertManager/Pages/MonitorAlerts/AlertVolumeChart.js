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
import Services from "../../../Services";

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
            if (value) {
              let str = value.split("-", 3);
              let newData = str[1] + "-" + str[2];
              return newData;
            }
            return null;
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
      lineTension: 0.1,
      fill: false,
      borderColor: "rgba(252, 203, 80, 1)",
      data: [],
    },
    {
      label: "Resolved 75",
      lineTension: 0.1,
      fill: false,
      borderColor: "rgba(73, 183, 234, 1)",
      data: [],
    },
  ],
};

class AlertVolumeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legends: [],
    };
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
      console.log("Alert Volume data load failed. Error: ", err);
    }
  }

  fetchData = () => {
    fetch(Services.getAlertVolumeData).then((response) => {
      this.setState({
        datasets: [
          {
            label: "New",
            lineTension: 0.1,
            fill: false,
            borderColor: "rgba(252, 203, 80, 1)",
            data: response.newAlertList,
          },
          {
            label: "Resolved",
            lineTension: 0.1,
            fill: false,
            borderColor: "rgba(73, 183, 234, 1)",
            data: response.closedAlertList,
          },
        ],
        labels: response.daysList,
      });
      console.log("Total alert data :::::: ", response);
    });
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

export default AlertVolumeChart;
