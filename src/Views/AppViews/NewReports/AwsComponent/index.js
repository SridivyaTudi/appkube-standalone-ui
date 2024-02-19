import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import ChartWrapper from "../Components/ChartWrapper";
import HorizontalBarChart from "Views/AppViews/NewReports/Components/HorizontalBarChart";
import VerticalBarchart from "Views/AppViews/NewReports/Components/VerticalBarchart";
import DonutChart from "Views/AppViews/NewReports/Components/DonutChart";
const totalUsedServiceData = [
  { label: "EC2", value: 4700, color: "#A145FF" },
  { label: "RDS", value: 4500, color: "#FA6298" },
  { label: "S3", value: 4300, color: "#FAA24B" },
  { label: "EKS", value: 4000, color: "#F9D33D" },
  { label: "Lambda", value: 3800, color: "#F9D33D" },
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

class AwsComponent extends Component {
  render() {
    return (
      <>
        <Box className="reports-charts">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={3}>
              <ChartWrapper
                data={{
                  title: "Spend Overview",
                  labelOfBtn: " View Details",
                }}
                ChartComponent={
                  <DonutChart data={donutData} width={250} height={250} />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <ChartWrapper
                ChartComponent={
                  <HorizontalBarChart
                    data={totalUsedServiceData}
                    chardBeforeRenderHTML={
                      <Box className="total-cost-incurred">
                        <label>Total Cost Incurred</label>
                        <p>
                          {" "}
                          90,579{" "}
                          <span>
                            {" "}
                            <i class="fas fa-sort-up p-l-5"></i> 10 &#37;
                          </span>
                        </p>
                      </Box>
                    }
                    // style={{ height: 250, width: 300 }}
                  />
                }
                data={{
                  title: "Top Used Service ",
                  labelOfBtn: " View Details",
                }}
                // style={{ height: '450px', width: '840px' }}
              />
            </Grid>
            <Grid item xs={3}>
              <ChartWrapper
                ChartComponent={
                  <HorizontalBarChart
                    data={totalUsedServiceData}
                    // style={{ height: 250, width: 300 }}
                  />
                }
                data={{
                  title: "Potential Savings",
                  labelOfBtn: " View Details",
                }}
                // style={{ height: '450px', width: '840px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <ChartWrapper
                ChartComponent={
                  <VerticalBarchart data={verticalBarChartData} />
                }
                data={{
                  title: "Top Used Service ",
                  labelOfBtn: " View Details",
                }}
                // style={{ height: '450px', width: '840px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <ChartWrapper
                ChartComponent={
                  <HorizontalBarChart
                    data={totalUsedServiceData}
                    // style={{ height: 250, width: 300 }}
                  />
                }
                data={{
                  title: "Top Used Service ",
                  labelOfBtn: " View Details",
                }}
                // style={{ height: '450px', width: '840px' }}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default AwsComponent;
