import React, { Component } from "react";
import SpendAnalytics from "./spendAnalytics";
import CostAnalysis from "./costAnalysis";
import SLMMetrics from "./slmMetrics";
import ProcessCentral from "./processCentral";
import Planet from "../../../../assets/img/dashboard/planet2.png";
import {Box, List, ListItem} from "@mui/material";

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
      name: "SLM Metrics",
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
              <SLMMetrics />
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

export default Dashboard;
