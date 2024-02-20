import React, { Component } from "react";
import {
  Box,
  Button,
  IconButton, Grid
} from "@mui/material";
import ChartWrapper from "../Components/ChartWrapper";
import VerticalBarchart from "../Components/VerticalBarchart";
import { Link } from "react-router-dom";

let verticalBarChartData = [
  {
    label: "Compute Cost",
    value: 110011100,
  },
  {
    label: "Network ",
    value: 40267984,
  },
  {
    label: "Storage",
    value: 30672088,
  },
  {
    label: "Database",
    value: 53980105,
  },
  {
    label: "Others",
    value: 81489445,
  },
  
];

class SpendingTrend extends Component {
  render() {
    return (
      <Box className="new-reports-container spend-overview-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            SPENDING TREND
          </h3>
          <Box className="d-flex ">
            <Button className="light-btn p-l-15 p-r-15 m-r-3">
              <i className="fas fa-filter m-r-2"></i> Filter
            </Button>
            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Month
            </Button>
          </Box>
        </Box>
        <Box className="reports-tab-section m-t-3">
        <Box className="reports-charts">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
           
            <Grid item xs={12}>
              <ChartWrapper
                ChartComponent={
                  <VerticalBarchart data={verticalBarChartData} />
                }
                data={{
                  title: "Monthly Savings",
                  labelOfBtn: " View Details",
                }}
                // style={{ height: '450px', width: '840px' }}
              />
            </Grid>
          </Grid>
        </Box>
        </Box>
      </Box>
    );
  }
}

export default SpendingTrend;
