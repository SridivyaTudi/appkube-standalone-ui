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
import {
  GRANULARITY_DROPDOWN_DATA,
  GRANULARITY_TYPE,
  REPORT_PAGE_TYPE,
} from "CommonData";
import { ENVIRONMENTS, getCurrentOrgId } from "Utils";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const renderLoader = () => {
  return (
    <Box className={`d-blck text-center deployed-cards-loader p-t-15 p-b-15`}>
      <Loader className="align-item-center justify-center w-100 h-100 " />
    </Box>
  );
};

// let timeSpendData = [
//   {
//     name: "Last Quarter Spend",
//     value: "$90,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
// ];

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
        cloud: ENVIRONMENTS.AWS.toLowerCase(),
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
        this.manipluateData(this.props.costTopAccountsDetailList?.data);
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
        {accounts?.length ? (
          accounts.map((details) => {
            return (
              <TableRow key={v4()}>
                <TableCell>
                  <Link
                    to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/cost-top-accounts/${details.accountId}`}
                  >
                    <strong> {details.accountId}</strong>
                  </Link>
                </TableCell>
                <TableCell>{details.department}</TableCell>
                <TableCell>
                  <HtmlTooltip className="table-tooltip" title={details.vpc}>
                    {details.vpc}
                  </HtmlTooltip>
                </TableCell>
                <TableCell align="center">
                  <strong>{details.serviceCount} </strong>
                </TableCell>
                <TableCell>{details.highSpendingRegion}</TableCell>
                <TableCell align="center"> <strong>{details.spending}</strong></TableCell>
                <TableCell align="center">
                  <Box
                    className={`variance-count ${
                      details.variance > 0 ? "" : "red"
                    }`}
                  >
                    <strong>{details.variance}</strong>
                    {details.variance ? (
                      details.variance > 0 ? (
                        <i className="fas fa-sort-up p-l-5 " />
                      ) : (
                        <i className="fas fa-sort-down p-l-5" />
                      )
                    ) : (
                      <></>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center"><strong>{details.budget}</strong></TableCell>
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
          cloud: ENVIRONMENTS.AWS.toLowerCase(),
          granularity: selectedGranularity,
          compareTo: "-1",
        },
        orgId: getCurrentOrgId(),
      });
      this.setState({ selectedGranularity, isSelectDepartmentOpen: false });
    }
  };

  //manipluate compute data
  manipluateData = (data, isReturnData = 0) => {
    let { accounts, timerSpendData, selectedGranularity } = this.state;
    accounts = [];
    timerSpendData = [];
    if (data.length) {
      data.forEach((details) => {
        let isOverviewDetails = Object.keys(
          REPORT_PAGE_TYPE.SERVICE_NAMES
        ).includes(details.accountId.toUpperCase());

        if (isOverviewDetails) {
          let name = REPORT_PAGE_TYPE.SERVICE_NAMES[
            details.accountId.toUpperCase()
          ].replace("#granularity#", selectedGranularity);

          timerSpendData.push({
            name,
            value: `$${details.spending ? details.spending : 0}`,
            percentage: details.variance,
            subName: " vs Last " + selectedGranularity,
          });
        } else {
          accounts.push(details);
        }
      });
    }
    if (isReturnData) {
      return { accounts, timerSpendData };
    } else {
      this.setState({ accounts, timerSpendData });
    }
  };
  render() {
    let {
      searchedKey,
      showSelectFilterModal,
      isSelectDepartmentOpen,
      timerSpendData,
    } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3> Cost Of Top Accounts</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate(
                    `${APP_PREFIX_PATH}/new-reports/over-view-dashboard`
                  )
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
        {this.props.costTopAccountsDetailList.status ===
        APIstatus.IN_PROGRESS ? (
          renderLoader()
        ) : (
          <Box className="reports-tab-section m-t-4">
            <TimeSpendComponent data={timerSpendData} />
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
                <Table style={{ minWidth: 1500 }}>
                  {this.renderTableHead()}
                  {this.renderTableBody()}
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}
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
