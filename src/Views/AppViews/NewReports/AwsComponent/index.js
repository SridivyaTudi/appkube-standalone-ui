import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChartWrapper from "../Components/ChartWrapper";
import HorizontalBarChart from "Views/AppViews/NewReports/Components/HorizontalBarChart";
const totalUsedServiceData = [
  { label: "EC2", value: 4700, color: "#A145FF" },
  { label: "RDS", value: 4500, color: "#FA6298" },
  { label: "S3", value: 4300, color: "#FAA24B" },
  { label: "EKS", value: 4000, color: "#F9D33D" },
  { label: "Lambda", value: 3800, color: "#F9D33D" },
];
class AwsComponent extends Component {
  render() {
    return (
      <>
        <Box className="reports-charts">
          <ChartWrapper
            ChartComponent={
              <HorizontalBarChart
                data={totalUsedServiceData}
                style={{ height: 250, width: 300 }}
              />
            }
            data={{
              title: "Spend Overview",
              labelOfBtn: " View Details",
            }}
            style={{ height: '450px', width: '840px' }}
          />
        </Box>
      </>
    );
  }
}

export default AwsComponent;
