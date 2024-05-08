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
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ServiceIcon7 from "assets/img/report/service-icon7.png";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

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
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
  {
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
  {
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
  {
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
  {
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
  {
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
  {
    name: "EC2",
    lastMonthSpend: "$2,000",
    monthSpend: "$1,800",
    variance: "15%",
  },
];
class ItDepartment extends Component {
  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Service name</TableCell>
          <TableCell align="center">Last quarter spend </TableCell>
          <TableCell align="center">This quarter spend </TableCell>
          <TableCell align="center">variance</TableCell>
          <TableCell align="center">Actions</TableCell>
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
                <TableCell align="left">
                  <Box className="service-image d-inline-block">
                    <img src={ServiceIcon7} alt="" />
                  </Box>
                  {details.name}
                </TableCell>
                <TableCell align="center"><strong>{details.lastMonthSpend}</strong></TableCell>
                <TableCell align="center"><strong>{details.monthSpend}</strong></TableCell>
                <TableCell align="center">
                  <Box className="variance-count red">
                  <strong>{details.variance}</strong> <i class="fas fa-sort-down p-l-5"></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Link
                    to={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/department/department-details`}
                  >
                    <Button className="light-btn p-l-15 p-r-15 ">
                      view more <OpenInNewIcon className="p-l-5" />
                    </Button>
                  </Link>
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
          <h3>IT Department</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate(
                    `${APP_PREFIX_PATH}/new-reports/chargeback-dashboard`
                  )
                }
              >
                Chargeback Dashboard
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">IT Department</li>
            </ul>
          </Box>
        </Box>

        <Box className="d-flex align-items-center justify-content-end m-t-2">
          <Link
            to={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/create-invoice`}
          >
            <Button className="light-btn p-l-15 p-r-15 m-r-3">
              <i class="fas fa-plus-circle m-r-2"></i> Create Invoice
            </Button>
          </Link>
          <Box className="fliter-button">
            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
            </Button>
          </Box>
        </Box>
        <Box className="reports-tab-section m-t-3">
          <TimeSpendComponent data={timeSpendData} />
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Overview of the cloud Services</h4>
            <Box className="check-box-group">
              <Box className="d-flex align-items-center m-r-3">
                <Checkbox
                  className="check-box"
                  size="small"
                  onChange={(e) => {
                    // this.handleCheckBox(e);
                    // this.props.setNextTab(2);
                  }}
                />
                <label>All </label>
              </Box>
              <Box className="d-flex align-items-center m-r-3">
                <Checkbox
                  className="check-box"
                  size="small"
                  onChange={(e) => {
                    // this.handleCheckBox(e);
                    // this.props.setNextTab(2);
                  }}
                />
                <label>Compute </label>
              </Box>
              <Box className="d-flex align-items-center m-r-3">
                <Checkbox
                  className="check-box"
                  size="small"
                  onChange={(e) => {
                    // this.handleCheckBox(e);
                    // this.props.setNextTab(2);
                  }}
                />
                <label>Storage </label>
              </Box>
              <Box className="d-flex align-items-center">
                <Checkbox
                  className="check-box"
                  size="small"
                  onChange={(e) => {
                    // this.handleCheckBox(e);
                    // this.props.setNextTab(2);
                  }}
                />
                <label>Network </label>
              </Box>
            </Box>
          </Box>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table style={{ minWidth: 800 }}>
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
export default navigateRouter(ItDepartment);
