import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import fullAppIcon from "assets/img/assetmanager/full-app-icon.png";
import noAvaliableBox from "assets/img/assetmanager/no-avaliable-box.png";
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
import DisasterRecoveryMode from "Views/AppViews/Environments/EnvironmentList/DisasterRecovery/Components/DisasterRecoveryMode";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
let Data = {
  subData: [
    {
      label: "DepartMent",
      id: null,
      image: calendarMouseIcon,
      subLabel: "Claims",
    },
    {
      label: "Product",
      id: null,
      image: calendarMouseIcon,
      subLabel: "Xuber",
    },
    {
      label: "Environemt",
      id: null,
      image: calendarMouseIcon,
      subLabel: "Production",
    },
  ],
  children: [
    {
      label: "Web Layer",
      id: null,
      image: calendarMouseIcon,
      children: [],
    },
    {
      label: "App Layer",
      id: null,
      image: calendarMouseIcon,
      children: [],
    },
    {
      label: "Data Layer",
      id: null,
      image: calendarMouseIcon,
      children: [],
    },
    {
      label: "Auxiliary Layer",
      id: null,
      image: calendarMouseIcon,
      children: [],
    },
  ],
};
class DrTopology extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <>
        <Box className="generated-box">
          <i className="fa-solid fa-check"></i> Your Request Number Has been
          Generated # <strong>5336412</strong>
        </Box>
        <Box className="disaster-recovery-chart">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems="flex-start"
          >
            <Grid item xs={9}>
              <Box className="chart">
                <Box className="heading">
                  <h3>Realtime Disaster Recovery Mode</h3>
                  <Button className="primary-btn min-width" variant="contained">
                    Application FailOver
                  </Button>
                </Box>
                <DisasterRecoveryMode data={Data} />
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
                            <i className="fa-solid fa-circle-check"></i> Success
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="secondary-btn" variant="contained">
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
                          <Button className="secondary-btn" variant="contained">
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
                          <Button className="secondary-btn" variant="contained">
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
                            <i className="fa-solid fa-circle-check"></i> Success
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="secondary-btn" variant="contained">
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
                            <i className="fa-solid fa-circle-check"></i> Success
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="secondary-btn" variant="contained">
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
                          <Button className="secondary-btn" variant="contained">
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
                          <Button className="secondary-btn" variant="contained">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
                {/* <List className="steps">
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
                          <div className="status initiated">Initiated</div>
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
                            <strong>William</strong> Approved the request
                          </div>
                          <div className="status approved">Approved</div>
                          <div className="time-date">10 mins ago</div>
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
                            <strong>William</strong> Approved the request
                          </div>
                          <div className="status approved">Approved</div>
                          <div className="time-date">10 mins ago</div>
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
                            <strong>William</strong> Approved the request
                          </div>
                          <div className="status approved">Approved</div>
                          <div className="time-date">10 mins ago</div>
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
                            <strong>William</strong> Approved the request
                          </div>
                          <div className="status approved">Approved</div>
                          <div className="time-date">10 mins ago</div>
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
                            <strong>William</strong> Approved the request
                          </div>
                          <div className="status approved">Approved</div>
                          <div className="time-date">10 mins ago</div>
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
                            <strong>William</strong> Approved the request
                          </div>
                          <div className="status approved">Approved</div>
                          <div className="time-date">10 mins ago</div>
                        </Box>
                      </Grid>
                    </Grid>
                  </ListItem>
                  
                </List> */}

                <Box className="no-avaliable-box">
                  <div className="image">
                    <img src={noAvaliableBox} alt="" />{" "}
                  </div>
                  <strong>No Activity Avaliable</strong>
                  <p>Status will be displayed based on the request</p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default DrTopology;
