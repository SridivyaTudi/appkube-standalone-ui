import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  List,
  ListItem,
} from "@mui/material";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import ServiceIcon2 from "assets/img/report/service-icon2.png";
import ServiceIcon3 from "assets/img/report/service-icon3.png";
import ServiceIcon4 from "assets/img/report/service-icon4.png";
import ServiceIcon5 from "assets/img/report/service-icon5.png";
import ServiceIcon6 from "assets/img/report/service-icon6.png";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
let computeSpendingTable = [
  {
    name: "EC2",
    icon: ServiceIcon1,
    last_month_spend: "$2,000",
    month_spend: "$1,800",
    variance: "15% ",
    actions: "",
  },
  {
    name: "Lambda",
    icon: ServiceIcon2,
    last_month_spend: "$1,500",
    month_spend: "$2,500",
    variance: "20%",
    actions: "",
  },
  {
    name: "Light Sail",
    icon: ServiceIcon3,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: "",
  },
  {
    name: "ECS",
    icon: ServiceIcon4,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: "",
  },
  {
    name: "EKS",
    icon: ServiceIcon5,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: "",
  },
  {
    name: "Fargate",
    icon: ServiceIcon6,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: "",
  },
];
class Compute extends Component {
  render() {
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <h3>COMPUTE SPENDINGS</h3>
        <h4>Overview of the compute Services</h4>
        <Box className="new-reports-table">
          <TableContainer className="table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Service name</TableCell>
                  <TableCell align="center">last month spend </TableCell>
                  <TableCell align="center">This month spend</TableCell>
                  <TableCell align="center">variance</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <Box className="service-image d-inline-block">
                      <img src={ServiceIcon1} alt="" />
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
                      <img src={ServiceIcon2} alt="" />
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
                  <TableCell align="center">
                    <Button className="light-btn p-l-15 p-r-15 ">
                      view more <OpenInNewIcon className="p-l-5" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Box className="service-image d-inline-block">
                      <img src={ServiceIcon3} alt="" />
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
                  <TableCell align="center">
                    <Button className="light-btn p-l-15 p-r-15 ">
                      view more <OpenInNewIcon className="p-l-5" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Box className="service-image d-inline-block">
                      <img src={ServiceIcon4} alt="" />
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
                  <TableCell align="center">
                    <Button className="light-btn p-l-15 p-r-15 ">
                      view more <OpenInNewIcon className="p-l-5" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Box className="service-image d-inline-block">
                      <img src={ServiceIcon5} alt="" />
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
                  <TableCell align="center">
                    <Button className="light-btn p-l-15 p-r-15 ">
                      view more <OpenInNewIcon className="p-l-5" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Box className="service-image d-inline-block">
                      <img src={ServiceIcon6} alt="" />
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
        <h3 className="m-t-3">EC2 SPENDINGS</h3>
        <h4>Cost consumption of EC2</h4>
        <Box className="new-reports-table">
          <TableContainer className="table">
            <Table style={{ width: 2000 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Tags</TableCell>
                  <TableCell>Instance ID </TableCell>
                  <TableCell>Instance Type</TableCell>
                  <TableCell>Instance Status</TableCell>
                  <TableCell>Pricing model</TableCell>
                  <TableCell>Availability zone</TableCell>
                  <TableCell>Ondemand cost / hr</TableCell>
                  <TableCell>RI cost / hr</TableCell>
                  <TableCell>Usage Hours</TableCell>
                  <TableCell>Add-ons</TableCell>
                  <TableCell>Total Spend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>dev-prod</TableCell>
                  <TableCell>i-0c1234dc</TableCell>
                  <TableCell>t2.2xlarge </TableCell>
                  <TableCell>Running</TableCell>
                  <TableCell>on Demand</TableCell>
                  <TableCell>us-east-1a</TableCell>
                  <TableCell>$0.0015</TableCell>
                  <TableCell>Unavailable</TableCell>
                  <TableCell>720hrs</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>$120</TableCell>
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
