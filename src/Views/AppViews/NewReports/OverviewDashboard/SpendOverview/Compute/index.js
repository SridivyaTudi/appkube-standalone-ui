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
  render() {
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <h3>COMPUTE SPENDINGS</h3>
        <h4>Overview of the compute Services</h4>
        <SpendingTable data={computeSpendingTable} />
      </>
    );
  }
}

export default Compute;
