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
} from "Redux/Dashboard/dashboardThunk";
import { connect } from "react-redux";
import { v4  } from 'uuid';

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
  };

  render() {
    const { activeTab } = this.state;
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
              <CostAnalysis />
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
  const { currentHourSpendRate } = state.dashboard;
  return { currentHourSpendRate };
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
