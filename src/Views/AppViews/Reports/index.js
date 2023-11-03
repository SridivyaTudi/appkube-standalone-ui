import React, { Component } from "react";
import Planet from "assets/img/dashboard/planet2.png";
import { Box, Grid } from "@mui/material";
import aws from "../../../assets/img/aws.png";
import microsoftazure from "../../../assets/img/microsoftazure.png";
import googleCloud from "../../../assets/img/google-cloud.png";
import oracle from "../../../assets/img/oracle.png";
import CloudCostMonthChart from "./CloudCostMonthChart";
import AwsMonthlySpendRegionChart from "./AwsMonthlySpendRegionChart";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;

    return (
      <Box className="reports-container">
        <Box className="reports-inner">
          <Box className="reports-bg-image">
            <img src={Planet} alt="Planet" />
          </Box>
        </Box>
        <Box className="page-heading">
          <h2>Reports</h2>
        </Box>
        <Box className="reports-service-box">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box className="service-box">
                <Box className="image">
                  <img src={aws} alt="" />
                </Box>
                <Box className="contents">
                  <span>Total Cost</span>
                  <strong>$2,340</strong>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box className="service-box">
                <Box className="image">
                  <img src={microsoftazure} alt="" />
                </Box>
                <Box className="contents">
                  <span>Total Cost</span>
                  <strong>$1,980</strong>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box className="service-box">
                <Box className="image">
                  <img src={googleCloud} alt="" />
                </Box>
                <Box className="contents">
                  <span>Total Cost</span>
                  <strong>$1,680</strong>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box className="service-box">
                <Box className="image">
                  <img src={oracle} alt="" />
                </Box>
                <Box className="contents">
                  <span>Total Cost</span>
                  <strong>$1,890</strong>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="reports-charts">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box className="chart-box">
                <Box className="heading">Cloud Cost by Month</Box>
                <CloudCostMonthChart />
              </Box>
            </Grid>
            <Grid item xs={6}>
            
            <Box className="chart-box">
                <Box className="heading">AWS Monthly Spend by Region</Box>
                <AwsMonthlySpendRegionChart />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default Reports;
