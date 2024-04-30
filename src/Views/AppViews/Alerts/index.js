import React, { Component } from "react";
import { Box, Button, Grid, ListItem } from "@mui/material";
import AlertServiceIcon1 from "../../../assets/img/alerts/alert-service-icon1.png";
import AlertServiceIcon2 from "../../../assets/img/alerts/alert-service-icon2.png";
import ChartWrapper from "./Components/ChartWrapper";
import LineChart from "./Components/LineChart";
import { List } from "reactstrap";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spendingTrendData: {
        current: [],
        forcast: [],
        previous: [],
      },
    };
  }

  // Render no data html
  renderNoDataHtml = () => {
    return (
      <Box className="chart-loader">
        <h5 className="m-t-0 m-b-0">There are no data available.</h5>
      </Box>
    );
  };

  render() {
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>MONITOR OVERVIEW</h3>
          <Box>
            <Button className="primary-btn min-width-inherit p-l-15 p-r-15 m-r-2">
              <i className="fas fa-bars m-r-2"></i>
              Manage workflow
            </Button>
            <Button className="light-btn p-l-15 p-r-15">
              Manage workflow
              <i className="fas fa-ellipsis-h p-l-10"></i>
            </Button>
          </Box>
        </Box>
        <Box className="alert-sevice-boxs">
          <Box
            className="alert-service-box"
            onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts/monitor-alerts`)}
          >
            <Box class="container">
              <Box class="ui-widgets">
                <Box class="ui-values">85%</Box>
              </Box>
            </Box>
            <Box className="service-content">
              <Box className="title">Total Alerts</Box>
              <Box className="d-flex" alignItems={"flex-end"}>
                <label className="m-b-0 m-r-2">43,833</label>
                <Box className="d-flex alert-present" alignItems={"flex-end"}>
                  <i className="fas fa-caret-up m-r-1"></i>
                  <span>10%</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="alert-service-box">
            <Box className="service-image">
              <img src={AlertServiceIcon1} alt="" />
            </Box>
            <Box className="service-content">
              <Box className="title">Total Alert Rules</Box>
              <label className="m-b-0">24</label>
            </Box>
          </Box>
          <Box className="alert-service-box">
            <Box className="service-image workflows">
              <img src={AlertServiceIcon2} alt="" />
            </Box>
            <Box className="service-content">
              <Box className="title">Workflows</Box>
              <label className="m-b-0">64</label>
            </Box>
          </Box>
        </Box>
        <Box className="alerts-charts">
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} lg={5}>
              <ChartWrapper
                ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Average wait time alert`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <ChartWrapper
                ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Alert Volume Trends`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={2}>
              <Box className="team-metrics">
                <Box className="heading">Team Metrics</Box>
                <List>
                  <ListItem>
                    <Box className="title">John</Box>
                    <span>650</span>
                    <label>17 Mins</label>
                  </ListItem>
                  <ListItem>
                    <Box className="title">Bill</Box>
                    <span>612</span>
                    <label>17 Mins</label>
                  </ListItem>
                  <ListItem>
                    <Box className="title">Lyna</Box>
                    <span>598</span>
                    <label>17 Mins</label>
                  </ListItem>
                  <ListItem>
                    <Box className="title">Steyn</Box>
                    <span>513</span>
                    <label>17 Mins</label>
                  </ListItem>
                  <ListItem>
                    <Box className="title">Bob</Box>
                    <span>498</span>
                    <label>17 Mins</label>
                  </ListItem>
                  <ListItem>
                    <Box className="title">bill</Box>
                    <span>321</span>
                    <label>17 Mins</label>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} lg={2}>
              <Box className="top-alert">
                <Box className="heading">Top Alerts Today</Box>
                <List>
                  <ListItem>
                    <Box className="d-flex align-items-center">
                      <span style={{ backgroundColor: "#17D74D" }}></span>
                      <Box className="title">CPU Utilization</Box>
                    </Box>
                    <Box className="alert-count">654</Box>
                    <Box className="alert-button">High</Box>
                  </ListItem>
                  <ListItem>
                    <Box className="d-flex align-items-center">
                      <span style={{ backgroundColor: "#FF6A2A" }}></span>
                      <Box className="title">AWS S3</Box>
                    </Box>
                    <Box className="alert-count">654</Box>
                    <Box className="alert-button medium">Medium</Box>
                  </ListItem>
                  <ListItem>
                    <Box className="d-flex align-items-center">
                      <span style={{ backgroundColor: "#AE2AFF" }}></span>
                      <Box className="title"> Dard Disk </Box>
                    </Box>
                    <Box className="alert-count">654</Box>
                    <Box className="alert-button low">Low</Box>
                  </ListItem>
                  <ListItem>
                    <Box className="d-flex align-items-center">
                      <span style={{ backgroundColor: "#20DFB1" }}></span>
                      <Box className="title"> Network IN </Box>
                    </Box>
                    <Box className="alert-count">654</Box>
                    <Box className="alert-button"> High</Box>
                  </ListItem>
                  <ListItem>
                    <Box className="d-flex align-items-center">
                      <span style={{ backgroundColor: "#FF2AB7" }}></span>
                      <Box className="title">Network OUT </Box>
                    </Box>
                    <Box className="alert-count">654</Box>
                    <Box className="alert-button medium">Medium</Box>
                  </ListItem>
                  <ListItem>
                    <Box className="d-flex align-items-center">
                      <span style={{ backgroundColor: "#FFC32A" }}></span>
                      <Box className="title"> VCenter</Box>
                    </Box>
                    <Box className="alert-count">654</Box>
                    <Box className="alert-button low">Low</Box>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <ChartWrapper
                ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Alert Volume By trends`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <ChartWrapper
                ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Average response time alert`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default navigateRouter(index);
