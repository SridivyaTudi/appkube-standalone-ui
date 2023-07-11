import React, { Component } from "react";
import SpendAnalytics from "views/app-views/AssetManager/Dashboard/spendAnalytics";
import CostAnalysis from "views/app-views/AssetManager/Dashboard/costAnalysis";
import SLAMetrics from "views/app-views/AssetManager/Dashboard/slaMetrics";
import ProcessCentral from "views/app-views/AssetManager/Dashboard/processCentral";
import Planet from "assets/img/dashboard/planet2.png";
import { Box, List, ListItem } from "@mui/material";
import {
  getCurrentHourSpendRate,
  getCurrentDaySpendRate,
  getTodaySpendAnalytics,
  getYesterdaySpendAnalytics,
} from "redux/assetManager/dashboard/dashboardThunk";
import { connect } from "react-redux";
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
                    key={`ops-tab-${index}`}
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
  getYesterdaySpendAnalytics
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
