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
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import { getSpendOverviewComputeDetails } from "Redux/Reports/ReportsThunk";
import { ENVIRONMENTS, getCurrentOrgId } from "Utils";
import Loader from "Components/Loader";
import { REPORT_PAGE_TYPE } from "CommonData";

// let timeSpendData = [
//   {
//     name: "Last Quarter Spend",
//     value: "$90,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
//   {
//     name: "Quarter to date spend ",
//     value: "$70,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
//   {
//     name: "Forecasted Spend ",
//     value: "$90,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
//   {
//     name: "Avg Daily Spend",
//     value: "$90,000",
//     percentage: "5",
//     subName: " vs Last Quarter",
//   },
// ];
// let computeSpendingTable = [
//   {
//     name: "EC2",
//     icon: ServiceIcon1,
//     last_month_spend: "$2,000",
//     month_spend: "$1,800",
//     variance: "15% ",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "Lambda",
//     icon: ServiceIcon2,
//     last_month_spend: "$1,500",
//     month_spend: "$2,500",
//     variance: "20%",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "Light Sail",
//     icon: ServiceIcon3,
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "ECS",
//     icon: ServiceIcon4,
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "EKS",
//     icon: ServiceIcon5,
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
//   {
//     name: "Fargate",
//     icon: ServiceIcon6,
//     last_month_spend: "$2,000",
//     month_spend: "$2,000",
//     variance: "15%",
//     actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`,
//   },
// ];

class Compute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedKey: "",
      accounts: [],
      timerSpendData: [],
    };
  }

  componentDidMount = () => this.apiCall();

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

    if (prevProps.selectedGranularity !== this.props.selectedGranularity) {
      this.apiCall();
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
          ].replace("#granularity#", this.props.selectedGranularity);

          timerSpendData.push({
            name,
            value: "$0",
            percentage: details.variance,
            subName: " vs Last " + this.props.selectedGranularity,
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

  apiCall = () => {
    let serviceCategory =
      REPORT_PAGE_TYPE.SPEND_OVERVIEW_SERVICE_CATEGORY.COMPUTE.toLowerCase();
    this.props.getSpendOverviewComputeDetails({
      serviceCategory,
      cloud: ENVIRONMENTS.AWS.toLowerCase(),
      granularity: this.props.selectedGranularity,
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
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
                <h3 className="m-t-0 m-b-0">COMPUTE SPENDINGS</h3>
                <h4 className="m-t-3 m-b-0">
                  Overview of the compute Services
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
            <SpendingTable data={accounts} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Compute);
