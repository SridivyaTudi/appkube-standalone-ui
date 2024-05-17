import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import Threshold from "./Components/Threshold";


export class AlertTypes extends Component {
  tabMapping = [
    {
      name: "Threshold",
      dataKey: "threshold",
      index: 0,
    },
    {
      name: "Relative",
      dataKey: "relative",
      index: 1,
    },
    {
      name: "Availability",
      dataKey: "availability",
      index: 2,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isSelectDepartmentOpen: false,
      selectedGranularity: GRANULARITY_TYPE.QUARTERLY.toLowerCase(),
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
    const { activeTab, selectedGranularity } = this.state;
    return (
      <Box className="tabs-content">
        {activeTab === 0 ? (
          <Threshold />
        ) : activeTab === 1 ? (
          <Box>Relative</Box>
        ) : activeTab === 2 ? (
          <Box>Availability</Box>
        ) : (
          <></>
        )}
      </Box>
    );
  };
  render() {
    return (
      <Box className="alert-details">
        <Box className="alert-detail-head">
          <label>Alert Type</label>
          <Button
            className="primary-btn min-width"
            variant="contained"
            disabled
          >
            Save Rule
          </Button>
        </Box>
        <Box className="alert-tab-section">
          <Box className="tabs">{this.renderTabMenu()}</Box>
          {this.renderActiveTabOfComponent()}
        </Box>
      </Box>
    );
  }
}

export default AlertTypes;
