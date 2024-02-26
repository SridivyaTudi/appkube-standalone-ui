import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Link } from "react-router-dom";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import ServiceIcon2 from "assets/img/report/service-icon2.png";
import ServiceIcon3 from "assets/img/report/service-icon3.png";
import ServiceIcon4 from "assets/img/report/service-icon4.png";
import ServiceIcon5 from "assets/img/report/service-icon5.png";
import ServiceIcon6 from "assets/img/report/service-icon6.png";
let timeSpendData = [
  {
    name: "Month to date spend",
    value: "$70,000",
    percentage: "",
    subName: "",
  },
  {
    name: "Forecasted Spend",
    value: "$85,000",
    percentage: "15",
    subName: "vs Last Month",
  },
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
];

class CostCentralTopInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render() {
    return (
      <>
        <Box className="new-reports-container">
          <Box className="global-services-fliter">
            <Box className="heading">
              <Box className="breadcrumbs">
                <ul>
                  <li>
                    <p> Central Dashboard</p>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">
                    <p>Cost Central Top Internal</p>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
          <Box className="list-heading m-t-2 ">
            <h4>Cost of Top Regions</h4>
            <Box className="d-flex ">
              <Button
                className="light-btn p-l-15 p-r-15 m-r-3"
                onClick={this.handleSelectFilterModal}
              >
                <i className="fas fa-filter m-r-2"></i> Filter
              </Button>
              <Button className="light-btn p-l-15 p-r-15">
                <i className="fas fa-calendar-minus m-r-2"></i> Last Month
              </Button>
            </Box>
          </Box>
          <Box className="m-t-2">
            <TimeSpendComponent data={timeSpendData} />
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Overview of Top Regions</h4>
            <Box className="search">
              <input
                type="text"
                className="input"
                placeholder="Search Insatnce "
                //value={searchedKey}
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Region</TableCell>
                    <TableCell align="center">Service Count </TableCell>
                    <TableCell align="center">Current month</TableCell>
                    <TableCell align="center">Last Month</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">US-East (N.virginia)</TableCell>
                    <TableCell align="center">22</TableCell>
                    <TableCell align="center">
                      <strong> $2120</strong>
                      <Box className="variance-count">
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i> 10%
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <strong> $20,000</strong>
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/app/new-reports/central-dashboard/cost-central-services-internal`}
                      >
                        <Button className="light-btn p-l-15 p-r-15 ">
                          view more <OpenInNewIcon className="p-l-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">US-East (N.virginia)</TableCell>
                    <TableCell align="center">22</TableCell>
                    <TableCell align="center">
                      <strong> $2120</strong>
                      <Box className="variance-count">
                        <i className="fas fa-sort-up red p-l-5 m-r-1"></i> 10%
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <strong> $20,000</strong>
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/app/new-reports/central-dashboard/cost-central-services-internal`}
                      >
                        <Button className="light-btn p-l-15 p-r-15 ">
                          view more <OpenInNewIcon className="p-l-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">US-East (N.virginia)</TableCell>
                    <TableCell align="center">22</TableCell>
                    <TableCell align="center">
                      <strong> $2120</strong>
                      <Box className="variance-count">
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i> 10%
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <strong> $20,000</strong>
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/app/new-reports/central-dashboard/cost-central-services-internal`}
                      >
                        <Button className="light-btn p-l-15 p-r-15 ">
                          view more <OpenInNewIcon className="p-l-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">US-East (N.virginia)</TableCell>
                    <TableCell align="center">22</TableCell>
                    <TableCell align="center">
                      <strong> $2120</strong>
                      <Box className="variance-count">
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i> 10%
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <strong> $20,000</strong>
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/app/new-reports/central-dashboard/cost-central-services-internal`}
                      >
                        <Button className="light-btn p-l-15 p-r-15 ">
                          view more <OpenInNewIcon className="p-l-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">US-East (N.virginia)</TableCell>
                    <TableCell align="center">22</TableCell>
                    <TableCell align="center">
                      <strong> $2120</strong>
                      <Box className="variance-count">
                        <i className="fas fa-sort-up red p-l-5 m-r-1"></i> 10%
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <strong> $20,000</strong>
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/app/new-reports/central-dashboard/cost-central-services-internal`}
                      >
                        <Button className="light-btn p-l-15 p-r-15 ">
                          view more <OpenInNewIcon className="p-l-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">US-East (N.virginia)</TableCell>
                    <TableCell align="center">22</TableCell>
                    <TableCell align="center">
                      <strong> $2120</strong>
                      <Box className="variance-count">
                        <i className="fas fa-sort-up red p-l-5 m-r-1"></i> 10%
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <strong> $20,000</strong>
                    </TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/app/new-reports/central-dashboard/cost-central-services-internal`}
                      >
                        <Button className="light-btn p-l-15 p-r-15 ">
                          view more <OpenInNewIcon className="p-l-5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}

export default CostCentralTopInternal;
