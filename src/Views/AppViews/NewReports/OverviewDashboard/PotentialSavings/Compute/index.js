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
import { connect } from "react-redux";
import {
  getComputeSummary,
  getPotentialTotalSaving,
  getPotentialMonthlySaving,
} from "Redux/Reports/ReportsThunk";
import { getCurrentOrgId } from "Utils";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";

const totalUsedServiceColor = {
  SPOT: "#01f1e3",
  RESERVED: "#fa71a3",
  OTHERS: "#f9d33d",
  RIGHTSIZE: "#ffba69",
  SAVING_PLAN: "#8676ff",
  CURRENT_TOTAL: "#2b5aff",
};

// let donutData = [
//   {
//     age_group: "Reserved Instance",
//     population: 110011100,
//   },
//   {
//     age_group: "Savings Plan",
//     population: 40267984,
//   },
//   {
//     age_group: "RightSizing",
//     population: 30672088,
//   },
//   {
//     age_group: "Spot Instances",
//     population: 53980105,
//   },
//   {
//     age_group: "Others",
//     population: 81489445,
//   },
// ];
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

// let computeSummaryData = [
//   {
//     name: "This Quarter Savings ",
//     value: "$85,000",
//     percentage: "15",
//     subName: "vs Last Quarter",
//   },
//   {
//     name: "Forecasting Savings",
//     value: "$90,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
//   {
//     name: "Last Quarter savings ",
//     value: "$80,000",
//     percentage: "5",
//     subName: "vs Previous Month",
//   },
//   {
//     name: "Total Savings ",
//     value: "$110,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
// ];

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
      updatedSummaryData: [],
      potentialTotalSavingData: [],
      spendPotentialSavingTotal: 0,
    };
  }

  allAPICall = () => {
    this.props.getComputeSummary({
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      serviceCategory: "all",
      orgId: getCurrentOrgId(),
    });

    this.props.getPotentialTotalSaving({
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      serviceCategory: "all",
      orgId: getCurrentOrgId(),
    });
    this.props.getPotentialMonthlySaving({
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      serviceCategory: "all",
      orgId: getCurrentOrgId(),
    });
  };
  componentDidMount = () => {
    this.allAPICall(this.props.selectedGranularity);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.computeSummaryData.status !==
        this.props.computeSummaryData.status &&
      this.props.computeSummaryData.status === status.SUCCESS &&
      this.props.computeSummaryData?.data
    ) {
      const computeSummaryData = this.props.computeSummaryData.data;
      if (computeSummaryData) {
        this.maniplatecomputeSummaryData(computeSummaryData.data);
      }
    }

    if (
      prevProps.potentialTotalSavingData.status !==
        this.props.potentialTotalSavingData.status &&
      this.props.potentialTotalSavingData.status === status.SUCCESS &&
      this.props.potentialTotalSavingData?.data
    ) {
      const potentialTotalSavingData = this.props.potentialTotalSavingData.data;
      if (potentialTotalSavingData) {
        this.maniplatePotentialTotalSavingData(potentialTotalSavingData.data);
      }
    }

    if (
      prevProps.potentialMonthlySavingData.status !==
        this.props.potentialMonthlySavingData.status &&
      this.props.potentialMonthlySavingData.status === status.SUCCESS &&
      this.props.potentialMonthlySavingData?.data
    ) {
      const potentialMonthlySavingData =
        this.props.potentialMonthlySavingData.data;
      if (potentialMonthlySavingData) {
        this.maniplatepotentialMonthlySavingData(
          potentialMonthlySavingData.data
        );
      }
    }
  }

  maniplatecomputeSummaryData = (data) => {
    const updatedSummaryData = data.map((item) => {
      let name = item.label;
      let value = `$${parseFloat(item.currentTotal).toFixed(2)}`;
      let percentage = item.variance;
      let subName = `vs Previous Month`;
      return { name, value, percentage, subName };
    });

    this.setState({ computeSummaryData: updatedSummaryData });
  };

  maniplatePotentialTotalSavingData = (data) => {
    let { potentialTotalSavingData, spendPotentialSavingTotal } = this.state;
    spendPotentialSavingTotal = 0;
    potentialTotalSavingData = [];
    if (data?.length) {
      const totalValue = data
        .filter((e) => e.instanceType !== "CURRENT_TOTAL")
        .reduce((acc, crr) => (acc += +crr.total), 0);
      data.forEach((obj) => {
        if (!["CURRENT_TOTAL"].includes(obj.instanceType)) {
          potentialTotalSavingData.push({
            age_group: obj.instanceType,
            population: obj.total,
            percentage: ((obj.total * 100) / totalValue).toFixed(2),
          });
        } else {
          spendPotentialSavingTotal = parseInt(obj.total);
        }
      });
    }
    this.setState({ potentialTotalSavingData, spendPotentialSavingTotal });
  };

  maniplatepotentialMonthlySavingData = (data) => {
    let { potentialMonthlySavingData } = this.state;
    potentialMonthlySavingData = [];
    if (data?.length) {
      potentialMonthlySavingData = data.map((obj) => {
        return {
          name: obj.date,
          value: obj.total,
        };
      });
    }
    this.setState({ potentialMonthlySavingData });
  };

  renderLoder = () => {
    return (
      <Box className="summary-loader">
        <Loader />
      </Box>
    );
  };
  renderNoDataHtml = () => {
    return (
      <Box className="chart-loader">
        <h5 className="m-t-0 m-b-0">There are no data available.</h5>
      </Box>
    );
  };
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
    let {
      searchedKey,
      computeSummaryData,
      potentialTotalSavingData,
      spendPotentialSavingTotal,
      potentialMonthlySavingData,
    } = this.state;
    let {
      computeSummaryData: computeSummaryProps,
      potentialMonthlySavingData: potentialMonthlySavingProps,
      potentialTotalSavingData: potentialTotalSavingProps,
    } = this.props;
    let computeSummaryLoder = computeSummaryProps.status === status.IN_PROGRESS;
    let potentialMonthlySavingLoder =
      potentialMonthlySavingProps.status === status.IN_PROGRESS;
    let potentialTotalSavingLoder =
      potentialTotalSavingProps.status === status.IN_PROGRESS;
    return (
      <>
        {computeSummaryLoder ? (
          this.renderLoder()
        ) : (
          <TimeSpendComponent data={computeSummaryData} />
        )}
        <Box className="reports-charts">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <ChartWrapper
                data={{
                  title: "Total savings",
                  labelOfBtn: " View Details",
                }}
                ChartComponent={
                  potentialTotalSavingLoder ? (
                    this.renderLoder()
                  ) : potentialTotalSavingData.length ? (
                    <DonutChart
                      data={potentialTotalSavingData}
                      width={250}
                      height={300}
                      otherData={{
                        centerValue: `$${spendPotentialSavingTotal}`,
                      }}
                    />
                  ) : (
                    this.renderNoDataHtml()
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <ChartWrapper
                ChartComponent={
                  potentialMonthlySavingLoder ? (
                    this.renderLoder()
                  ) : potentialMonthlySavingData?.length ? (
                    <VerticalBarchart
                      data={potentialMonthlySavingData}
                      styleProp={{
                        color: "#53CA43",
                      }}
                    />
                  ) : (
                    this.renderNoDataHtml()
                  )
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
function mapStateToProps(state) {
  const {
    computeSummaryData,
    potentialTotalSavingData,
    potentialMonthlySavingData,
  } = state.reports;
  return {
    computeSummaryData,
    potentialTotalSavingData,
    potentialMonthlySavingData,
  };
}

const mapDispatchToProps = {
  getComputeSummary,
  getPotentialTotalSaving,
  getPotentialMonthlySaving,
};
export default connect(mapStateToProps, mapDispatchToProps)(Compute);
