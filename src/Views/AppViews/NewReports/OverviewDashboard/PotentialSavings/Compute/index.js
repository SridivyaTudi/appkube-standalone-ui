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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

let riData = [
  {
    resourceType: "EC2",
    InstanceId: "i-0c1234dc",
    recommendation: "RI",
    currentInstance: "t4g.2xlarge",
    recommendedInstance: "t2.2xlarge",
    terms: "1yr RI",
    paymentMode: "No Upfront",
    UpfrontCost: "$0",
    hrCost: "$0.2300",
    estimatedSavings: "~$530",
    totalSpend: "$196.22",
  },
  {
    resourceType: "ECS",
    InstanceId: "i-0c1234dc",
    recommendation: "RI",
    currentInstance: "t4g.2xlarge",
    recommendedInstance: "t2.2xlarge",
    terms: "1yr RI",
    paymentMode: "No Upfront",
    UpfrontCost: "$0",
    hrCost: "$0.2300",
    estimatedSavings: "~$530",
    totalSpend: "$196.22",
  },
  {
    resourceType: "LAMBDA",
    InstanceId: "i-0c1234dc",
    recommendation: "RI",
    currentInstance: "t4g.2xlarge",
    recommendedInstance: "t2.2xlarge",
    terms: "1yr RI",
    paymentMode: "No Upfront",
    UpfrontCost: "$0",
    hrCost: "$0.2300",
    estimatedSavings: "~$530",
    totalSpend: "$196.22",
  },
  {
    resourceType: "EC2",
    InstanceId: "i-0c1234dc",
    recommendation: "RI",
    currentInstance: "t4g.2xlarge",
    recommendedInstance: "t2.2xlarge",
    terms: "1yr RI",
    paymentMode: "No Upfront",
    UpfrontCost: "$0",
    hrCost: "$0.2300",
    estimatedSavings: "~$530",
    totalSpend: "$196.22",
  },
];
class Compute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      accounts: riData,
      showSelectFilterModal: false,
    };
  }
  //  Render table head
  renderTableHead = () => {
    return (
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
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { accounts } = this.state;
    return (
      <TableBody>
        {accounts?.length ? (
          accounts.map((details) => {
            return (
              <TableRow>
                <TableCell align="left">{details.resourceType}</TableCell>
                <TableCell align="center">{details.InstanceId}</TableCell>
                <TableCell align="center">{details.recommendation} </TableCell>
                <TableCell align="center">{details.currentInstance}</TableCell>
                <TableCell align="center">
                  {details.recommendedInstance}
                </TableCell>
                <TableCell align="center">{details.terms} </TableCell>
                <TableCell align="center">{details.paymentMode}</TableCell>
                <TableCell align="center">{details.UpfrontCost}</TableCell>
                <TableCell align="center">{details.hrCost}</TableCell>
                <TableCell align="center">{details.estimatedSavings}</TableCell>
                <TableCell align="center">{details.totalSpend}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">There are no data available.</h5>
            </Box>
          </Box>
        )}
      </TableBody>
    );
  };

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { accounts } = this.state;
    let data = riData || [];
    if (data?.length) {
      if (value) {
        accounts = data.filter((tableData) => {
          if (
            tableData?.resourceType.toLowerCase().includes(value.toLowerCase())
          ) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        accounts = data;
      }
      this.setState({ accounts, searchedKey: value });
    }
  };
  render() {
    let { searchedKey } = this.state;
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <Box className="reports-charts">
          <Grid container spacing={3}>
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
        <Box className="table-head">
          <Box className="d-block">
            <h4 className="m-t-0 m-b-0">Top RI Recommendations</h4>
          </Box>
          <Box className="search m-r-0">
            <input
              type="text"
              className="input"
              placeholder="Search Insatnce "
              value={searchedKey}
              onChange={this.handleSearchChange}
              autoFocus="autoFocus"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </Box>
        <Box className="new-reports-table">
          <TableContainer className="table">
            <Table style={{ width: 2300 }}>
              {this.renderTableHead()}
              {this.renderTableBody()}
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default Compute;
