import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Summary from "./Components/Summary";
import History from "./Components/History";
import Diagnostics from "./Components/Diagnostics";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

class AlertPercentage extends Component {
  tabMapping = [
    {
      name: "Summary",
      dataKey: "summary",
      index: 0,
    },
    {
      name: "History",
      dataKey: "history",
      index: 1,
    },
    {
      name: "Diagnostics",
      dataKey: "diagnostics",
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
          <Summary/>
        ) : activeTab === 1 ? (
          <History/>
        ) : activeTab === 2 ? (
          <Diagnostics/>
        ) : (
          <></>
        )}
      </Box>
    );
  };

  render() {
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Alert : Percentage CPU</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate(`${APP_PREFIX_PATH}/alerts`)
                }
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Percentage | Alerts</li>
            </ul>
          </Box>
        </Box>
        <Box className="alert-tab-section">
          <Box className="tabs">{this.renderTabMenu()}</Box>
          {this.renderActiveTabOfComponent()}
        </Box>
      </Box>
    );
  }
}

export default navigateRouter(AlertPercentage);
