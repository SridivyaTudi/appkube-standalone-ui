import React, { Component } from "react";
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
  Button,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import DisasterRecoveryMode from "Views/AppViews/Environments/EnvironmentList/ThreeTierTopology/Components/DisasterRecoveryMode";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import databaseIcon from "assets/img/assetmanager/database-icon.png";
import internetIcon from "assets/img/assetmanager/internet-icon.png";
import archiveIcon from "assets/img/assetmanager/archive-icon.png";
import departmentIcon from "assets/img/assetmanager/department-icon.png";
import productIcon from "assets/img/assetmanager/product-icon.png";
import environemtIcon from "assets/img/assetmanager/environemt-icon.png";
import CreateFailoverPopup from "./Components/CreateFailoverPopup";
import { v4 } from "uuid";

let Data = {
  subData: [
    {
      label: "DepartMent",
      id: null,
      image: departmentIcon,
      subLabel: "Claims",
    },
    {
      label: "Product",
      id: null,
      image: productIcon,
      subLabel: "Xuber",
    },
    {
      label: "Environemt",
      id: null,
      image: environemtIcon,
      subLabel: "Production",
    },
  ],
  children: [
    {
      label: "Web Layer",
      id: null,
      image: internetIcon,

      steps: {
        stepData: [
          {
            label: "Provision",
            status: "Success",
          },
          {
            label: "Replication",
            status: "Success",
          },
          {
            label: "Failover Ready",
            status: "Success",
          },
        ],
        children: {
          label: "Web Layer",
          id: null,
          image: departmentIcon,
          subLabel: "Claims",
          className: "",
        },
      },
    },
    {
      label: "App Layer",
      id: null,
      image: calendarMouseIcon,
      steps: {
        stepData: [
          {
            label: "Provision",
            status: "Success",
          },
          {
            label: "Replication",
            status: "Success",
          },
          {
            label: "Failover Ready",
            status: "Success",
          },
        ],
        children: {
          label: "App Layer",
          id: null,
          image: calendarMouseIcon,
          subLabel: "Claims",
          className: "red",
        },
      },
    },
    {
      label: "Data Layer",
      id: null,
      image: databaseIcon,
      steps: {
        stepData: [
          {
            label: "Provision",
            status: "Success",
          },
          {
            label: "Replication",
            status: "Success",
          },
          {
            label: "Failover Ready",
            status: "Success",
          },
        ],
        children: {
          label: "Data Layer",
          id: null,
          image: databaseIcon,
          subLabel: "Claims",
          className: "blue",
        },
      },
    },
    {
      label: "Auxiliary Layer",
      id: null,
      image: archiveIcon,
      steps: {
        stepData: [
          {
            label: "Provision",
            status: "Success",
          },
          {
            label: "Replication",
            status: "Success",
          },
          {
            label: "Failover Ready",
            status: "Success",
          },
        ],
        children: {
          label: "Auxiliary Layer",
          id: null,
          image: archiveIcon,
          subLabel: "Claims",
          className: "",
        },
      },
    },
  ],
};

class DrTopology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOfTableLevel1: [
        {
          eventType: "Failover",
          entity: "Full App",
          time: "10:07:24",
          status: "Success",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "06:17:34",
          status: "Failed",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "21:28:45",
          status: "Failed",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "08:39:56",
          status: "Success",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "07:40:57",
          status: "Success",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "01:23:45",
          status: "Failed",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "16:29:46",
          status: "Failed",
        },
        {
          eventType: "Drill",
          entity: "Data Layer",
          time: "09:12:29",
          status: "Failed",
        },
      ],
      showCreateFailoverPopup: false,
    };
  }

  /** Render table level-1 data . */
  renderTableLevel1Data() {
    let { dataOfTableLevel1 } = this.state;
    return dataOfTableLevel1.map((vpc) => {
      return (
        <TableRow key={v4()}>
          <TableCell align="left">{vpc.eventType}</TableCell>
          <TableCell align="left">
            <div className="icon">
              {vpc.entity === "Full App" && <img src={fullAppIcon} alt="" />}
              {vpc.entity === "Data Layer" && (
                <img src={dataLayerTableIcon} alt="" />
              )}
            </div>{" "}
            {vpc.entity}
          </TableCell>
          <TableCell align="left">{vpc.time}</TableCell>
          <TableCell align="left">
            <div
              className={`status ${
                vpc.status === "Success"
                  ? "success"
                  : "" || vpc.status === "Failed"
                  ? "failed"
                  : ""
              }`}
            >
              <i className="fa-solid fa-circle-check"></i> {vpc.status}
            </div>
          </TableCell>
          <TableCell align="left">
            <Button
              className="secondary-btn"
              variant="contained"
              onClick={this.props.redirectViewDetails}
            >
              View Details
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }

  toggleCreateFailoverPopup = () => {
    this.setState({
      showCreateFailoverPopup: !this.state.showCreateFailoverPopup,
    });
  };

  render() {
    const { showCreateFailoverPopup } = this.state;
    return (
      <Box className="dr-Topology-container">
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
            <Grid item lg={9} md={8} xs={12}>
              <Box className="chart">
                <Box className="heading">
                  <h3>Realtime Disaster Recovery Mode</h3>
                  <Button
                    className="primary-btn min-width"
                    variant="contained"
                    onClick={this.toggleCreateFailoverPopup}
                  >
                    Application FailOver
                  </Button>
                </Box>
                <Box className="realtime-chart">
                  <Box className="primary-label">
                    <label>
                      Primary <span>(US. East)</span>
                    </label>
                    <label>
                      DR <span>(US. West)</span>
                    </label>
                  </Box>
                  <DisasterRecoveryMode data={Data} />
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} xs={12}>
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
                </List>
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
              <TableBody>{this.renderTableLevel1Data()}</TableBody>
            </Table>
          </TableContainer>
        </Box>
        {showCreateFailoverPopup ? (
          <CreateFailoverPopup
            showModal={showCreateFailoverPopup}
            toggleCreateFailoverPopup={this.toggleCreateFailoverPopup}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default DrTopology;
