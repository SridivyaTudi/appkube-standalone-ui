import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import VerticalBarchart from "Views/AppViews/NewReports/Components/VerticalBarchart";
import DonutChart from "Views/AppViews/NewReports/Components/DonutChart";
import TimeSpendComponent from "Views/AppViews/NewReports/Components/TimeSpendComponent";
import GroupedBarplotChart from "Views/AppViews/NewReports/Components/GroupedBarplotChart";
import HorizontalBarChart from "Views/AppViews/NewReports/Components/HorizontalBarChart";
const totalUsedServiceData = [
  { label: "EC2", value: 4700, color: "#FA6298" },
  { label: "RDS", value: 4500, color: "#FA6298" },
  { label: "S3", value: 4300, color: "#FA6298" },
  { label: "EKS", value: 4000, color: "#FA6298" },
  { label: "Lambda", value: 3800, color: "#FA6298" },
];
let costOfTopAccounts = [
  { name: "IT Infra", value: 55000 },
  { name: "IT Security", value: 45000 },
  { name: "IT Ops", value: 40000 },
  { name: "IT Dev", value: 35000 },
  { name: "Analytics", value: 30000 },
  { name: "HR", value: 25050 },
  { name: "Marketing", value: 20050 },
  { name: "Finance", value: 15550 },
  { name: "Sales", value: 10550 },
  { name: "R&D", value: 10400 },
];
let verticalBarChartData = [
  {
    name: "EC2",
    value: 11100,
  },
  {
    name: "EBS ",
    value: 7984,
  },
  {
    name: "DynamoDB",
    value: 6088,
  },
  {
    name: "Redshift",
    value: 6105,
  },
  {
    name: "AWS Lambda",
    value: 5445,
  },
  {
    name: "AWS S3",
    value: 5245,
  },
  {
    name: "Cloud Front",
    value: 5145,
  },
  {
    name: "API Gateways",
    value: 4445,
  },
  {
    name: "AWS SNS",
    value: 3445,
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
    age_group: "Database",
    population: 53980105,
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
  {
    name: "Year to Date Spend ",
    value: "$3,00,000",
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
            <Grid item xs={7}>
              <ChartWrapper
                data={{
                  title: "Most used services",
                  labelOfBtn: "View Details",
                  link: "",
                }}
                ChartComponent={
                  <HorizontalBarChart data={totalUsedServiceData} />
                }
              />
            </Grid>
            <Grid item xs={5}>
              <ChartWrapper
                data={{
                  title: "Cost of Top Accounts",
                  labelOfBtn: "View Details",
                  link: "",
                }}
                ChartComponent={
                  <VerticalBarchart
                    data={costOfTopAccounts}
                    styleProp={{
                      color: "#53CA43",
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ChartWrapper
                data={{
                  title: "Spend Overview",
                  labelOfBtn: " View Details",
                  link: "",
                }}
                ChartComponent={
                  <DonutChart
                    data={donutData}
                    width={250}
                    height={300}
                    otherData={{
                      centerValue: "$10,000",
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ChartWrapper
                data={{
                  title: "Spend Overview",
                  labelOfBtn: " View Details",
                  link: "",
                }}
                ChartComponent={
                  <DonutChart
                    data={donutData}
                    width={250}
                    height={300}
                    otherData={{
                      centerValue: "$10,000",
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={4}>
              <ChartWrapper
                data={{
                  title: "Spend Overview",
                  labelOfBtn: " View Details",
                  link: "",
                }}
                ChartComponent={
                  <DonutChart
                    data={donutData}
                    width={250}
                    height={300}
                    otherData={{
                      centerValue: "$10,000",
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
