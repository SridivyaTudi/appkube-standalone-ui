import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import AwsComponent from "./AwsComponent";


class BudgetDashboard extends Component {
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

  componentWillUnmount() {
    this.removeTooltipElement();
  }

  removeTooltipElement = () => {
    try {
      const elements = document.getElementsByClassName("chart-tooltip");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          <Box>Azure Component</Box>
        ) : activeTab === 2 ? (
          <Box>Gcp Component</Box>
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
          <h3>Budget Dashboard</h3>
          <Box className="fliter-button">
            <Button className="light-btn p-l-15 p-r-15">
              <i class="fas fa-calendar-minus m-r-2"></i> Last Quarter
            </Button>
          </Box>
        </Box>
        <Box className="reports-tab-section">
          <Box className="tabs">{this.renderTabMenu()}</Box>
          {this.renderActiveTabOfComponent()}
        </Box>
      </Box>
    );
  }
}

export default BudgetDashboard;
