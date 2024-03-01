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
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
let timeSpendData = [
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
  {
    name: "Month to date spend",
    value: "$70,000",
    percentage: "",
    subName: "",
  },
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Month",
  },
];

class BudgetAccountDetails extends Component {
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

  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ width: 2000 }}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    let headers = this.props.headers || [];
    return (
      <TableHead>
        <TableRow>
          <TableCell>Instance ID</TableCell>
          <TableCell>Instance Type</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell>Instance Status</TableCell>
          <TableCell>Pricing model</TableCell>
          <TableCell>Availability zone</TableCell>
          <TableCell align="center">Ondemand cost / hr</TableCell>
          <TableCell>RI cost / hr</TableCell>
          <TableCell align="center">Usage Hours</TableCell>
          <TableCell>Add-ons</TableCell>
          <TableCell align="center">Total Spend</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { data } = this.props;
    return (
      <TableBody>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>i-0c1234dc</TableCell>
          <TableCell>t2.2xlarge	</TableCell>
          <TableCell>dev-prod</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>on Demand</TableCell>
          <TableCell>us-east-1a</TableCell>
          <TableCell align="center"><strong>$0.0015</strong></TableCell>
          <TableCell>Unavailable</TableCell>
          <TableCell align="center"><strong>720hrs</strong></TableCell>
          <TableCell>NA</TableCell>
          <TableCell align="center"><strong>$120</strong></TableCell>
        </TableRow>
      </TableBody>
    );
  };
  render() {
    let { accounts, searchedKey, showSelectFilterModal } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Budget Account Details</h3>
            <Box className="breadcrumbs">
              <ul>
                <li>Budget Dashboard</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>Budget Account</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>Budget Services Account</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Budget Account Details</li>
              </ul>
            </Box>
          </Box>
          <Box className="list-heading m-t-2 ">
            <h4 className="m-t-0 m-b-0">Cost of EC2</h4>
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
            <h4 className="m-t-0 m-b-0">Cost consumption of EC2</h4>
            <Box className="search">
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
          <Box className="new-reports-table">{this.renderTable()}</Box>
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

export default navigateRouter(BudgetAccountDetails);
