import React, { Component } from "react";
import { Box } from "@mui/material";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import ServiceIcon2 from "assets/img/report/service-icon2.png";
import ServiceIcon3 from "assets/img/report/service-icon3.png";
import ServiceIcon4 from "assets/img/report/service-icon4.png";
import ServiceIcon5 from "assets/img/report/service-icon5.png";
import ServiceIcon6 from "assets/img/report/service-icon6.png";
import SpendingTable from "Views/AppViews/NewReports/OverviewDashboard/Components/SpendingTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { getCurrentOrgId } from "Utils";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { REPORT_PAGE_TYPE } from "CommonData";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { connect } from "react-redux";
import { getSpendOverviewComputeDetails } from "Redux/Reports/ReportsThunk";
let timeSpendData = [
  {
    name: "Last Quarter Spend",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Month to date spend ",
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

class Database extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedKey: "",
      accounts: [],
      timerSpendData: [],
    };
  }

  componentDidMount = () => {
    this.props.getSpendOverviewComputeDetails({
      serviceCategory: "database",
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.spendOverviewComputeDetailsData.status !==
        this.props.spendOverviewComputeDetailsData.status &&
      this.props.spendOverviewComputeDetailsData.status === status.SUCCESS &&
      this.props.spendOverviewComputeDetailsData?.data
    ) {
      const spendOverviewComputeDetailsData =
        this.props.spendOverviewComputeDetailsData?.data.data || [];
      if (spendOverviewComputeDetailsData.length) {
        this.manipluateData(spendOverviewComputeDetailsData);
      }
    }
  }

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { accounts } = this.state;
    const { accounts: accontsData } = this.manipluateData(
      this.props.spendOverviewComputeDetailsData?.data.data || [],
      1
    );

    if (accontsData?.length) {
      if (value) {
        accounts = accontsData.filter((tableData) => {
          if (tableData?.name.toLowerCase().includes(value.toLowerCase())) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        accounts = accontsData;
      }
      this.setState({ accounts, searchedKey: value });
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  }

  //manipluate compute data
  manipluateData = (data, isReturnData = 0) => {
    let { accounts, timerSpendData } = this.state;
    accounts = [];
    timerSpendData = [];
    if (data.length) {
      data.forEach((details) => {
        let isOverviewDetails = Object.keys(
          REPORT_PAGE_TYPE.SERVICE_NAMES
        ).includes(details.serviceName.toUpperCase());

        if (isOverviewDetails) {
          let name = REPORT_PAGE_TYPE.SERVICE_NAMES[
            details.serviceName.toUpperCase()
          ].replace("#granularity#", "Quarter");
          timerSpendData.push({
            name,
            value: `$${details.total || 0}`,
            percentage: details.variance,
            subName: " vs Last Quarter",
          });
        } else {
          accounts.push({
            name: details.serviceName,
            icon: ServiceIcon1,
            last_month_spend: details.lastMonthSpend,
            month_spend: details.thisMonthSpend,
            variance: details.variance,
            actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
          });
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
    let { accounts, searchedKey, timerSpendData } = this.state;
    let { spendOverviewComputeDetailsData } = this.props;
    return (
      <>
        {spendOverviewComputeDetailsData.status === status.IN_PROGRESS ? (
          this.renderLoder()
        ) : (
          <>
            <TimeSpendComponent data={timerSpendData} />
            <Box className="table-head" alignItems={"end"}>
              <Box className="d-block">
                <h3>DATABASE SPENDINGS</h3>
                <h4 className="m-t-3 m-b-0">
                  Overview of the database Services
                </h4>
              </Box>
              <Box className="search m-r-0">
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
            <SpendingTable data={accounts} />{" "}
          </>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  const { spendOverviewComputeDetailsData } = state.reports;
  return { spendOverviewComputeDetailsData };
}

const mapDispatchToProps = {
  getSpendOverviewComputeDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Database);
