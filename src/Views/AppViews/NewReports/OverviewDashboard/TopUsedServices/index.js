import React, { Component } from "react";
import { Box, Button } from "@mui/material";
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
import { getCurrentOrgId } from "Utils";

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
      accounts: computeSpendingTable,
    };
  }

  componentDidMount = () => {
    this.props.getTopUsedServiceDetails({
      serviceCategory: "all",
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
    
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topUsedServiceDetailsData.status !==
        this.props.topUsedServiceDetailsData.status &&
      this.props.topUsedServiceDetailsData.status === status.SUCCESS &&
      this.props.topUsedServiceDetailsData?.data
    ) {
      const topUsedServiceDetailsData = this.props.topUsedServiceDetailsData.data;
      if (topUsedServiceDetailsData) {
        console.log(topUsedServiceDetailsData);
        // this.maniplatetopUsedServiceDetailsData(topUsedServiceDetailsData.data);
      }
    }
    
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
          <Button className="light-btn p-l-15 p-r-15">
            <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
          </Button>
        </Box>

        <Box className="reports-tab-section m-t-4">
          <TimeSpendComponent data={timeSpendData} />
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
          <SpendingTable data={accounts} />
        </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopUsedServices);
