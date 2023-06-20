import React, { Component } from "react";
import {Box, List, ListItem} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

class CostAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: {
        datasets: [
          {
            data: [35, 18, 25, 22],
            backgroundColor: [
              '#8676FF',
              '#42CD7E',
              '#FF9066',
              '#FFCC41',
            ],
          },
        ],
      },
      productionData: {
        datasets: [
          {
            data: [20, 80],
            backgroundColor: [
              '#ff9066',
              '#8676FF',
            ],
          },
        ],
      },
      serviceData: {
        datasets: [
          {
            data: [16, 4, 10, 70],
            backgroundColor: [
              "#FFCC41", "#FF9066", "#42CD7E", "#8676FF"
            ],
          },
        ],
      },
    };
  }
  render() {
    return (
      <Box className="cost-analysis-container">
        <Box className="product-wise-inner-container">
          <Box className="main-collapse-expand">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <Box id="chart" className="collapse-expand">
                    <Box className="heading">
                      <h3>Product Wise Cost </h3>
                      <Box className="product-cost">
                        <label>$6,71,246</label>
                        <span>10%</span>
                      </Box>
                    </Box>
                    <Box className="chart-contant">
                      <Box className="d-flex chart" style={{ width: '60%' }}>
                        <Doughnut data={this.state.productData} />
                      </Box>
                      <Box className="d-block chart-details">
                        <List>
                          <ListItem>
                            <p>Procurement</p>
                            <Box className="d-block right-contant">
                              <label>$7,860</label>
                              <span>
                                <span
                                  className="crocus-purple"
                                  style={{ width: "40%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>HR</p>
                            <Box className="d-block right-contant">
                              <label>$3,390</label>
                              <span>
                                <span
                                  className="orange"
                                  style={{ width: "30%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>Supply Chain</p>
                            <Box className="d-block right-contant">
                              <label>$5,132</label>
                              <span>
                                <span
                                  className="yellow"
                                  style={{ width: "25%" }}
                                ></span>
                              </span>
                            </Box>
                          </ListItem>
                          <ListItem>
                            <p>EMS</p>
                            <Box className="d-block right-contant">
                              <label>$1100</label>
                              <span>
                                <span
                                  className="paris-green"
                                  style={{ width: "20%" }}
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
                      <h3>Production Vs Others </h3>
                      <Box className="product-cost">
                        <label>$6,71,246</label>
                        <span>10%</span>
                      </Box>
                    </Box>
                    <Box className="chart-contant">
                      <Box className="d-flex chart" style={{ width: '60%' }}>
                        <Doughnut data={this.state.productionData} />
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
                      <Box className="d-flex chart" style={{ width: '60%' }}>
                        <Doughnut data={this.state.serviceData} />
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

export default CostAnalysis;
