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
  Checkbox
} from "@mui/material";
import { Link } from "react-router-dom";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ServiceIcon7 from "assets/img/report/service-icon7.png";
import ServiceIcon8 from "assets/img/report/service-icon8.png";
import ServiceIcon9 from "assets/img/report/service-icon9.png";
import ServiceIcon10 from "assets/img/report/service-icon10.png";
import ServiceIcon11 from "assets/img/report/service-icon11.png";
import ServiceIcon12 from "assets/img/report/service-icon12.png";
import ServiceIcon13 from "assets/img/report/service-icon13.png";
import ServiceIcon14 from "assets/img/report/service-icon14.png";
import ServiceIcon15 from "assets/img/report/service-icon15.png";
let timeSpendData = [
  {
    name: "Last Month Spend",
    value: "$10,00",
    percentage: "20",
    subName: " More than previous month",
  },
  {
    name: "This Month’s Spend",
    value: "$70,000",
    percentage: "20",
    subName: " vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: "5",
    subName: "",
  },
];

class ItDepartment extends Component {
  render() {
    return (
      <Box className="new-reports-container spend-overview-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            IT Department
          </h3>

          <Box className="d-flex ">
            <Link to={`/app/new-reports/chargeback-dashboard/create-invoice`}>
              <Button className="light-btn p-l-15 p-r-15 m-r-3">
                <i class="fas fa-plus-circle m-r-2"></i> Create Invoice
              </Button>
            </Link>

            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Month
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
                <label>Compute  </label>
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
                <label>Storage  </label>
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
                <label>Network  </label>
              </Box>
            </Box>
          </Box>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Service name</TableCell>
                    <TableCell align="center">last month spend </TableCell>
                    <TableCell align="center">This month spend </TableCell>
                    <TableCell align="center">variance</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon7} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon9} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon8} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon9} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon10} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon11} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon12} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon13} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon14} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon15} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ItDepartment;
