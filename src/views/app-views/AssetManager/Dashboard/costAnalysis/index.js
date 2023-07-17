import React, { Component } from "react";
import { Box, List, ListItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getProductWiseCost } from "redux/assetManager/dashboard/dashboardThunk";
import { connect } from "react-redux";
import { getCurrentOrgId, getUUID } from "utils";
import status from "redux/constants/commonDS";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorPallate = ["#8676FF", "#42CD7E", "#FF9066", "#FFCC41"];

class CostAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // productWiseCost: {
      //   datasets: [
      //     {
      //       data: [35, 18, 25, 22],
      //       backgroundColor: ["#8676FF", "#42CD7E", "#FF9066", "#FFCC41"],
      //     },
      //   ],
      // },
      productionVsOthers: {
        datasets: [
          {
            data: [20, 80],
            backgroundColor: ["#ff9066", "#8676FF"],
          },
        ],
      },
      serviceTypeWiseCost: {
        datasets: [
          {
            data: [16, 4, 10, 70],
            backgroundColor: ["#FFCC41", "#FF9066", "#42CD7E", "#8676FF"],
          },
        ],
      },
      productWiseCostData: [],
    };
  }

  componentDidMount = () => {
    this.props.getProductWiseCost(getCurrentOrgId());
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.productWiseCost.status !== this.props.productWiseCost.status &&
      this.props.productWiseCost.status === status.SUCCESS
    ) {
      this.setState({ productWiseCostData: this.props.productWiseCost.data });
    }
  };

  /** Calculates and returns total sum of all departments costs
   * @param {array} AllDepartmentsData - Entire data of all departments.
   */
  showTotalCost = (data) => {
    let total = 0;
    data.map((item) => {
      total += item.total;
    });
    return total.toLocaleString();
  };

  /** Calculates and returns width of a bar according to percentage of total cost
   * @param {number} departmentCost - Current department dost
   * @param {number} totalCost - Total cost of all departments
   */
  calculateBarWidth = (departmentCost, totalCost) => {
    let convertedTotalCost = parseFloat(totalCost.replace(/,/g, ""));
    const percentage = (departmentCost / convertedTotalCost) * 100;
    return percentage.toFixed(2);
  };

  manipulateDoughData = (data) => {
    let doughData = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };
    data.map((item, index) => {
      doughData.datasets[0].data.push(item.total);
      doughData.datasets[0].backgroundColor.push(colorPallate[index]);
    });
    return doughData;
  };

  render() {
    const { productWiseCostData } = this.state;
    return (
      <Box className="cost-analysis-container">
        <Box className="product-wise-inner-container">
          <Box className="main-collapse-expand">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <Box id="chart" className="collapse-expand">
                    <Box className="heading">
                      <h3>Product Wise Cost</h3>
                      <Box className="product-cost">
                        <label>
                          ${this.showTotalCost(productWiseCostData)}
                        </label>
                        <span>10%</span>
                      </Box>
                    </Box>
                    <Box className="chart-contant">
                      <Box className="d-flex chart" style={{ width: "60%" }}>
                        {productWiseCostData.length ? (
                          <Doughnut
                            data={this.manipulateDoughData(productWiseCostData)}
                          />
                        ) : (
                          <></>
                        )}
                      </Box>
                      <Box className="d-block chart-details">
                        <List>
                          {productWiseCostData.map((item, index) => {
                            return (
                              <ListItem key={getUUID()}>
                                <p>{item.name}</p>
                                <Box className="d-block right-contant">
                                  <label>${item.total.toLocaleString()}</label>
                                  <span>
                                    <span
                                      style={{
                                        width: `${this.calculateBarWidth(
                                          item.total,
                                          this.showTotalCost(
                                            productWiseCostData
                                          )
                                        )}%`,
                                        background: `${colorPallate[index]}`,
                                      }}
                                    ></span>
                                  </span>
                                </Box>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Box id="chart" className="collapse-expand">
                    <Box className="heading">
                      <h3>Production Vs Others</h3>
                      <Box className="product-cost">
                        <label>$6,71,246</label>
                        <span>10%</span>
                      </Box>
                    </Box>
                    <Box className="chart-contant">
                      <Box className="d-flex chart" style={{ width: "60%" }}>
                        <Doughnut data={this.state.productionVsOthers} />
                      </Box>
                      <Box className="d-block chart-details">
                        <List>
                          <ListItem>
                            <p>Production</p>
                            <Box className="d-block right-contant">
                              <label>$571246</label>
                              <span>
                                <span
                                  className="crocus-purple"
                                  style={{ width: "75%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>Others</p>
                            <Box className="d-block right-contant">
                              <label>$10000</label>
                              <span>
                                <span
                                  className="yellow"
                                  style={{ width: "25%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Box id="chart" className="collapse-expand">
                    <Box className="heading">
                      <h3>Service Type Wise Cost </h3>
                      <Box className="product-cost">
                        <label>$6,71,246</label>
                        <span>10%</span>
                      </Box>
                    </Box>
                    <Box className="chart-contant">
                      <Box className="d-flex chart" style={{ width: "60%" }}>
                        <Doughnut data={this.state.serviceTypeWiseCost} />
                      </Box>
                      <Box className="d-block chart-details">
                        <List>
                          <ListItem>
                            <p>App</p>
                            <Box className="d-block right-contant">
                              <label>$1,94,661</label>
                              <span>
                                <span
                                  className="crocus-purple"
                                  style={{ width: "80%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>Data</p>
                            <Box className="d-block right-contant">
                              <label>$53971</label>
                              <span>
                                <span
                                  className="yellow"
                                  style={{ width: "30%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>Network</p>
                            <Box className="d-block right-contant">
                              <label>$26846</label>
                              <span>
                                <span
                                  className="orange"
                                  style={{ width: "10%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>Others</p>
                            <Box className="d-block right-contant">
                              <label>$15326</label>
                              <span>
                                <span
                                  className="paris-green"
                                  style={{ width: "15%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                        </List>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  const { productWiseCost } = state.dashboard;
  return { productWiseCost };
};

const mapDispatchToProps = {
  getProductWiseCost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CostAnalysis);
