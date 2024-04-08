import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import AccountTable from "../Components/AccountTable";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

let timeSpendData = [
  {
    name: "Quarter to date spend",
    value: "$70,000",
    percentage: "",
    subName: "",
  },
  {
    name: "Forecasted Spend",
    value: "$85,000",
    percentage: "15",
    subName: "vs Last Quarter",
  },
  {
    name: "Last Quarter Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Quarter",
  },
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
];
let dummyTableData = [
  {
    name: "IT INFRA",
    id: "160079380622",
    orgUnit: "Central Operations",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$30,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal",
  },
  {
    name: "IT SECURITY",
    id: "160079380622",
    orgUnit: "Central Operations",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$30,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal",
  },
  {
    name: "PRODUCTION",
    id: "160079380622",
    orgUnit: "Central Operations",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$30,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal",
  },
  {
    name: "DEV OPS",
    id: "160079380622",
    orgUnit: "Central Operations",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$30,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal",
  },
  {
    name: "IT TESTING",
    id: "160079380622",
    orgUnit: "Central Operations",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$30,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal",
  },
];
let tableHeader = [
  "Account name",
  "Account ID",
  "Organization unit",
  "Current quarter spend",
  "Last quarter spend",
  "Variance",
  "Avg daily spend",
  "Actions",
];
class CostCentralTopInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      accounts: dummyTableData,
    };
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
    let data = dummyTableData || [];
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
  render() {
    let { accounts, searchedKey, showSelectFilterModal } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Cost Central Top Internal</h3>
            <Box className="breadcrumbs">
              <ul>
                <li
                  onClick={() =>
                    this.props.navigate(
                      `${APP_PREFIX_PATH}/new-reports/central-dashboard`
                    )
                  }
                >
                  Cost Central dashboard
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Cost Central Top Internal</li>
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
              <Button className="light-btn p-l-15 p-r-15">
                <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
              </Button>
            </Box>
          </Box>
          <Box className="m-t-4">
            <TimeSpendComponent data={timeSpendData} />
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Cost of Top 5 Accounts</h4>
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
          <AccountTable headers={tableHeader} data={accounts} />
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

export default navigateRouter(CostCentralTopInternal);
