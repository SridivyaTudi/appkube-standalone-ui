import React, { Component } from "react";
import Planet from "assets/img/dashboard/planet2.png";
import { Box, Grid } from "@mui/material";
import chartIcon from "../../../assets/img/chart-icon.png";
import aws from "../../../assets/img/aws.png";
import microsoftazure from "../../../assets/img/microsoftazure.png";
import googleCloud from "../../../assets/img/google-cloud.png";
import oracle from "../../../assets/img/oracle.png";
import CloudCostMonthChart from "./CloudCostMonthChart";
import AwsMonthlySpendRegionChart from "./AwsMonthlySpendRegionChart";
import CostAWSAccountsChart from "./CostAWSAccountsChart";
import CostDepartmentProductsChart from "./CostDepartmentProductsChart";
import CostsComputeChart from "./CostsComputeChart";
import CloudCostByDepartMent from "./CloudCostByDepartMent";
import CostByDepartmentProducts from "./CostByDepartmentProducts";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    this.removeTooltipElement()
  }

  removeTooltipElement = () => {
    try {
      const elements = document.getElementsByClassName("chart-tooltip");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
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
            <Grid item xs={12} md={6} lg={3}>
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
            <Grid item xs={12} md={6} lg={3}>
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
            <Grid item xs={12} md={6} lg={3}>
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
            <Grid item xs={12} md={6} lg={3}>
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
            <Grid item xs={12} md={12} lg={6}>
              <Box className="chart-box">
                <Box className="heading m-b-10">Cloud Cost by Month</Box>
                <CloudCostMonthChart />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Box className="chart-box">
                <Box className="heading m-b-10">
                  <img src={chartIcon} alt="" /> AWS Monthly Spend by Region
                </Box>
                <AwsMonthlySpendRegionChart />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Box className="chart-box">
                <Box className="heading">Cost by AWS Accounts</Box>
                <Box className="d-block width-100 cost-accounts-boxes">
                  <ul className="d-block width-100 text-center">
                    <li>
                      <span style={{ backgroundColor: "#B399FF" }}></span>{" "}
                      AWS167263
                    </li>
                    <li>
                      <span style={{ backgroundColor: "#F08397" }}></span>{" "}
                      AWS167264
                    </li>
                    <li>
                      <span style={{ backgroundColor: "#F2BB23" }}></span>{" "}
                      AWS167265
                    </li>
                    <li>
                      <span style={{ backgroundColor: "#519FFF" }}></span>{" "}
                      AWS167266
                    </li>
                  </ul>
                </Box>
                <Box className="d-block width-100 text-center">
                  <CostAWSAccountsChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Box className="chart-box">
                <Box className="heading">
                  <img src={chartIcon} alt="" /> Cloud Cost by Department
                </Box>
                <Box className="d-block width-100 cloud-department-chart">
                  <CloudCostByDepartMent />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="chart-box department-chart">
                <CostDepartmentProductsChart />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="chart-box">
                <CostsComputeChart />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="chart-box department-chart">
                <CostByDepartmentProducts />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default Reports;
