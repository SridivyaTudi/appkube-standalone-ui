import React, { Component } from "react";
import { Box, Grid, List, ListItem } from "@mui/material";
import UserIcon from "assets/img/dashboard/user-icon.png";
import KingIcon from "assets/img/dashboard/kingicon.png";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import status from "redux/constants/commonDS";
import { ToastMessage } from "Toast/ToastMessage";
import { v4 } from "uuid";
import { cloudwiseSpendColor } from "utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(annotationPlugin);

let labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COMMON_STYLE_LINE_DIAGRAM = {
  pointBorderWidth: 0,
  lineTension: 0.5,
  fill: false,
};
class SpendAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyCloudWiseData: { labels: [], datasets: [] },
      monthlyCloudWiseOptions: {
        type: "line",
        plugins: {
          legend: {
            position: "bottom",
            onClick: null,
            labels: {
              usePointStyle: true,
              boxHeight: 5,
              boxWidth: 50,
              pointStyle: "circle",
              fontColor: "#383874",
              padding: 30,
              font: {
                size: 12,
              },
            },
          },
          title: {
            display: true,
            text: "Cloud Wise Spend",
            align: "start",
            padding: {
              bottom: 25,
            },
            font: {
              size: "14",
              family: '"Poppins", sans-serif',
              weight: "500",
            },
            color: "#383874",
          },
          annotation: {
            annotations: {
              box1: {
                drawTime: "beforeDatasetsDraw",
                type: "box",
                xMin: 0,
                xMax: 1,
                backgroundColor: "rgba(244, 245, 251, 1)",
                borderColor: "transparent",
              },
              box2: {
                drawTime: "beforeDatasetsDraw",
                type: "box",
                xMin: 2,
                xMax: 3,
                backgroundColor: "rgba(244, 245, 251, 1)",
                borderColor: "transparent",
              },
              box3: {
                drawTime: "beforeDatasetsDraw",
                type: "box",
                xMin: 4,
                xMax: 5,
                backgroundColor: "rgba(244, 245, 251, 1)",
                borderColor: "transparent",
              },
              box4: {
                drawTime: "beforeDatasetsDraw",
                type: "box",
                xMin: 6,
                xMax: 7,
                backgroundColor: "rgba(244, 245, 251, 1)",
                borderColor: "transparent",
              },
              box5: {
                drawTime: "beforeDatasetsDraw",
                type: "box",
                xMin: 8,
                xMax: 9,
                backgroundColor: "rgba(244, 245, 251, 1)",
                borderColor: "transparent",
              },
              box6: {
                drawTime: "beforeDatasetsDraw",
                type: "box",
                xMin: 10,
                xMax: 11,
                backgroundColor: "rgba(244, 245, 251, 1)",
                borderColor: "transparent",
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: true,
            },
            ticks: {
              color: "#9797b6",
              family: '"Poppins", sans-serif',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              callback: (value) => {
                if (value % 200 === 0) {
                  return `$${value}`;
                }
              },
              color: "#9797b6",
              family: '"Poppins", sans-serif',
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0,
          },
        },
      },
    };
  }

  componentDidMount = () => {
    if (this.props.monthlyCloudWiseSpend.data) {
      this.lineDiagramDataPrepare();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.monthlyCloudWiseSpend.status !==
      this.props.monthlyCloudWiseSpend.status
    ) {
      if (this.props.monthlyCloudWiseSpend.status === status.SUCCESS) {
        this.lineDiagramDataPrepare();
      } else if (this.props.monthlyCloudWiseSpend.status === status.FAILURE) {
        ToastMessage.error("There is some issue.");
      }
    }
  }

  /** Calculate the current hour spend rate. */
  currentHourSpendRate = () => {
    const { currentHourSpendRate } = this.props;
    const spendRateData = currentHourSpendRate.data;
    if (spendRateData >= 0) {
      return <strong>${spendRateData}</strong>;
    }
  };

  /** Render the current hour spend rate. */
  renderCurrentHourSpendRateHtml = () => {
    let currentHourSpendRateStatus = this.props.currentHourSpendRate.status;

    return currentHourSpendRateStatus === status.IN_PROGRESS ? (
      <Box className="spend-contant">
        <i className="fa-solid fa-spinner fa-spin" /> Loading...
      </Box>
    ) : (
      <Box className="spend-contant">
        <label>Per Hour</label>
        <Box className="spend-price">{this.currentHourSpendRate()}</Box>
      </Box>
    );
  };

  /** Calculate the current day spend rate. */
  getCurrentDaySpendRate = () => {
    const { currentDaySpendRate } = this.props;
    const daySpendRateData = currentDaySpendRate.data;
    if (daySpendRateData >= 0) return <strong>${daySpendRateData}</strong>;
  };

  /** Render the current day spend rate. */
  renderCurrentDaySpendRateHtml = () => {
    let currentDaySpendRateStatus = this.props.currentDaySpendRate.status;
    return currentDaySpendRateStatus === status.IN_PROGRESS ? (
      <Box className="spend-contant">
        <i className="fa-solid fa-spinner fa-spin" /> Loading...
      </Box>
    ) : (
      <Box className="spend-contant">
        <label>Per Day</label>
        <Box className="spend-price">{this.getCurrentDaySpendRate()}</Box>
      </Box>
    );
  };

  /** Calculate the today spend analytics. */
  getTodaySpendAnalytics = () => {
    const { todaySpendAnalytics } = this.props;
    const todaySpendAnalyticsData = todaySpendAnalytics.data || [];

    const renderHtml = [];

    let sumCurrentDate =
      Object.keys(todaySpendAnalyticsData).length &&
      todaySpendAnalyticsData.sumCurrentDate;
    if (sumCurrentDate) renderHtml.push(<strong>${sumCurrentDate}</strong>);

    let percentage =
      Object.keys(todaySpendAnalyticsData).length &&
      todaySpendAnalyticsData.percentage;
    if (percentage)
      renderHtml.push(
        <span className={`${percentage > 0 ? "" : "red"}`}>
          {Math.abs(percentage).toFixed(2)}%
        </span>
      );

    return renderHtml;
  };

  /** Render the today spend analytics. */
  renderTodaySpendAnalyticsHtml = () => {
    let todaySpendAnalyticsStatus = this.props.todaySpendAnalytics.status;

    return todaySpendAnalyticsStatus === status.IN_PROGRESS ? (
      <>
        <i className="fa-solid fa-spinner fa-spin" /> Loading...
      </>
    ) : (
      <>
        <label>Spends Today</label>
        <Box className="spend-price">{this.getTodaySpendAnalytics()}</Box>
      </>
    );
  };

  /** Calculate the yesterday spend analytics. */
  getYesterdaySpendAnalytics = () => {
    const { yesterdaySpendAnalytics } = this.props;
    const yesterdaySpendAnalyticsData = yesterdaySpendAnalytics.data || {};

    const renderHtml = [];
    let yesterdaySumCurrentDate =
      Object.keys(yesterdaySpendAnalyticsData).length &&
      yesterdaySpendAnalyticsData.sumCurrentDate;
    if (yesterdaySumCurrentDate)
      renderHtml.push(<strong>${yesterdaySumCurrentDate}</strong>);

    let yesterdaySpendPercentage =
      Object.keys(yesterdaySpendAnalyticsData).length &&
      yesterdaySpendAnalyticsData.percentage;
    if (yesterdaySpendPercentage)
      renderHtml.push(
        <span className={`${yesterdaySpendPercentage > 0 ? "" : "red"}`}>
          {Math.abs(yesterdaySpendPercentage).toFixed(2)}%
        </span>
      );

    return renderHtml;
  };

  /** Render the yesterday spend analytics. */
  renderYesterdaySpendAnalyticsHtml = () => {
    let todaySpendAnalyticsStatus = this.props.yesterdaySpendAnalytics.status;
    return todaySpendAnalyticsStatus === status.IN_PROGRESS ? (
      <>
        <i className="fa-solid fa-spinner fa-spin" /> Loading...
      </>
    ) : (
      <>
        <label>Spends Yesterday</label>
        <Box className="spend-price">{this.getYesterdaySpendAnalytics()}</Box>
      </>
    );
  };

  /** Calculate the total spend. */
  getTotalSpend = () => {
    const { totalSpend } = this.props;
    const totalSpendData = totalSpend.data;

    const renderHtml = [];
    if (totalSpendData)
      renderHtml.push(<h1>{totalSpendData ? `$${totalSpendData}` : ""}</h1>);

    return renderHtml;
  };

  /** Render the total spend. */
  renderTotalSpendHtml = () => {
    let totalSpendStatus = this.props.totalSpend.status;
    return totalSpendStatus === status.IN_PROGRESS ? (
      <Box className="total-spend">
        <i className="fa-solid fa-spinner fa-spin" /> Loading...
      </Box>
    ) : (
      <Box className="total-spend">
        <Box className="heading">
          <label>Total Spend</label>
          <span>
            DETAIL <i className="fas fa-angle-right"></i>
          </span>
        </Box>
        {this.getTotalSpend()}
      </Box>
    );
  };

  /** Calculate line diagram data of monthly CloudWise spend. */
  lineDiagramDataPrepare() {
    let { monthlyCloudWiseSpend } = this.props;
    let diagramData = monthlyCloudWiseSpend.data || [];
    let heighestMonth = 0;
    if (diagramData.length) {
      let datasets = [];
      Object.keys(cloudwiseSpendColor).forEach((cloud) => {
        let cloudWiseData = {
          label: cloud.toUpperCase(),
          data: [],
          ...{
            ...{
              backgroundColor: cloudwiseSpendColor[cloud],
              borderColor: cloudwiseSpendColor[cloud],
            },
            ...COMMON_STYLE_LINE_DIAGRAM,
          },
        };

        diagramData.forEach((diagramCloud) => {
          if (cloud === diagramCloud.cloud.toLowerCase()) {
            let monthIndex = labels.findIndex((label) =>
              diagramCloud.month.startsWith(label)
            );

            if (monthIndex > -1)
              cloudWiseData.data[monthIndex] = diagramCloud.sumValues;
          }
        });

        if (cloudWiseData.data.length) {
          datasets.push(cloudWiseData);
          heighestMonth =
            heighestMonth > cloudWiseData.data.length
              ? heighestMonth
              : cloudWiseData.data.length;
        }
      });
      labels.length = heighestMonth;
      this.setState({ monthlyCloudWiseData: { labels, datasets } });
    }
  }

  /** Render the monthly CloudWise spend. */
  renderMonthlyCloudWiseSpendHtml = () => {
    let monthlyCloudWiseSpendStatus = this.props.monthlyCloudWiseSpend.status;
    let { monthlyCloudWiseOptions, monthlyCloudWiseData } = this.state;
    return monthlyCloudWiseSpendStatus === status.IN_PROGRESS ? (
      <Box className="loader">
        <i className="fa-solid fa-spinner fa-spin"></i> Loading...
      </Box>
    ) : (
      <Line
        options={monthlyCloudWiseOptions}
        data={monthlyCloudWiseData}
        height={320}
        width={518}
      />
    );
  };

  /** Calculate total cloudwise spend. */
  getTotalCloudwiseSpend = () => {
    const { totalCloudWiseSpend } = this.props;
    const totalCloudWiseSpendData = totalCloudWiseSpend.data || [];

    if (totalCloudWiseSpendData.length) {
      return totalCloudWiseSpendData.map((cloudSpend) => {
        return (
          <ListItem key={v4()}>
            <Box className="data-text">
              <span
                style={{
                  background: cloudwiseSpendColor[cloudSpend.cloud],
                }}
              ></span>
              <p>{cloudSpend.cloud?.toUpperCase()}</p>
            </Box>
            <label>
              {cloudSpend.sumValues > 0 ? `$${cloudSpend.sumValues}` : ""}
              <strong>
                {cloudSpend.percentage > 0 ? `${cloudSpend.percentage}%` : ""}
              </strong>
            </label>
          </ListItem>
        );
      });
    }
  };

  /** Calculate Progressbar total cloudwise spend. */
  getProgressBarTotalCloudwiseSpend = () => {
    const { totalCloudWiseSpend } = this.props;
    const totalCloudWiseSpendData = totalCloudWiseSpend.data || [];
    if (totalCloudWiseSpendData.length) {
      return totalCloudWiseSpendData.map((cloudSpend) => {
        return (
          <span
            style={{
              width: `${
                cloudSpend.percentage > 0 ? `${cloudSpend.percentage}` : "0"
              }%`,
              background: cloudwiseSpendColor[cloudSpend.cloud],
            }}
            key={v4()}
          ></span>
        );
      });
    }
  };

  /** Render total cloudwise spend. */
  renderTotalCloudWiseSpendHtml = () => {
    let totalCloudWiseSpendStatus = this.props.totalCloudWiseSpend.status;
    return totalCloudWiseSpendStatus === status.IN_PROGRESS ? (
      <Box className="loader">
        <i className="fa-solid fa-spinner fa-spin"></i> Loading...
      </Box>
    ) : (
      <>
        <Box className="avrage-shape">
          <span>{this.getProgressBarTotalCloudwiseSpend()}</span>
        </Box>
        <Box className="progress-bar-contant">
          <List>{this.getTotalCloudwiseSpend()}</List>
        </Box>
      </>
    );
  };

  /** Calculate total budget information. */
  getTotalBudget() {
    let totalBudgetData = this.props.totalBudget.data || {};
    if (Object.keys(totalBudgetData).length) {
      let {
        totalBudget,
        budgetUsed,
        remainingBudget,
        remainingBudgetPercentage,
      } = totalBudgetData;
      return {
        totalBudget: totalBudget > 0 ? `$${totalBudget}` : "",
        budgetUsed: budgetUsed,
        remainingBudget: remainingBudget > 0 ? `$${remainingBudget}` : "",
        remainingBudgetPercentage:
          remainingBudgetPercentage > 0
            ? `${100 - remainingBudgetPercentage}`
            : "",
      };
    } else {
      return {
        totalBudget: "",
        budgetUsed: "",
        remainingBudget: "",
        remainingBudgetPercentage: "",
      };
    }
  }
  /** Calculate Remaining Budget Percentage. */
  calculateRemainingBudgetPercentage() {
    let remainingBudgetPercentage =
      this.getTotalBudget().remainingBudgetPercentage;

    return remainingBudgetPercentage
      ? remainingBudgetPercentage > 35 && remainingBudgetPercentage <= 45
        ? 178 + 1.8 * remainingBudgetPercentage
        : remainingBudgetPercentage > 45 && remainingBudgetPercentage < 66
        ? 180 + 1.8 * remainingBudgetPercentage
        : remainingBudgetPercentage > 50
        ? 185 + 1.8 * remainingBudgetPercentage
        : 175 + 1.8 * remainingBudgetPercentage
      : 175;
  }

  /** Render total budget information. */
  renderTotalBudgetHtml() {
    let totalBudgetStatus = this.props.totalBudget.status;
    return (
      <Box className="total-budget">
        <Box className="heading">
          <label>Total Budget</label>
          <Box className="total-budget">
            <label>{this.getTotalBudget().totalBudget}</label>
            {/* <span>10%</span> */}
          </Box>
        </Box>
        {totalBudgetStatus === status.IN_PROGRESS ? (
          <Box className="loading-text">
            <i className="fa-solid fa-spinner fa-spin"></i> Loading...
          </Box>
        ) : (
          <Box className="content">
            <Box className="gauge">
              <Box className="gauge--body">
                <Box
                  className="gauge--fill"
                  style={{
                    transform: `rotate(${
                      this.getTotalBudget().remainingBudgetPercentage
                        ? 1.8 * this.getTotalBudget().remainingBudgetPercentage
                        : 0
                    }deg)`,
                  }}
                ></Box>
                <Box className="gauge--cover"></Box>
                <Box className="gauge__center__center"></Box>
                <Box className="gauge__center"></Box>
                <Box
                  className="gauge__needle"
                  style={{
                    transform: `rotate(${this.calculateRemainingBudgetPercentage()}deg)`,
                  }}
                ></Box>
              </Box>
              <Box className="used-text">
                {this.getTotalBudget().remainingBudgetPercentage}% Used
              </Box>
            </Box>
            <Box className="remaining-text">
              <span>Remaining {this.getTotalBudget().remainingBudget}</span>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  /** Calculate Monthly Statistics. */
  getMonthlyStatistics() {
    let monthlyStatisticsData = this.props.monthlyStatistics.data;
    let totalStatistics = monthlyStatisticsData[0]?.sumAllValues;

    return monthlyStatisticsData.map((statistics, statisticsIndex) => {
      let monthIndex = labels.findIndex((label) =>
        statistics.month.startsWith(label)
      );

      if (monthIndex > -1) {
        return (
          <ListItem key={v4()}>
            <Box className="avrage-contant">
              <label>{statistics.month}</label>
              <strong>{statistics.sumAllValues}</strong>
            </Box>
            <span>
              <span
                className={`${
                  statisticsIndex === 2
                    ? "rosy-pink"
                    : statisticsIndex === 3
                    ? "saffron-mango"
                    : "crocus-purple"
                } `}
                style={{
                  width: `${
                    (statistics.sumAllValues / totalStatistics) * 100
                  }%`,
                }}
              ></span>
            </span>
          </ListItem>
        );
      }
    });
  }

  /** Render Monthly Statistics. */
  renderMonthlyStatisticsHtml() {
    let monthlyStatisticsData = this.props.monthlyStatistics.data || [];
    let monthlyStatisticsStatus = this.props.monthlyStatistics.status;

    if (monthlyStatisticsStatus === status.IN_PROGRESS) {
      return (
        <Box className="loading-text">
          <i className="fa-solid fa-spinner fa-spin"></i> Loading...
        </Box>
      );
    } else {
      return (
        <>
          <Box className="heading">
            <label>Monthly Statistics</label>
            <Box className="total-budget">
              <label>
                {(monthlyStatisticsData.length &&
                  monthlyStatisticsData[0]?.sumAllValues) ||
                  ""}
              </label>
              <span style={{ display: "none" }}>10%</span>
            </Box>
            <p style={{ display: "none" }}>Compared to 11,490 last year</p>
          </Box>
          <Box className="monthly-avrage">
            <List>
              {(monthlyStatisticsData.length && this.getMonthlyStatistics()) ||
                ""}
            </List>
          </Box>
        </>
      );
    }
  }
  render() {
    return (
      <Box className="spend-analytics-container">
        <Box className="spend-analytics-inner-container">
          <Box className="analytics-left">
            {this.renderTotalSpendHtml()}
            <Box className="wise-spend-progress">
              <Box className="heading">Cloud Wise Spend</Box>
              {this.renderTotalCloudWiseSpendHtml()}
            </Box>
            <Box className="dashboard-spent">
              {this.renderTotalBudgetHtml()}
            </Box>
          </Box>
          <Box className="analytics-center">
            <Box className="analytics-line-chart">
              <Box id="chart" style={{ height: "320px", width: "100%" }}>
                {this.renderMonthlyCloudWiseSpendHtml()}
              </Box>
            </Box>
          </Box>
          <Box className="analytics-right">
            <Box className="current-spend">
              <Box className="heading">
                <label>Current Spend Rate</label>
              </Box>
              <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={1} className="spend-time">
                  <Grid className="spend-time-details">
                    <Box className="user-profile">
                      <img src={UserIcon} className="red" alt="" />
                    </Box>
                    {this.renderCurrentHourSpendRateHtml()}
                  </Grid>
                  <Grid className="spend-time-details">
                    <Box className="user-profile sky-blue">
                      <img src={KingIcon} alt="" />
                    </Box>
                    {this.renderCurrentDaySpendRateHtml()}
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className="spend-analytics">
              <Box className="heading">
                <label>Spend Analytics</label>
              </Box>
              <Grid container spacing={1} className="spend-analytics-time">
                <Box className="spend-contant">
                  {this.renderTodaySpendAnalyticsHtml()}
                </Box>
                <Box className="spend-contant">
                  {this.renderYesterdaySpendAnalyticsHtml()}
                </Box>
              </Grid>
            </Box>
            <Box className="monthly-statistics-card">
              {this.renderMonthlyStatisticsHtml()}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const {
    currentHourSpendRate,
    currentDaySpendRate,
    todaySpendAnalytics,
    yesterdaySpendAnalytics,
    totalSpend,
    monthlyCloudWiseSpend,
    totalCloudWiseSpend,
    totalBudget,
    monthlyStatistics,
  } = state.dashboard;
  return {
    currentHourSpendRate,
    currentDaySpendRate,
    todaySpendAnalytics,
    yesterdaySpendAnalytics,
    totalSpend,
    monthlyCloudWiseSpend,
    totalCloudWiseSpend,
    totalBudget,
    monthlyStatistics,
  };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SpendAnalytics);
