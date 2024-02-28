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
  Checkbox,
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

class ItDepartmentDetails extends Component {
  render() {
    return (
      <Box className="new-reports-container">
        <Box className="global-services-fliter">
          <Box className="heading">
            <Box className="breadcrumbs">
              <ul>
                <li>
                  <p> Chargeback Dashboard</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <p>IT Department</p>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">
                  <p>EC2</p>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        <Box className="list-heading m-t-3">
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
            <Box className="d-block">
              <h4 className="m-t-0 m-b-0">Number of Instances </h4>
              <Box className="subheading">Cost consumption by instances</Box>
            </Box>
          </Box>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table style={{ width: 2000 }}>
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
                <TableBody>
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                  <TableRow>
                    <TableCell align="left">10</TableCell>
                    <TableCell align="left">
                      <Link to={``}>t4g.2xlarge</Link>
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
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ItDepartmentDetails;
