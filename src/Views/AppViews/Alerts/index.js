import React, { Component } from "react";
import { Box, Button, Grid, ListItem } from "@mui/material";
import AlertServiceIcon1 from "../../../assets/img/alerts/alert-service-icon1.png";
import AlertServiceIcon2 from "../../../assets/img/alerts/alert-service-icon2.png";
import ChartWrapper from "./Components/ChartWrapper";
import LineChart from "./Components/LineChart";
import { List } from "reactstrap";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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

  teamMetricsMapping = [
    {
      name: "John",
      price: "650",
      time: "17 Mins",
    },
    {
      name: "Bill",
      price: "612",
      time: "17 Mins",
    },
    {
      name: "Lyna",
      price: "598",
      time: "17 Mins",
    },
    {
      name: "Steyn",
      price: "513",
      time: "17 Mins",
    },
    {
      name: "Bob",
      price: "498",
      time: "17 Mins",
    },
    {
      name: "bill",
      price: "321",
      time: "17 Mins",
    },
  ];
  topAlertsMapping = [
    {
      stateClassList: "green",
      name: "CPU Utilization",
      time: "3:24",
      button: "High",
      stateClass: "high",
    },
    {
      stateClassList: "orange",
      name: "AWS S3",
      time: "3:11",
      button: "Medium",
      stateClass: "medium",
    },
    {
      stateClassList: "purple",
      name: "Dard Disk",
      time: "3:00",
      button: "Low",
      stateClass: "low",
    },
    {
      stateClassList: "aqua-green",
      name: "Network IN",
      time: "23:08",
      button: "High",
      stateClass: "high",
    },
    {
      stateClassList: "neon-pink",
      name: "Network OUT",
      time: "21:06",
      button: "Medium",
      stateClass: "medium",
    },
    {
      stateClassList: "yellow",
      name: "VCenter",
      time: "20:03",
      button: "Low",
      stateClass: "low",
    },
  ];

  // Render no data html
  renderNoDataHtml = () => {
    return (
      <Box className="chart-loader">
        <h5 className="m-t-0 m-b-0">There are no data available.</h5>
      </Box>
    );
  };
  // Render TeamMetrics
  renderTeamMetrics = () => {
    const {} = this.state;
    return (
      <List>
        {this.teamMetricsMapping.map((teamMetrics) => {
          return (
            <ListItem>
              <Box className="title">{teamMetrics.name}</Box>
              <span>{teamMetrics.price}</span>
              <label>{teamMetrics.time}</label>
            </ListItem>
          );
        })}
      </List>
    );
  };

  // Render TopAlerts
  renderTopAlerts = () => {
    const {} = this.state;
    return (
      <List>
        {this.topAlertsMapping.map((topAlerts) => {
          return (
            <ListItem>
              <Box className="d-flex align-items-center">
                <span
                  className={` ${
                    topAlerts.stateClassList ? topAlerts.stateClassList : ""
                  }`}
                ></span>
                <Box className="title">
                  <HtmlTooltip className="table-tooltip" title={topAlerts.name}>
                    {topAlerts.name}
                  </HtmlTooltip>
                </Box>
              </Box>
              <Box className="alert-count">{topAlerts.time}</Box>
              <Box
                className={`alert-button ${
                  topAlerts.stateClass ? topAlerts.stateClass : ""
                }`}
              >
                {topAlerts.button}
              </Box>
            </ListItem>
          );
        })}
      </List>
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
            onClick={() =>
              this.props.navigate(`${APP_PREFIX_PATH}/alerts/monitor-alerts`)
            }
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
          <Box
            className="alert-service-box"
            onClick={() =>
              this.props.navigate(`${APP_PREFIX_PATH}/alerts/alert-rules`)
            }
          >
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
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <ChartWrapper
                // ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Average wait time alert`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <ChartWrapper
                // ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Alert Volume Trends`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Box className="team-metrics">
                <Box className="heading">Team Metrics</Box>
                {this.renderTeamMetrics()}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={2}>
              <Box className="top-alert">
                <Box className="heading">Top Alerts Today</Box>
                {this.renderTopAlerts()}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <ChartWrapper
                // ChartComponent={<LineChart data={[]} color="pink" />}
                data={{
                  title: `Alert Volume By trends`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <ChartWrapper
                // ChartComponent={<LineChart data={[]} color="pink" />}
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
