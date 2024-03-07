import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import ServiceIcon2 from "assets/img/report/service-icon2.png";
import ServiceIcon3 from "assets/img/report/service-icon3.png";
import ServiceIcon4 from "assets/img/report/service-icon4.png";
import ServiceIcon5 from "assets/img/report/service-icon5.png";
import ServiceIcon6 from "assets/img/report/service-icon6.png";
import SpendingTable from "Views/AppViews/NewReports/OverviewDashboard/Components/SpendingTable";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import JavascriptTable from "Components/JavascriptTable";
import { Link } from "react-router-dom";
let timeSpendData = [
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Month to date spend ",
    value: "$70,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Forecasted Spend ",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
];
let computeSpendingTable = [
  {
    name: "EC2",
    icon: ServiceIcon1,
    last_month_spend: "$2,000",
    month_spend: "$1,800",
    variance: "15% ",
    actions: (
      <Link
        to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`}
      >
        View More
      </Link>
    ),
  },
  {
    name: "Lambda",
    icon: ServiceIcon2,
    last_month_spend: "$1,500",
    month_spend: "$2,500",
    variance: "20%",
    actions: (
      <Link
        to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`}
      >
        View More
      </Link>
    ),
  },
  {
    name: "Light Sail",
    icon: ServiceIcon3,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: (
      <Link
        to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`}
      >
        View More
      </Link>
    ),
  },
  {
    name: "ECS",
    icon: ServiceIcon4,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: (
      <Link
        to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`}
      >
        View More
      </Link>
    ),
  },
  {
    name: "EKS",
    icon: ServiceIcon5,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: (
      <Link
        to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`}
      >
        View More
      </Link>
    ),
  },
  {
    name: "Fargate",
    icon: ServiceIcon6,
    last_month_spend: "$2,000",
    month_spend: "$2,000",
    variance: "15%",
    actions: (
      <Link
        to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard/spend-overview-details/`}
      >
        View More
      </Link>
    ),
  },
];
const columns = [
  {
    label: "Service name",
    key: "name",
  },
  {
    label: "Last month spend",
    key: "last_month_spend",
  },
  {
    label: "This month spend",
    key: "month_spend",
  },
  {
    label: "Variance",
    key: "variance",
  },
  {
    label: "Actions",
    key: "actions",
  },
];

const data = [
  {
    index: "#27",
    requesterName: "Rodney Artichoke",
    subject: "I need help with aading a New Contact....",
  },
  {
    index: "#39",
    requesterName: "Chaplain Mondover",
    subject: "I need help with aading a New Contact data to be pre...",
  },
  {
    index: "#47",
    requesterName: "Rodney Artichoke",
    subject: "Mobile Campaign",
  },
  {
    index: "#52",
    requesterName: "Inverness McKenzie",
    subject: "Service related announcements",
  },
  {
    index: "#87",
    requesterName: "Douglas Lyphe",
    subject: "I need help with aading a New Contact....",
  },
  {
    index: "#92",
    requesterName: "Theodore Handle",
    subject: "Adding a payment methods",
  },
  {
    index: "#27",
    requesterName: "Rodney Artichoke",
    subject: "I need help with aading a New Contact....",
  },
];

class Compute extends Component {
  render() {
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <h3>COMPUTE SPENDINGS</h3>
        <h4>Overview of the compute Services</h4>
        <JavascriptTable
          data={computeSpendingTable}
          columns={columns}
          id="spendOverView"
        />
      </>
    );
  }
}

export default Compute;
