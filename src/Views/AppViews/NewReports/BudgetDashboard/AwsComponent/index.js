import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import VerticalBarchart from "Views/AppViews/NewReports/Components/VerticalBarchart";
import DonutChart from "Views/AppViews/NewReports/Components/DonutChart";
import GroupedBarplotChart from "Views/AppViews/NewReports/Components/GroupedBarplotChart";
import TimeSpendComponent from "Views/AppViews/NewReports/Components/TimeSpendComponent";
import ProgressBarChart from "../../Components/ProgressBarChart";
import VerticalBarChart_NarrowBar from "../../Components/VerticalBarChart_NarrowBar";
const totalUsedServiceData = [
  { label: "EC2", value: 4700, color: "#A145FF" },
  { label: "RDS", value: 4500, color: "#FA6298" },
  { label: "S3", value: 4300, color: "#FAA24B" },
  { label: "EKS", value: 4000, color: "#F9D33D" },
  { label: "Lambda", value: 3800, color: "#F9D33D" },
];
let verticalBarChartData = [
  {
    name: "Month1",
    current: 12474153,
    forcast: 171068,
    previous: 12888613,
  },
  {
    name: "Month2",
    current: 12869996,
    forcast: 148428,
    previous: 12061264,
  },
  {
    name: "Month3",
    current: 0,
    forcast: 118137,
    previous: 12902894,
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

let data = [
  {
    label: "R & D",
    value: 110011100,
  },
  {
    label: "Sales and marketing ",
    value: 40267984,
  },
  {
    label: "Customer support ",
    value: 30672088,
  },
  {
    label: "Finance admin",
    value: 53980105,
  },
  {
    label: "Data Analytics",
    value: 81489445,
  },
];

let timeSpendData = [
  {
    name: "Budget Allocated",
    value: "$70,000",
    percentage: "15",
    subName: "",
  },
  {
    name: "Remaining Budget",
    value: "$15,000",
    percentage: "5",
    subName: " ",
  },
  {
    name: "Total Spend",
    value: "$55,000",
    percentage: "5",
    subName: " Till date",
  },
  {
    name: "Forecasted Spend",
    value: "$68,000",
    percentage: "5",
    subName: "Next Month",
  },
];

var potentialSavingData = [45, 33, 66, 50, 90];
class AwsComponent extends Component {
  render() {
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <Box className="reports-charts">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={7}>
              <ChartWrapper
                data={{
                  title: "Accounts With High Spending",
                  labelOfBtn: "View Details",
                  link: "/app/new-reports/budget-dashboard/budget-account",
                }}
                ChartComponent={
                  <VerticalBarChart_NarrowBar />
                  // <VerticalBarchart data={verticalBarChartData} />
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <ChartWrapper
                data={{
                  title: "Transaction Type Cost",
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
            <Grid item xs={12} md={6} lg={7}>
              <ChartWrapper
                data={{
                  title: "Top Products with High Spending",
                  description:
                    " See how your products is spending this Month vs Last Quarter",
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/budget-dashboard/budget-products",
                }}
                ChartComponent={
                  <GroupedBarplotChart
                    data={verticalBarChartData}
                    granularity={"Quarter"}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <ChartWrapper
                data={{
                  title: "Top Department Exceeding Budget",
                  description:
                    " See how your products is spending this Month vs Last Quarter",
                  labelOfBtn: "View Details",
                  link: "/app/new-reports/budget-dashboard/budget-depanrtments",
                }}
                ChartComponent={
                  <VerticalBarchart
                    data={[
                      { name: "R & D", value: 180 },
                      { name: "Sales and marketing", value: 170 },
                      { name: "Customer support", value: 150 },
                      { name: "Finance admin", value: 900 },
                      { name: "Data and Analytics", value: 700 },
                    ]}
                    color={"#FAA24B"}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid className="m-t-1" container spacing={3}>
            <Grid item xs={12}>
              <ChartWrapper
                data={{
                  title: "Available  Budgets",
                  description: "All Budgets within your organization",
                  labelOfBtn: "View Details",
                  link: "",
                }}
                ChartComponent={<ProgressBarChart />}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default AwsComponent;
