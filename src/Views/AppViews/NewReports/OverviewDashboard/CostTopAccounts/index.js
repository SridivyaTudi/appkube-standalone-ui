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
  List,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getCostTopAccountsDetails } from "Redux/Reports/ReportsThunk";
import APIstatus from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import Loader from "Components/Loader";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { getCurrentOrgId } from "Utils";

const renderLoader = () => {
  return (
    <Box className={`d-blck text-center deployed-cards-loader p-t-15 p-b-15`}>
      <Loader className="align-item-center justify-center w-100 h-100 " />
    </Box>
  );
};

let timeSpendData = [
  {
    name: "Last Quarter Spend",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Quarter to date spend ",
    value: "$70,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Forecasted Spend ",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
];

class CostTopAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      accounts: [],
      showSelectFilterModal: false,
      selectedGranularity: GRANULARITY_TYPE.QUARTERLY.toLowerCase(),
      isSelectDepartmentOpen: false,
    };
  }

  componentDidMount() {
    this.props.getCostTopAccountsDetails({
      params: {
        cloud: "aws",
        granularity: this.state.selectedGranularity,
        compareTo: "-1",
      },
      orgId: getCurrentOrgId(),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.costTopAccountsDetailList.status !==
      this.props.costTopAccountsDetailList.status
    ) {
      if (this.props.costTopAccountsDetailList.status === APIstatus.SUCCESS) {
        this.setState({ accounts: this.props.costTopAccountsDetailList?.data });
      }
    }
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
        {this.props.costTopAccountsDetailList.status ===
        APIstatus.IN_PROGRESS ? (
          renderLoader()
        ) : accounts?.length ? (
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
                <TableCell>{details.department}</TableCell>
                <TableCell>{details.vpc}</TableCell>
                <TableCell align="center">{details.serviceCount}</TableCell>
                <TableCell>{details.highSpendingRegion}</TableCell>
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
    let data = this.props.costTopAccountsDetailList.data || [];
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

  getSelectedGranularity = () => {
    let { selectedGranularity } = this.state;
    let findValue = GRANULARITY_DROPDOWN_DATA.find(
      (data) => data.key === selectedGranularity
    );

    return findValue.value || "";
  };

  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  renderDropDownData = () => {
    let { selectedGranularity } = this.state;
    return GRANULARITY_DROPDOWN_DATA.map((data) => {
      return (
        <ListItem
          onClick={() => this.onClickDropDown(data.key)}
          key={v4()}
          className={`${data.key === selectedGranularity ? "active" : ""}`}
        >
          <i className="fa-solid fa-circle-dot"></i>
          {data.value}
        </ListItem>
      );
    });
  };

  onClickDropDown = (selectedGranularity) => {
    if (selectedGranularity !== this.state.selectedGranularity) {
      this.props.getCostTopAccountsDetails({
        params: {
          cloud: "aws",
          granularity: this.state.selectedGranularity,
          compareTo: "-1",
        },
        orgId: getCurrentOrgId(),
      });
      this.setState({ selectedGranularity, isSelectDepartmentOpen: false });
    }
  };

  render() {
    let {
      accounts,
      searchedKey,
      showSelectFilterModal,
      isSelectDepartmentOpen,
    } = this.state;
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
          <Box className="fliter-button">
            <Button
              className="light-btn p-l-15 p-r-15"
              onClick={this.toggleSelectDepartment}
            >
              <i class="fas fa-calendar-minus m-r-2"></i>{" "}
              {this.getSelectedGranularity()}
            </Button>
            {this.state.isSelectDepartmentOpen === true && (
              <div
                className={
                  isSelectDepartmentOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>{this.renderDropDownData()}</List>
              </div>
            )}

            <div
              className={
                isSelectDepartmentOpen
                  ? "fliters-collapse-bg active"
                  : "fliters-collapse-bg"
              }
              onClick={this.toggleSelectDepartment}
            />
          </Box>
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
function mapStateToProps(state) {
  const { costTopAccountsDetailList } = state.reports;
  return { costTopAccountsDetailList };
}

const mapDispatchToProps = {
  getCostTopAccountsDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(CostTopAccounts));
