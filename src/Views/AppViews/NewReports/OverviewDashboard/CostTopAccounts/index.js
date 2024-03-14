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
} from "@mui/material";
import { Link } from "react-router-dom";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

let timeSpendData = [
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Month to date spend ",
    value: "$70,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Forecasted Spend ",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: "5",
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
      accounts: topFiveAccounts,
      showSelectFilterModal: false,
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
                  <Link
                    to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services`}
                  >
                    {details.accountId}
                  </Link>
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

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { accounts } = this.state;
    let data = topFiveAccounts || [];
    if (data?.length) {
      if (value) {
        accounts = data.filter((tableData) => {
          if (
            tableData?.accountId.toLowerCase().includes(value.toLowerCase())
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
    let { accounts, searchedKey, showSelectFilterModal } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3> Cost Of Top Accounts</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate("/app/new-reports/over-view-dashboard")
                }
              >
                Overview Dashboard
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active"> Cost Of Top Accounts</li>
            </ul>
          </Box>
        </Box>
        <Box className="d-flex align-items-center justify-content-end m-t-2">
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
        <Box className="reports-tab-section m-t-4">
          <TimeSpendComponent data={timeSpendData} />
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Overview of Top 5 Accounts</h4>
            <Box className="search m-r-0">
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
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table style={{ width: 1500 }}>
                {this.renderTableHead()}
                {this.renderTableBody()}
              </Table>
            </TableContainer>
          </Box>
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
    );
  }
}

export default navigateRouter(CostTopAccounts);
