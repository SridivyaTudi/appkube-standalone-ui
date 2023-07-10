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
  plugins,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
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

class SpendAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels,
        datasets: [
          {
            label: "AWS",
            data: [
              "600",
              "700",
              "420",
              "500",
              "780",
              "580",
              "600",
              "460",
              "450",
              "540",
              "750",
              "1000",
            ],
            backgroundColor: "rgba(255, 153, 0, 1)",
            borderColor: "rgba(255, 153, 0, 1)",
            pointBorderWidth: 0,
            lineTension: 0.5,
            fill: false,
          },
          {
            label: "AZURE",
            data: [
              "420",
              "250",
              "350",
              "450",
              "480",
              "700",
              "850",
              "650",
              "750",
              "800",
              "850",
              "800",
            ],
            backgroundColor: "rgba(0, 137, 214, 1)",
            borderColor: "rgba(0, 137, 214, 1)",
            pointBorderWidth: 0,
            lineTension: 0.5,
            fill: false,
          },
          {
            label: "GCP",
            data: [
              "230",
              "200",
              "240",
              "300",
              "320",
              "350",
              "300",
              "340",
              "350",
              "300",
              "500",
              "600",
            ],
            backgroundColor: "rgba(218, 79, 68, 1)",
            borderColor: "rgba(218, 79, 68, 1)",
            pointBorderWidth: 0,
            lineTension: 0.5,
            fill: false,
          },
        ],
      },
      options: {
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
  getCurrentHourSpendRate = ()=>{
    let { currentHourSpendRate } = this.props
    return currentHourSpendRate.data?.length && currentHourSpendRate.data[0].sumCurrentHour ? currentHourSpendRate.data[0].sumCurrentHour  : 0
  }
  getHourSumDifference =()=>{
    let { currentHourSpendRate } = this.props
    return currentHourSpendRate.data?.length && currentHourSpendRate.data[0].sum_difference ? currentHourSpendRate.data[0].sum_difference  : null
  }
  render() {
   
    return (
      <Box className="spend-analytics-container">
        <Box className="spend-analytics-inner-container">
          <Box className="analytics-left">
            <Box className="total-spend">
              <Box className="heading">
                <label>Total Spend</label>
                <span>
                  DETAIL <i className="fas fa-angle-right"></i>
                </span>
              </Box>
              <h1>$75,41,390</h1>
            </Box>
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
                <Line
                  options={this.state.options}
                  data={this.state.data}
                  height={320}
                  width={518}
                />
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
                    <Box className="spend-contant">
                      <label>Per Hour</label>
                      <Box className="spend-price">
                        <strong>{this.getCurrentHourSpendRate() ? `$${this.getCurrentHourSpendRate()}` : null}</strong>
                        {
                          this.getHourSumDifference() ? <span className={`${ this.getHourSumDifference() > 0 ? '' : 'red'}` }>{this.getHourSumDifference() ? `${this.getHourSumDifference()}` : null}</span> : <></>  
                        }
                        
                      </Box>
                    </Box>
                  </Grid>
                  <Grid className="spend-time-details">
                    <Box className="user-profile sky-blue">
                      <img src={KingIcon} alt="" />
                    </Box>
                    <Box className="spend-contant">
                      <label>Per Day</label>
                      <Box className="spend-price">
                        <strong>$1,03,540</strong>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className="spend-analytics">
              <Box className="heading">
                <label>Spend Analytics</label>
              </Box>
              <Grid container spacing={1} className="spend-analytics-time">
                <Grid className="spend-contant">
                  <label>Spends Today</label>
                  <Box className="spend-price">
                    <strong>$12,875</strong>
                    <span>10%</span>
                  </Box>
                </Grid>
                <Grid className="spend-contant">
                  <label>Spends Yesterday</label>
                  <Box className="spend-price">
                    <strong>$1,03,540</strong>
                    <span>12%</span>
                  </Box>
                </Grid>
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
  const { currentHourSpendRate } = state.dashboard;
  return { currentHourSpendRate };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SpendAnalytics);
