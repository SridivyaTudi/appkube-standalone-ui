import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import ChartWrapper from "../../../Components/ChartWrapper";
import DonutChart from "../../../Components/DonutChart";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import VerticalBarchart from "../../../Components/VerticalBarchart";

let donutData = [
  {
    age_group: "Reserved Instance",
    population: 110011100,
  },
  {
    age_group: "Savings Plan",
    population: 40267984,
  },
  {
    age_group: "RightSizing",
    population: 30672088,
  },
  {
    age_group: "Spot Instances",
    population: 53980105,
  },
  {
    age_group: "Others",
    population: 81489445,
  },
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
    name: "Total Savings ",
    value: "$110,000",
    percentage: "5",
    subName: " vs Last Month",
  },
];
class Compute extends Component {
  render() {
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <Box className="reports-charts">
          <Grid
            container
           spacing={3}
          >
            <Grid item xs={12} md={6} lg={4}>
              <ChartWrapper
                data={{
                  title: "Total savings",
                  labelOfBtn: " View Details",
                }}
                ChartComponent={
                  <DonutChart
                    data={donutData}
                    width={270}
                    height={270}
                    otherData={{
                      centerValue: "$65,690",
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <ChartWrapper
                ChartComponent={
                  <VerticalBarchart
                    data={verticalBarChartData}
                    styleProp={{
                      color: "#53CA43",
                    }}
                  />
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
        <h4>Top RI Recommendations</h4>
        <Box className="new-reports-table">
          <TableContainer className="table">
            <Table style={{ width: 2300 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">resource type</TableCell>
                  <TableCell align="center">Instance ID </TableCell>
                  <TableCell align="center">Recommendation</TableCell>
                  <TableCell align="center">current instance </TableCell>
                  <TableCell align="center">recommended Instance</TableCell>
                  <TableCell align="center">terms</TableCell>
                  <TableCell align="center">payment mode </TableCell>
                  <TableCell align="center">Upfront cost </TableCell>
                  <TableCell align="center">per hour cost </TableCell>
                  <TableCell align="center">estimated Savings</TableCell>
                  <TableCell align="center">Total spend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">EC2</TableCell>
                  <TableCell align="center">i-0c1234dc</TableCell>
                  <TableCell align="center">RI </TableCell>
                  <TableCell align="center">t4g.2xlarge</TableCell>
                  <TableCell align="center">t2.2xlarge </TableCell>
                  <TableCell align="center">1yr RI </TableCell>
                  <TableCell align="center">No Upfront</TableCell>
                  <TableCell align="center">$0</TableCell>
                  <TableCell align="center">$0.2300</TableCell>
                  <TableCell align="center">~$530</TableCell>
                  <TableCell align="center">$196.22</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default Compute;
