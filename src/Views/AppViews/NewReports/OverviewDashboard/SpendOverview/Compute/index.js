import React, { Component } from "react";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import ServiceIcon2 from "assets/img/report/service-icon2.png";
import ServiceIcon3 from "assets/img/report/service-icon3.png";
import ServiceIcon4 from "assets/img/report/service-icon4.png";
import ServiceIcon5 from "assets/img/report/service-icon5.png";
import ServiceIcon6 from "assets/img/report/service-icon6.png";
import SpendingTable from "Views/AppViews/NewReports/OverviewDashboard/Components/SpendingTable";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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
let computeSpendingTable = [
  {
    name: "EC2",
    icon: ServiceIcon1,
    last_month_spend: "$2,000",
    month_spend: "$1,800",
    variance: "15% ",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
  },
  {
    name: "Lambda",
    icon: ServiceIcon2,
    last_month_spend: "$1,500",
    month_spend: "$2,500",
    variance: "20%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
  },
  {
    name: "Light Sail",
    icon: ServiceIcon3,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
  },
  {
    name: "ECS",
    icon: ServiceIcon4,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
  },
  {
    name: "EKS",
    icon: ServiceIcon5,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon6,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
  },
];

class Compute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedKey: "",
      accounts: computeSpendingTable,
    };
  }
  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { accounts } = this.state;
    let data = computeSpendingTable || [];
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
    let { accounts, searchedKey } = this.state;
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <Box className="table-head" alignItems={"end"}>
          <Box className="d-block">
            <h3 className="m-t-0 m-b-0">COMPUTE SPENDINGS</h3>
            <h4 className="m-t-3 m-b-0">Overview of the compute Services</h4>
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
        <SpendingTable data={accounts} />
      </>
    );
  }
}

export default Compute;
