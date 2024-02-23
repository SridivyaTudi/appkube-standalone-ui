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
import { v4 } from "uuid";
let timeSpendData = [
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: " 5 %",
    subName: " vs Last Month",
  },
  {
    name: "Month to date spend ",
    value: "$70,000",
    percentage: " 5 % ",
    subName: " vs Last Month",
  },
  {
    name: "Forecasted Spend ",
    value: "$90,000",
    percentage: " 5 % ",
    subName: " vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: " 5 % ",
    subName: " vs Last Month",
  },
];

let topFiveAccounts = [
  {
    accountId: "160079380622",
    deparment: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$20,000",
    variance: "15%",
    budget: "$30,000",
  },
  {
    accountId: "160079380622",
    deparment: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$20,000",
    variance: "15%",
    budget: "$30,000",
  },
  {
    accountId: "160079380622",
    deparment: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$20,000",
    variance: "15%",
    budget: "$30,000",
  },
  {
    accountId: "160079380622",
    deparment: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$20,000",
    variance: "15%",
    budget: "$30,000",
  },
  {
    accountId: "160079380622",
    deparment: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$20,000",
    variance: "15%",
    budget: "$30,000",
  },
];

class CostTopAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      accounts:topFiveAccounts
    };
  }

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Account ID</TableCell>
          <TableCell>Department </TableCell>
          <TableCell>Vpc</TableCell>
          <TableCell align="center">Service count</TableCell>
          <TableCell>High spending region</TableCell>
          <TableCell align="center">Spending</TableCell>
          <TableCell align="center">Variance</TableCell>
          <TableCell align="center">Budget</TableCell>
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
              <TableRow key={v4()}>
                <TableCell>
                  <Link to={``}>{details.accountId}</Link>
                </TableCell>
                <TableCell>{details.deparment}</TableCell>
                <TableCell>{details.vpc}</TableCell>
                <TableCell align="center">{details.serviceCount}</TableCell>
                <TableCell>{details.region}</TableCell>
                <TableCell align="center">{details.spending}</TableCell>
                <TableCell align="center">
                  <Box className="variance-count">
                    {details.variance} <i class="fas fa-sort-down p-l-5"></i>
                  </Box>
                </TableCell>
                <TableCell align="center">{details.budget}</TableCell>
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
      <Box className="new-reports-container spend-overview-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Cost Of Top Accounts
          </h3>
          <Box className="d-flex ">
            <Button className="light-btn p-l-15 p-r-15 m-r-3">
              <i className="fas fa-filter m-r-2"></i> Filter
            </Button>
            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Month
            </Button>
          </Box>
        </Box>
        <Box className="reports-tab-section m-t-3">
          <TimeSpendComponent data={timeSpendData} />
          <h4>Overview of Top 5 Accounts</h4>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table style={{ width: 1500 }}>
                {this.renderTableHead()}
                {this.renderTableBody()}
              </Table>
            </TableContainer>
          </Box>
          <h3 className="m-t-3">Spendings Of Top Used Services</h3>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Service name</TableCell>
                    <TableCell align="center">Current month spend</TableCell>
                    <TableCell align="center">last month spend </TableCell>
                    <TableCell align="center">variance</TableCell>
                    <TableCell align="center"> Avg daily spend</TableCell>
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
                    <TableCell align="center">$1,800</TableCell>
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
                      Lambda
                    </TableCell>
                    <TableCell align="center">$1,500</TableCell>
                    <TableCell align="center">$2,500</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count red">
                        20% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      Light Sail
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      ECS
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      EKS
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      Fargate
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      Fargate
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      Fargate
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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
                      Fargate
                    </TableCell>
                    <TableCell align="center">$2,000</TableCell>
                    <TableCell align="center">$1,800</TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        15% <i class="fas fa-sort-down p-l-5"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">$1,800</TableCell>
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

export default CostTopAccounts;
