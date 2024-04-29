import React, { Component } from "react";
import { Box, Button, Grid } from "@mui/material";
import AlertServiceIcon1 from "../../../assets/img/alerts/alert-service-icon1.png";
import AlertServiceIcon2 from "../../../assets/img/alerts/alert-service-icon2.png";
import ChartWrapper from "./Components/ChartWrapper";
import LineChart from "./Components/LineChart";

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
          <Box className="alert-service-box">
            <Box className="service-image">
              <img src={AlertServiceIcon1} alt="" />
            </Box>
            <Box className="service-content">
              <Box className="title">Total Alerts</Box>
              <label className="m-b-0">43,833</label>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={5}>
              <ChartWrapper
                ChartComponent={
                  <LineChart data={[]} color="pink" />
                }
                data={{
                  title: `Forcast Spending Trend`,
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/over-view-dashboard/spending-trend",
                }}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <h2>chart 2</h2>
            </Grid>
            <Grid item xs={12} md={5} lg={2}>
              <h2>chart 3</h2>
            </Grid>
            <Grid item xs={12} md={5} lg={2}>
              <h2>chart 4</h2>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <h2>chart 5</h2>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <h2>chart 6</h2>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default index;
