import React, { Component } from "react";
import { Box, Button, ListItem, List } from "@mui/material";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import ServiceIcon7 from "assets/img/report/service-icon7.png";
import ServiceIcon8 from "assets/img/report/service-icon8.png";
import ServiceIcon9 from "assets/img/report/service-icon9.png";
import ServiceIcon10 from "assets/img/report/service-icon10.png";
import ServiceIcon11 from "assets/img/report/service-icon11.png";
import ServiceIcon12 from "assets/img/report/service-icon12.png";
import ServiceIcon13 from "assets/img/report/service-icon13.png";
import ServiceIcon14 from "assets/img/report/service-icon14.png";
import ServiceIcon15 from "assets/img/report/service-icon15.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import SpendingTable from "../Components/SpendingTable";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import { getTopUsedServiceDetails } from "Redux/Reports/ReportsThunk";
import { ENVIRONMENTS, getCurrentOrgId } from "Utils";
import {
  GRANULARITY_TYPE,
  REPORT_PAGE_TYPE,
  GRANULARITY_DROPDOWN_DATA,
} from "CommonData";
import Loader from "Components/Loader";
import { v4 } from "uuid";

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
    icon: ServiceIcon7,
    last_month_spend: "$2,000",
    month_spend: "$1,800",
    variance: "15% ",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "Lambda",
    icon: ServiceIcon8,
    last_month_spend: "$1,500",
    month_spend: "$2,500",
    variance: "20%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "Light Sail",
    icon: ServiceIcon9,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "ECS",
    icon: ServiceIcon10,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "EKS",
    icon: ServiceIcon11,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon12,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon13,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon14,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon15,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
  },
];
class TopUsedServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      searchedKey: "",
      accounts: [],
      spendOverAllDetails: [],
      selectedGranularity: GRANULARITY_TYPE.QUARTERLY.toLowerCase(),
    };
  }
  componentDidMount = () => this.apiCall();

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topUsedServiceDetailsData.status !==
        this.props.topUsedServiceDetailsData.status &&
      this.props.topUsedServiceDetailsData.status === status.SUCCESS &&
      this.props.topUsedServiceDetailsData?.data
    ) {
      const topUsedServiceDetailsData =
        this.props.topUsedServiceDetailsData.data;
      if (topUsedServiceDetailsData) {
        this.maniplatetopUsedServiceDetailsData(topUsedServiceDetailsData.data);
      }
    }
  }

  //Maniplate top used service details data
  maniplatetopUsedServiceDetailsData = (data, isReturnData = 0) => {
    let { accounts, spendOverAllDetails, selectedGranularity } = this.state;
    accounts = [];
    spendOverAllDetails = [];
    if (data.length) {
      data.forEach((details) => {
        let isOverviewDetails = Object.keys(
          REPORT_PAGE_TYPE.SERVICE_NAMES
        ).includes(details.serviceName.toUpperCase());

        if (isOverviewDetails) {
          let name = REPORT_PAGE_TYPE.SERVICE_NAMES[
            details.serviceName.toUpperCase()
          ].replace("#granularity#", selectedGranularity);
          spendOverAllDetails.push({
            name,
            value: `$${details.total || 0}`,
            percentage: details.variance,
            subName: " vs Last " + selectedGranularity,
          });
        } else {
          accounts.push({
            name: details.serviceName,
            icon: ServiceIcon7,
            last_month_spend: details.lastMonthSpend,
            month_spend: details.thisMonthSpend,
            variance: details.variance,
            actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services/top-use-services-details/`,
          });
        }
      });
    }

    if (isReturnData) {
      return { accounts, spendOverAllDetails };
    } else {
      this.setState({ accounts, spendOverAllDetails });
    }
  };

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { accounts } = this.state;

    const { accounts: accontsData } = this.maniplatetopUsedServiceDetailsData(
      this.props.topUsedServiceDetailsData.data?.data || [],
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
    }
    this.setState({ accounts, searchedKey: value });
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  }

  apiCall = () => {
    this.props.getTopUsedServiceDetails({
      serviceCategory: "all",
      cloud: ENVIRONMENTS.AWS.toLowerCase(),
      granularity: this.state.selectedGranularity,
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
  };

  onClickDropDown = (selectedGranularity) => {
    if (selectedGranularity !== this.state.selectedGranularity) {
      this.setState({ selectedGranularity, isGranularityDropDownOpen: false },()=>{
        this.apiCall()
      });
    }
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

  toggleGranularity = () => {
    this.setState({
      isGranularityDropDownOpen: !this.state.isGranularityDropDownOpen,
    });
  };

  getSelectedGranularity = () => {
    let { selectedGranularity } = this.state;
    let findValue = GRANULARITY_DROPDOWN_DATA.find(
      (data) => data.key === selectedGranularity
    );

    return findValue.value || "";
  };
  toggleGranularity = () => {
    this.setState({
      isGranularityDropDownOpen: !this.state.isGranularityDropDownOpen,
    });
  };
  render() {
    let {
      accounts,
      searchedKey,
      spendOverAllDetails,
      isGranularityDropDownOpen,
    } = this.state;
    let { topUsedServiceDetailsData } = this.props;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>Top Used Services</h3>
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
              <li className="active">Top Used Services</li>
            </ul>
          </Box>
        </Box>
        <Box className="d-flex  align-items-center justify-content-end m-t-2">
          <Button className="light-btn p-l-15 p-r-15 m-r-3">
            <i className="fas fa-filter m-r-2"></i> Filter
          </Button>
          <Box className="fliter-button">
            <Button
              className="light-btn p-l-15 p-r-15"
              onClick={this.toggleGranularity}
            >
              <i className="fas fa-calendar-minus m-r-2"></i>{" "}
              {this.getSelectedGranularity()}
            </Button>
            {isGranularityDropDownOpen && (
              <div
                className={
                  isGranularityDropDownOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>{this.renderDropDownData()}</List>
              </div>
            )}

            <div
              className={
                isGranularityDropDownOpen
                  ? "fliters-collapse-bg active"
                  : "fliters-collapse-bg"
              }
              onClick={this.toggleGranularity}
            />
          </Box>
        </Box>
        {topUsedServiceDetailsData.status === status.IN_PROGRESS ? (
          this.renderLoder()
        ) : (
          <Box className="reports-tab-section m-t-4">
            <TimeSpendComponent data={spendOverAllDetails} />
            <Box className="table-head" alignItems={"end"}>
              <Box className="d-block">
                <h3>Spendings Of Top Used Services</h3>
                <h4 className="m-t-3 m-b-0">Overview of Top 10 Services</h4>
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
            <SpendingTable
              data={accounts}
              selectedGranularity={this.state.selectedGranularity}
            />
          </Box>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { topUsedServiceDetailsData } = state.reports;
  return { topUsedServiceDetailsData };
}

const mapDispatchToProps = {
  getTopUsedServiceDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(TopUsedServices));
