import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
let timeSpendData = [
  {
    name: "Last Quarter Spend",
    value: "$10,00",
    percentage: "20",
    subName: " More than previous month",
  },
  {
    name: "This Quarter Spend",
    value: "$70,000",
    percentage: "20",
    subName: " vs Last Quarter",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: "5",
    subName: "",
  },
];

let data = [
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
  {
    quantity: 10,
    instanceType: "t4g.2xlarge",
    instanceStatus: "10/10",
    instanceMemory: "32.0 GiB",
    vcpus: "8 vCPUs",
    instanceStorage: "EBS only",
    perHrCost: "$0.2688",
    usageHrs: "730 hours",
    addOns: "NA",
    totalSpend: "$196.22",
  },
];
class ItDepartmentDetails extends Component {
  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">quantity</TableCell>
          <TableCell align="left">Instance type</TableCell>
          <TableCell align="center">Instance Status </TableCell>
          <TableCell align="center">Instance Memory</TableCell>
          <TableCell align="center">vcpus </TableCell>
          <TableCell align="center">Instance storage </TableCell>
          <TableCell align="center">per hour cost </TableCell>
          <TableCell align="center">usage hours </TableCell>
          <TableCell align="center">Add-ons </TableCell>
          <TableCell align="center">Total spend </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    return (
      <TableBody>
        {data?.length ? (
          data.map((details) => {
            return (
              <TableRow>
                <TableCell align="left">10</TableCell>
                <TableCell align="left">
                  <Link to={`#`}>t4g.2xlarge</Link>
                </TableCell>
                <TableCell align="center">10/10</TableCell>
                <TableCell align="center">32.0 GiB</TableCell>
                <TableCell align="center">8 vCPUs</TableCell>
                <TableCell align="center">EBS only</TableCell>
                <TableCell align="center">
                  <strong>$0.2688</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>730 hours</strong>
                </TableCell>
                <TableCell align="center">NA</TableCell>
                <TableCell align="center">
                  <strong>$196.22</strong>
                </TableCell>
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
  render() {
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>IT Department details</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate("/app/new-reports/chargeback-dashboard")
                }
              >
                Chargeback Dashboard
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(
                    "/app/new-reports/chargeback-dashboard/department"
                  )
                }
              >
                IT Department
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">IT Department details</li>
            </ul>
          </Box>
        </Box>
        <Box className="d-flex d-flex align-items-center justify-content-end m-t-2 ">
          <Link to={`/app/new-reports/chargeback-dashboard/create-invoice`}>
            <Button className="light-btn p-l-15 p-r-15 m-r-3">
              <i class="fas fa-plus-circle m-r-2"></i> Create Invoice
            </Button>
          </Link>
          <Button className="light-btn p-l-15 p-r-15">
            <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
          </Button>
        </Box>
        <Box className="reports-tab-section m-t-3">
          <TimeSpendComponent data={timeSpendData} />
          <Box className="table-head">
            <Box className="d-block">
              <h4 className="m-t-0 m-b-0">Number of Instances </h4>
              <Box className="subheading">Cost consumption by instances</Box>
            </Box>
          </Box>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table style={{ width: 2000 }}>
                {this.renderTableHead()}
                {this.renderTableBody()}
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default navigateRouter(ItDepartmentDetails);
