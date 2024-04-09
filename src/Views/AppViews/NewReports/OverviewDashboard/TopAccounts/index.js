import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getCostTopAccountsByAccountId } from "Redux/Reports/ReportsThunk";
import APIstatus from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import Loader from "Components/Loader";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { ENVIRONMENTS, getCurrentOrgId } from "Utils";
import SpendingTable from "./Components/SpendingTable";
import status from "Redux/Constants/CommonDS";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

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
// let computeSpendingTable = [
//   {
//     name: "EC2",
//     icon: "ServiceIcon1",
//     last_month_spend: "$2,000",
//     month_spend: "$1,800",
//     variance: "15% ",
//     avg_daily_spend: "$1,800",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "Lambda",
//     icon: "ServiceIcon2",
//     last_month_spend: "$1,500",
//     month_spend: "$2,500",
//     variance: "20%",
//     avg_daily_spend: "$1,800",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "Light Sail",
//     icon: "ServiceIcon3",
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     avg_daily_spend: "$1,800",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "ECS",
//     icon: "ServiceIcon4",
//     avg_daily_spend: "$1,800",
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "EKS",
//     icon: "ServiceIcon5",
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     avg_daily_spend: "$1,800",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "Fargate",
//     icon: "ServiceIcon6",
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     avg_daily_spend: "$1,800",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
// ];

class TopAccounts extends Component {
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
    let { accountId: account } = this.getUrlDetails();
    this.props.getCostTopAccountsByAccountId({
      params: {
        cloud: "aws",
        granularity: this.state.selectedGranularity,
        compareTo: "-1",
        account,
      },
      orgId: getCurrentOrgId(),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topAccountsById.status !== this.props.topAccountsById.status
    ) {
      if (this.props.topAccountsById.status === APIstatus.SUCCESS) {
        this.manipluateData(this.props.topAccountsById?.data || []);
      }
    }
  }

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { accounts } = this.state;
    let data = this.manipluateData(this.props.topAccountsById.data || [], 1);
    if (data?.length) {
      if (value) {
        accounts = data.filter((tableData) => {
          if (tableData?.name.toLowerCase().includes(value.toLowerCase())) {
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
      let { accountId: account } = this.getUrlDetails();
      let cloud = ENVIRONMENTS.AWS.toLowerCase();
      this.props.getCostTopAccountsByAccountId({
        params: {
          cloud,
          granularity: selectedGranularity,
          compareTo: "-1",
          account,
        },
        orgId: getCurrentOrgId(),
      });
      this.setState({ selectedGranularity, isSelectDepartmentOpen: false });
    }
  };
  /** Get url details. */
  getUrlDetails() {
    let accountId = this.props.params.accountId;

    return { accountId };
  }

  //manipluate compute data
  manipluateData = (data, isReturnData = 0) => {
    let { accounts } = this.state;
    accounts = [];

    if (data.length) {
      data.forEach((details) => {
        accounts.push({
          name: details.serviceName,
          last_month_spend: details.lastMonthSpend,
          month_spend: details.thisMonthSpend,
          variance: details.variance,
          avg_daily_spend: details.avgDailySpend,
          actions: `#`,
        });
      });
    }
    if (isReturnData) {
      return accounts;
    } else {
      this.setState({ accounts });
    }
  };
  render() {
    let { accounts, searchedKey, isSelectDepartmentOpen, selectedGranularity } =
      this.state;
    let { topAccountsById } = this.props;
    let { accountId } = this.getUrlDetails();
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3> Top Accounts</h3>
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
              <li
                onClick={() =>
                  this.props.navigate(
                    `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/cost-top-accounts`
                  )
                }
              >
                Cost Of Top Accounts
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active"> Top Accounts</li>
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
          <Box className="table-head" alignItems={"end"}>
            <Box className="d-block">
              <h3 className="m-t-0 m-b-0">Spendings Of Top Used Services</h3>
              <h4 className="m-t-3 m-b-0">
                {" "}
                Top Services in Account {accountId}
              </h4>
            </Box>
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
          {topAccountsById.status === status.IN_PROGRESS ? (
            renderLoader()
          ) : (
            <SpendingTable
              data={accounts}
              selectedGranularity={selectedGranularity}
            />
          )}
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { topAccountsById } = state.reports;
  return { topAccountsById };
}

const mapDispatchToProps = {
  getCostTopAccountsByAccountId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(TopAccounts));
