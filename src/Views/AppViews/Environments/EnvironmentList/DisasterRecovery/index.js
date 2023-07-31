import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import noAvaliableBox from "assets/img/assetmanager/no-avaliable-box.png";
import fullAppIcon from "assets/img/assetmanager/full-app-icon.png";
import dataLayerTableIcon from "assets/img/assetmanager/data-layer-table-icon.png";

import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  Button,
  Grid,
} from "@mui/material";

class DisasterRecovery extends Component {
  tabMapping = [
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "Health",
      dataKey: "Health",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="disaster-recovery-container">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={`${index}`}
                    className={index === activeTab ? "active" : ""}
                    onClick={() => this.setActiveTab(index)}
                  >
                    {tabData.name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 && (
              <>
                <Box className="list-heading">
                  <h3>Majesco</h3>
                  <Box className="generated-box">
                    <i className="fa-solid fa-check"></i> Your Request Number
                    Has been Generated # <strong>5336412</strong>
                  </Box>
                  <Button
                    className="primary-btn min-width"
                    component={Link}
                    variant="contained"
                    to={`${APP_PREFIX_PATH}/environments`}
                  >
                    Back to Infra View
                  </Button>
                </Box>
                <Box className="disaster-recovery-chart">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={9}>
                      <Box className="chart">
                        <Box className="heading">
                          <h3>Realtime Disaster Recovery Mode</h3>
                          <Button
                            className="primary-btn min-width"
                            variant="contained"
                          >
                            Application FailOver
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box className="failover-box">
                        <Box className="heading">
                          <h3>Failover Activity Status</h3>
                        </Box>
                        <Box className="item-generated">
                          Today <span>#5336412</span>
                        </Box>
                        <List className="steps">
                          <ListItem>
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                              <Grid item xs={2}>
                                <div className="icon initiated">
                                  <i className="fa-solid fa-check"></i>
                                </div>
                              </Grid>
                              <Grid item xs={10} className="p-l-10">
                                <Box className="contents">
                                  <div className="heaing">
                                    <strong>You</strong> Initiated the request
                                  </div>
                                  <div className="schedule-time">
                                    <span>DR Schedule Time</span>
                                    <p>04/07/2023 :08:00:00 AM</p>
                                  </div>
                                  <div className="status initiated">
                                    Initiated
                                  </div>
                                  <div className="time-date">
                                    Jun 1, 2023 at 09:35 Am
                                  </div>
                                </Box>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                              <Grid item xs={2}>
                                <div className="icon pending">
                                  <i className="fa-solid fa-person-biking"></i>
                                </div>
                              </Grid>
                              <Grid item xs={10} className="p-l-10">
                                <Box className="contents">
                                  <div className="heaing">Request Pending</div>
                                  <div className="status pending">Pending</div>
                                  <div className="time-date">
                                    Jun 2, 2023 at 08:35 Am
                                  </div>
                                </Box>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <ListItem>
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                              <Grid item xs={2}>
                                <div className="icon approved">
                                  <i className="fa-solid fa-check"></i>
                                </div>
                              </Grid>
                              <Grid item xs={10} className="p-l-10">
                                <Box className="contents">
                                  <div className="heaing">
                                    <strong>William</strong> Approved the
                                    request
                                  </div>
                                  <div className="status approved">
                                    Approved
                                  </div>
                                  <div className="time-date">10 mins ago</div>
                                </Box>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>

                        {/* <Box className="no-avaliable-box">
                          <div className="image">
                            <img src={noAvaliableBox} alt="" />{" "}
                          </div>
                          <strong>No Activity Avaliable</strong>
                          <p>Status will be displayed based on the request</p>
                        </Box> */}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="activity-logs-table">
                  <Box className="heading">
                    <h3>Activity Logs</h3>
                  </Box>
                  <TableContainer className="table">
                    <Table className="overview">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Event Type</TableCell>
                          <TableCell align="left">Entity</TableCell>
                          <TableCell align="left">Time</TableCell>
                          <TableCell align="left">Status</TableCell>
                          <TableCell align="left">Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="left">Failover</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={fullAppIcon} alt="" />
                            </div>{" "}
                            Full App
                          </TableCell>
                          <TableCell align="left">10:07:24</TableCell>
                          <TableCell align="left">
                            <div className="status success">
                              <i className="fa-solid fa-circle-check"></i>{" "}
                              Success
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Drill</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={dataLayerTableIcon} alt="" />
                            </div>{" "}
                            Data Layer
                          </TableCell>
                          <TableCell align="left">06:17:34</TableCell>
                          <TableCell align="left">
                            <div className="status failed">
                              <i class="fa-solid fa-triangle-exclamation"></i>{" "}
                              Failed
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Drill</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={dataLayerTableIcon} alt="" />
                            </div>{" "}
                            Data Layer
                          </TableCell>
                          <TableCell align="left">06:17:34</TableCell>
                          <TableCell align="left">
                            <div className="status failed">
                              <i class="fa-solid fa-triangle-exclamation"></i>{" "}
                              Failed
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Drill</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={dataLayerTableIcon} alt="" />
                            </div>{" "}
                            Data Layer
                          </TableCell>
                          <TableCell align="left">06:17:34</TableCell>
                          <TableCell align="left">
                            <div className="status success">
                              <i className="fa-solid fa-circle-check"></i>{" "}
                              Success
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Drill</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={dataLayerTableIcon} alt="" />
                            </div>{" "}
                            Data Layer
                          </TableCell>
                          <TableCell align="left">06:17:34</TableCell>
                          <TableCell align="left">
                            <div className="status success">
                              <i className="fa-solid fa-circle-check"></i>{" "}
                              Success
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Drill</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={dataLayerTableIcon} alt="" />
                            </div>{" "}
                            Data Layer
                          </TableCell>
                          <TableCell align="left">06:17:34</TableCell>
                          <TableCell align="left">
                            <div className="status failed">
                              <i class="fa-solid fa-triangle-exclamation"></i>{" "}
                              Failed
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">Drill</TableCell>
                          <TableCell align="left">
                            <div className="icon">
                              <img src={dataLayerTableIcon} alt="" />
                            </div>{" "}
                            Data Layer
                          </TableCell>
                          <TableCell align="left">06:17:34</TableCell>
                          <TableCell align="left">
                            <div className="status failed">
                              <i class="fa-solid fa-triangle-exclamation"></i>{" "}
                              Failed
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="secondary-btn"
                              variant="contained"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            )}
            {activeTab === 1 && (
              <>
                <Box className="list-heading">
                  <h3>Disaster recovery</h3>
                  <Button
                    className="primary-btn min-width"
                    component={Link}
                    variant="contained"
                    to={`${APP_PREFIX_PATH}/environments`}
                  >
                    Back to Infra View
                  </Button>
                </Box>
              </>
            )}
            {activeTab === 2 && <Box>Health</Box>}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DisasterRecovery;
