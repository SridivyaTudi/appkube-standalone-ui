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
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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

let timeSpendData = [
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: " 5 %",
    subName: " vs Last Month",
  },
  {
    name: "Month to date spend ",
    value: "$70,000",
    percentage: " 5 % ",
    subName: " vs Last Month",
  },
  {
    name: "Forecasted Spend ",
    value: "$90,000",
    percentage: " 5 % ",
    subName: " vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: " 5 % ",
    subName: " vs Last Month",
  },
];

let computeSpendingTable = [
  {
    name: "EC2",
    icon: ServiceIcon7,
    last_month_spend: "$2,000",
    month_spend: "$1,800",
    variance: "15% ",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "Lambda",
    icon: ServiceIcon8,
    last_month_spend: "$1,500",
    month_spend: "$2,500",
    variance: "20%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "Light Sail",
    icon: ServiceIcon9,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "ECS",
    icon: ServiceIcon10,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "EKS",
    icon: ServiceIcon11,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon12,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon13,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon14,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
  {
    name: "Fargate",
    icon: ServiceIcon15,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: `${APP_PREFIX_PATH}/new-reports/over-view-dashboard/top-use-services-details/`,
  },
];
class TopUsedServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  render() {
    return (
      <Box className="new-reports-container spend-overview-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Top Used Services
          </h3>
          <Box className="d-flex ">
            <Button className="light-btn p-l-15 p-r-15 m-r-3">
              <i className="fas fa-filter m-r-2"></i> Filter
            </Button>
            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Month
            </Button>
          </Box>
        </Box>
        <Box className="reports-tab-section m-t-3">
          <TimeSpendComponent data={timeSpendData} />
          <h3>Spendings Of Top Used Services</h3>
          <h4>Overview of Top 10 Services</h4>
          <SpendingTable data={computeSpendingTable} />
        </Box>
      </Box>
    );
  }
}
export default navigateRouter(TopUsedServices);
