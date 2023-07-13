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

const labels = [
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
const CLOUD_TYPE_WITH_STYLE = {
  aws: {
    backgroundColor: "rgba(255, 153, 0, 1)",
    borderColor: "rgba(255, 153, 0, 1)",
  },
  azure: {
    backgroundColor: "rgba(0, 137, 214, 1)",
    borderColor: "rgba(0, 137, 214, 1)",
  },
  gcp: {
    backgroundColor: "rgba(218, 79, 68, 1)",
    borderColor: "rgba(218, 79, 68, 1)",
  },
};

class SpendAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyCloudWiseData: { labels, datasets: [] },
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
  /** Print the current hour spend rate. */
  renderCurrentHourSpendRate = () => {
    const { currentHourSpendRate } = this.props;
    const spendRateData = currentHourSpendRate.data || [];
    return <strong>{spendRateData}</strong>;
  };

  /** Print the current day spend rate. */
  renderCurrentDaySpendRate = () => {
    const { currentDaySpendRate } = this.props;
    const daySpendRateData = currentDaySpendRate.data || [];
    return <strong>{daySpendRateData}</strong>;
  };

  /** Print the today spend analytics. */
  renderTodaySpendAnalytics = () => {
    const { todaySpendAnalytics } = this.props;
    const todaySpendAnalyticsData = todaySpendAnalytics.data || [];

    const renderHtml = [];

    let sumCurrentDate =
      todaySpendAnalyticsData.length &&
      todaySpendAnalyticsData[0].sumCurrentDate;
    if (sumCurrentDate) renderHtml.push(<strong>${sumCurrentDate}</strong>);

    let percentage =
      todaySpendAnalyticsData.length && todaySpendAnalyticsData[0].percentage;
    if (percentage)
      renderHtml.push(
        <span className={`${percentage > 0 ? "" : "red"}`}>
          {Math.abs(percentage)}%
        </span>
      );

    return renderHtml;
  };

  /** Print the yesterday spend analytics. */
  renderYesterdaySpendAnalytics = () => {
    const { yesterdaySpendAnalytics } = this.props;
    const yesterdaySpendAnalyticsData = yesterdaySpendAnalytics.data || [];

    const renderHtml = [];
    let yesterdaySumCurrentDate =
      yesterdaySpendAnalyticsData.length &&
      yesterdaySpendAnalyticsData[0].sumCurrentDate;
    if (yesterdaySumCurrentDate)
      renderHtml.push(<strong>${yesterdaySumCurrentDate}</strong>);

    let yesterdaySpendPercentage =
      yesterdaySpendAnalyticsData.length &&
      yesterdaySpendAnalyticsData[0].percentage;
    if (yesterdaySpendPercentage)
      renderHtml.push(
        <span className={`${yesterdaySpendPercentage > 0 ? "" : "red"}`}>
          {Math.abs(yesterdaySpendPercentage)}%
        </span>
      );

    return renderHtml;
  };

  /** Print the total spend. */
  renderTotalSpend = () => {
    const { totalSpend } = this.props;
    const totalSpendData = totalSpend.data || [];

    const renderHtml = [];
    if (totalSpendData.length)
      renderHtml.push(
        <h1>{totalSpendData[0] ? `$${totalSpendData[0]}` : ""}</h1>
      );

    return renderHtml;
  };

  /** Line diagram data of monthly CloudWise spend. */
  lineDiagramDataPrepare() {
    let { monthlyCloudWiseSpend } = this.props;
    let diagramData = monthlyCloudWiseSpend.data || [];

    if (diagramData.length) {
      let datasets = [];
      Object.keys(CLOUD_TYPE_WITH_STYLE).forEach((cloud) => {
        let cloudWiseData = {
          label: cloud.toUpperCase(),
          data: [],
          ...{ ...CLOUD_TYPE_WITH_STYLE[cloud], ...COMMON_STYLE_LINE_DIAGRAM },
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

        if (cloudWiseData.data.length) datasets.push(cloudWiseData);
      });

      this.setState({ monthlyCloudWiseData: { labels, datasets } });
    }
  }

  render() {
    let {
      currentDaySpendRate,
      currentHourSpendRate,
      todaySpendAnalytics,
      yesterdaySpendAnalytics,
      totalSpend,
      monthlyCloudWiseSpend,
    } = this.props;
    let { monthlyCloudWiseOptions, monthlyCloudWiseData } = this.state;
    return (
      <Box className="spend-analytics-container">
        <Box className="spend-analytics-inner-container">
          <Box className="analytics-left">
            {totalSpend.status === status.IN_PROGRESS ? (
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
                {this.renderTotalSpend()}
              </Box>
            )}
            <Box className="wise-spend-progress">
              <Box className="heading">Cloud Wise Spend</Box>
              <Box className="avrage-shape">
                <span>
                  <span className="dark-orange" style={{ width: "55%" }}></span>
                  <span className="blue-dress" style={{ width: "25%" }}></span>
                  <span className="dark-coral" style={{ width: "20%" }}></span>
                </span>
              </Box>

              {/* <BorderLinearProgress
                className="progress-bar"
                variant="determinate"
                value={50}
                sx={{
                  backgroundColor: `#0089d6`,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: `#ff9900`,
                  },
                }}
              /> */}
              <Box className="progress-bar-contant">
                <List>
                  <ListItem>
                    <Box className="data-text">
                      <span style={{ background: "#ff9900" }}></span>
                      <p>AWS</p>
                    </Box>
                    <label>
                      $4,504,210<strong>55%</strong>
                    </label>
                  </ListItem>
                  <ListItem>
                    <Box className="data-text">
                      <span style={{ background: "#0089d6" }}></span>
                      <p>AZURE</p>
                    </Box>
                    <label>
                      $2,100,950<strong>25%</strong>
                    </label>
                  </ListItem>
                  <ListItem>
                    <Box className="data-text">
                      <span style={{ background: "#da4f44" }}></span>
                      <p>GCP</p>
                    </Box>
                    <label>
                      $1,980,240<strong>20%</strong>
                    </label>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box className="dashboard-spent">
              <Box className="total-budget">
                <Box className="heading">
                  <label>Total Budget(Q1)</label>
                  <Box className="total-budget">
                    <label>$12,875</label>
                    <span>10%</span>
                  </Box>
                </Box>
                <Box className="content">
                  <Box className="gauge">
                    <Box className="gauge--body">
                      <Box
                        className="gauge--fill"
                        style={{ transform: "rotate(0.295turn)" }}
                      ></Box>
                      <Box className="gauge--cover"></Box>
                      <Box className="gauge__center__center"></Box>
                      <Box className="gauge__center"></Box>
                      <Box
                        className="gauge__needle"
                        style={{ transform: "rotate(0.80turn)" }}
                      ></Box>
                    </Box>
                    <Box className="used-text">75% Used</Box>
                  </Box>
                  <Box className="remaining-text">
                    <span>Remaining $3,28,457</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="analytics-center">
            <Box className="analytics-line-chart">
              <Box id="chart" style={{ height: "320px", width: "100%" }}>
                {monthlyCloudWiseSpend.status === status.IN_PROGRESS ? (
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
                )}
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
                    {currentHourSpendRate.status === status.IN_PROGRESS ? (
                      <Box className="spend-contant">
                        <i className="fa-solid fa-spinner fa-spin" /> Loading...
                      </Box>
                    ) : (
                      <Box className="spend-contant">
                        <label>Per Hour</label>
                        <Box className="spend-price">
                          {this.renderCurrentHourSpendRate()}
                        </Box>
                      </Box>
                    )}
                  </Grid>
                  <Grid className="spend-time-details">
                    <Box className="user-profile sky-blue">
                      <img src={KingIcon} alt="" />
                    </Box>
                    {currentDaySpendRate.status === status.IN_PROGRESS ? (
                      <Box className="spend-contant">
                        <i className="fa-solid fa-spinner fa-spin" /> Loading...
                      </Box>
                    ) : (
                      <Box className="spend-contant">
                        <label>Per Day</label>
                        <Box className="spend-price">
                          {this.renderCurrentDaySpendRate()}
                        </Box>
                      </Box>
                    )}
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
                  {todaySpendAnalytics.status === status.IN_PROGRESS ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" /> Loading...
                    </>
                  ) : (
                    <>
                      <label>Spends Today</label>
                      <Box className="spend-price">
                        {this.renderTodaySpendAnalytics()}
                      </Box>
                    </>
                  )}
                </Box>
                <Box className="spend-contant">
                  {yesterdaySpendAnalytics.status === status.IN_PROGRESS ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" /> Loading...
                    </>
                  ) : (
                    <>
                      <label>Spends Yesterday</label>
                      <Box className="spend-price">
                        {this.renderYesterdaySpendAnalytics()}
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Box>
            <Box className="monthly-statistics-card">
              <Box className="heading">
                <label>Monthly Statistics</label>
                <Box className="total-budget">
                  <label>16,073</label>
                  <span>10%</span>
                </Box>
                <p>Compared to 11,490 last year</p>
              </Box>
              <Box className="monthly-avrage">
                <List>
                  <ListItem>
                    <Box className="avrage-contant">
                      <label>January</label>
                      <strong>8,320</strong>
                    </Box>
                    <span>
                      <span
                        className="crocus-purple"
                        style={{ width: "90%" }}
                      ></span>
                    </span>
                  </ListItem>
                  <ListItem>
                    <Box className="avrage-contant">
                      <label>February</label>
                      <strong>6,320</strong>
                    </Box>
                    <span>
                      <span
                        className="rosy-pink"
                        style={{ width: "70%" }}
                      ></span>
                    </span>
                  </ListItem>
                  <ListItem>
                    <Box className="avrage-contant">
                      <label>March</label>
                      <strong>1,433</strong>
                    </Box>
                    <span>
                      <span
                        className="saffron-mango"
                        style={{ width: "40%" }}
                      ></span>
                    </span>
                  </ListItem>
                </List>
              </Box>
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
  } = state.dashboard;
  return {
    currentHourSpendRate,
    currentDaySpendRate,
    todaySpendAnalytics,
    yesterdaySpendAnalytics,
    totalSpend,
    monthlyCloudWiseSpend,
  };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SpendAnalytics);
