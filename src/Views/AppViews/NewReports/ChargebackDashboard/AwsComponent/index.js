import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import VerticalBarchart from "Views/AppViews/NewReports/Components/VerticalBarchart";
import DonutChart from "Views/AppViews/NewReports/Components/DonutChart";
import TimeSpendComponent from "Views/AppViews/NewReports/Components/TimeSpendComponent";
import GroupedBarplotChart from "Views/AppViews/NewReports/Components/GroupedBarplotChart";
const totalUsedServiceData = [
  { label: "EC2", value: 4700, color: "#A145FF" },
  { label: "RDS", value: 4500, color: "#FA6298" },
  { label: "S3", value: 4300, color: "#FAA24B" },
  { label: "EKS", value: 4000, color: "#F9D33D" },
  { label: "Lambda", value: 3800, color: "#F9D33D" },
];
let verticalBarChartData = [
  {
    name: "Jun 23",
    value: 4500,
  },
  {
    name: "July 23",
    value: 4000,
  },
  {
    name: "August 23",
    value: 4000,
  },
  {
    name: "Sept 23",
    value: 3800,
  },
  {
    name: "Oct 23",
    value: 3700,
  },
  {
    name: "Nov 23",
    value: 3700,
  },
  {
    name: "Dec 23",
    value: 3700,
  },
  {
    name: "Jan 24",
    value: 3700,
  },
  {
    name: "Feb 24",
    value: 3700,
  },
  {
    name: "March 24",
    value: 3700,
  },
];
let donutData = [
  {
    age_group: "Compute Cost",
    population: 110011100,
  },
  {
    age_group: "Network ",
    population: 40267984,
  },
  {
    age_group: "Storage",
    population: 30672088,
  },

  {
    age_group: "Others",
    population: 81489445,
  },
];

const spendTrendData = [
  {
    date: "1-05-12",
    last_quarter: 30000,
    current_quarter: 35000,
    forecasted_spend: 13000,
  },
  {
    date: "30-04-12",
    last_quarter: 35000,
    current_quarter: 40000,
    forecasted_spend: 23000,
  },
  {
    date: "27-04-12",
    last_quarter: 60000,
    current_quarter: 38000,
    forecasted_spend: 33000,
  },
  {
    date: "26-04-12",
    last_quarter: 34000,
    current_quarter: 33000,
    forecasted_spend: 44000,
  },
  {
    date: "25-04-12",
    last_quarter: 45000,
    current_quarter: 20000,
    forecasted_spend: 27000,
  },
  {
    date: "24-04-12",
    last_quarter: 33333,
    current_quarter: 22222,
    forecasted_spend: 11000,
  },
  {
    date: "23-04-12",
    last_quarter: 11111,
    current_quarter: 33333,
    forecasted_spend: 44000,
  },
  {
    date: "20-04-12",
    last_quarter: 34000,
    current_quarter: 44000,
    forecasted_spend: 40000,
  },
  {
    date: "19-04-12",
    last_quarter: 44000,
    current_quarter: 38888,
    forecasted_spend: 38000,
  },
  {
    date: "18-04-12",
    last_quarter: 33333,
    current_quarter: 11111,
    forecasted_spend: 34000,
  },
  {
    date: "17-04-12",
    last_quarter: 28000,
    current_quarter: 38000,
    forecasted_spend: 32000,
  },
  {
    date: "16-04-12",
    last_quarter: 29000,
    current_quarter: 39000,
    forecasted_spend: 30000,
  },
  {
    date: "13-04-12",
    last_quarter: 22000,
    current_quarter: 38000,
    forecasted_spend: 22000,
  },
];
let timeSpendData = [
  {
    name: "This Month Savings ",
    value: "$85,000",
    percentage: "15",
    subName: "vs Last Month",
  },
  {
    name: "Forecasting Savings",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Last Month savings ",
    value: "$80,000",
    percentage: "5",
    subName: "vs Previous Month",
  },
];
var potentialSavingData = [45, 33, 66, 50, 90];
class AwsComponent extends Component {
  render() {
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <Box className="reports-charts">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={5}>
              <ChartWrapper
                data={{
                  title: "Usage By  IT Department",
                  labelOfBtn: " View Details",
                  link: "",
                }}
                ChartComponent={
                  <DonutChart
                    data={donutData}
                    width={250}
                    height={300}
                    otherData={{
                      centerValue: "$43,000",
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={7}>
              <ChartWrapper
                data={{
                  title: "Monthly Usage by IT Department",
                  labelOfBtn: "View Details",
                  link: "",
                }}
                ChartComponent={
                  <VerticalBarchart
                    data={verticalBarChartData}
                    styleProp={{
                      color: "#53CA43",
                    }}
                  />
                }
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default AwsComponent;
