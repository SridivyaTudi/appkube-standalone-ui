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

class CostCentralServicesInternalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  render() {
    const { showSelectFilterModal } = this.state;
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
                  <li>
                    <p>Cost Central Top Internal</p>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li>
                    <p>Cost Central Services Internal</p>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">
                    <p>Cost Central Services Internal details</p>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
          <Box className="list-heading m-t-2 ">
            <h4>Cost of EC2</h4>
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
            <h4 className="m-t-0 m-b-0">
              Cost consumption of EC2 in N.Virginia
            </h4>
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
              <Table style={{width: 2000}}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Tags</TableCell>
                    <TableCell align="left">Instance ID </TableCell>
                    <TableCell align="left">Instance Type</TableCell>
                    <TableCell align="left">Instance Status</TableCell>
                    <TableCell align="left">Pricing model</TableCell>
                    <TableCell align="left">Availability zone</TableCell>
                    <TableCell align="left">OnDemand cost/hr</TableCell>
                    <TableCell align="left">RI cost / hr</TableCell>
                    <TableCell align="center">Usage Hours</TableCell>
                    <TableCell align="center">Add-ons</TableCell>
                    <TableCell align="center">Total Spend</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">dev-prod</TableCell>
                    <TableCell align="left">i-0c1234dc</TableCell>
                    <TableCell align="left">t2.2xlarge	</TableCell>
                    <TableCell align="left">Running</TableCell>
                    <TableCell align="left">on Demand</TableCell>
                    <TableCell align="left">us-east-1a</TableCell>
                    <TableCell align="left"><strong>$0.0015</strong></TableCell>
                    <TableCell align="left">Unavailable</TableCell>
                    <TableCell align="center"><strong>720hrs</strong></TableCell>
                    <TableCell align="center">NA</TableCell>
                    <TableCell align="center"><strong>$120</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {showSelectFilterModal ? (
            <SelectFilterModal
              showModal={showSelectFilterModal}
              handleSelectFilterModal={this.handleSelectFilterModal}
            />
          ) : (
            <></>
          )}
        </Box>
      </>
    );
  }
}

export default CostCentralServicesInternalDetails;
