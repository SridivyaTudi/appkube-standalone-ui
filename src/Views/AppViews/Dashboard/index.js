import React, { Component } from "react";
import SpendAnalytics from "./SpendAnalytics";
import CostAnalysis from "./CostAnalysis";
import SLAMetrics from "./SlaMetrics";
import ProcessCentral from "./ProcessCentral";
import Planet from "assets/img/dashboard/planet2.png";
import { Box, List, ListItem } from "@mui/material";
import {
  getCurrentHourSpendRate,
  getCurrentDaySpendRate,
  getTodaySpendAnalytics,
  getYesterdaySpendAnalytics,
  getTotalSpend,
  getMonthlyCloudWiseSpend,
  getTotalCloudWiseSpend,
  getMonthlyStatistics,
  getTotalBudget,
  getProductWiseCost,
  getProductionVsOther,
  getServiceTypeWiseCost,
} from "Redux/Dashboard/DashboardThunk";
import { connect } from "react-redux";
import { v4 } from "uuid";
import { getCurrentOrgId } from "Utils";
import status from "Redux/Constants/CommonDS";

class Dashboard extends Component {
  tabMapping = [
    {
      name: "Spend Analytics",
      dataKey: "spend",
    },
    {
      name: "Cost Analysis",
      dataKey: "cost",
    },
    {
      name: "SLA Metrics",
      dataKey: "metrics",
    },
    {
      name: "Process Central",
      dataKey: "process",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      productWiseCostData: [],
      productionVsOthersData: [],
      serviceTypeWiseCostData: [],
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  componentDidMount = () => {
    this.props.getCurrentHourSpendRate();
    this.props.getCurrentDaySpendRate();
    this.props.getTodaySpendAnalytics();
    this.props.getYesterdaySpendAnalytics();
    this.props.getTotalSpend();
    this.props.getMonthlyCloudWiseSpend();
    this.props.getTotalCloudWiseSpend();
    this.props.getMonthlyStatistics();
    this.props.getTotalBudget();
    this.props.getProductWiseCost(getCurrentOrgId());
    this.props.getProductionVsOther(getCurrentOrgId());
    this.props.getServiceTypeWiseCost(getCurrentOrgId());
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.productWiseCost.status !== this.props.productWiseCost.status &&
      this.props.productWiseCost.status === status.SUCCESS
    ) {
      this.setState({ productWiseCostData: this.props.productWiseCost.data });
    }

    if (
      prevProps.productionVsOther.status !==
        this.props.productionVsOther.status &&
      this.props.productionVsOther.status === status.SUCCESS
    ) {
      this.setState({
        productionVsOthersData: this.props.productionVsOther.data,
      });
    }

    if (
      prevProps.serviceTypeWiseCost.status !==
        this.props.serviceTypeWiseCost.status &&
      this.props.serviceTypeWiseCost.status === status.SUCCESS
    ) {
      this.setState({
        serviceTypeWiseCostData: this.props.serviceTypeWiseCost.data,
      });
    }
  };

  render() {
    const {
      activeTab,
      productWiseCostData,
      productionVsOthersData,
      serviceTypeWiseCostData,
    } = this.state;
    return (
      <Box className="dashboard-container">
        <Box className="dashboard-inner">
          <Box className="dashboard-image">
            <img src={Planet} alt="Planet" />
          </Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <h2>Dashboard</h2>
            <List>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={v4()}
                    className={index === activeTab ? "active" : ""}
                    onClick={() => this.setActiveTab(index)}
                  >
                    {tabData.name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 ? (
              <SpendAnalytics />
            ) : activeTab === 1 ? (
              <CostAnalysis
                productWiseCostData={productWiseCostData}
                productionVsOthersData={productionVsOthersData}
                serviceTypeWiseCostData={serviceTypeWiseCostData}
              />
            ) : activeTab === 2 ? (
              <SLAMetrics />
            ) : activeTab === 3 ? (
              <ProcessCentral />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const {
    currentHourSpendRate,
    productWiseCost,
    productionVsOther,
    serviceTypeWiseCost,
  } = state.dashboard;
  return {
    currentHourSpendRate,
    productWiseCost,
    productionVsOther,
    serviceTypeWiseCost,
  };
}
const mapDispatchToProps = {
  getCurrentHourSpendRate,
  getCurrentDaySpendRate,
  getTodaySpendAnalytics,
  getYesterdaySpendAnalytics,
  getTotalSpend,
  getMonthlyCloudWiseSpend,
  getTotalCloudWiseSpend,
  getMonthlyStatistics,
  getTotalBudget,
  getProductWiseCost,
  getProductionVsOther,
  getServiceTypeWiseCost,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
