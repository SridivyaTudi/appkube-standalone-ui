import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import AwsComponent from "./AwsComponent";
import AzureComponent from "./AzureComponent";
import GcpComponent from "./GcpComponent";

export class OverviewDashboard extends Component {
  tabMapping = [
    {
      name: "AWS",
      dataKey: "aws",
      index: 0,
    },
    {
      name: "AZURE",
      dataKey: "azure",
      index: 1,
    },
    {
      name: "GCP",
      dataKey: "gcp",
      index: 2,
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

  // Render tabs
  renderTabMenu = () => {
    const { activeTab } = this.state;
    return (
      <List className="tabs-menu">
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
    );
  };

  // Render active tab component
  renderActiveTabOfComponent = () => {
    const { activeTab } = this.state;
    return (
      <Box className="tabs-content">
        {activeTab === 0 ? (
          <AwsComponent />
        ) : activeTab === 1 ? (
          <AzureComponent />
        ) : activeTab === 2 ? (
          <GcpComponent />
        ) : (
          <></>
        )}
      </Box>
    );
  };

  render() {
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>AWS Overview Dashboard</h3>
          <Button className="light-btn p-l-15 p-r-15">
            <i class="fas fa-calendar-minus m-r-2"></i> Last Quarter
          </Button>
        </Box>
        <Box className="reports-tab-section">
          <Box className="tabs">{this.renderTabMenu()}</Box>
          {this.renderActiveTabOfComponent()}
        </Box>
      </Box>
    );
  }
}

export default OverviewDashboard;
