import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import DrTopology from "./DrTopology";
import Topology from "./Topology";
import { Box, List, ListItem, Button } from "@mui/material";

class DisasterRecovery extends Component {
  tabMapping = [
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "Health",
      dataKey: "Health",
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
      <Box className="disaster-recovery-container">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={`${index}`}
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
            {activeTab === 0 && <DrTopology />}
            {activeTab === 1 && <Topology />}
            {activeTab === 2 && <Box>Health</Box>}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DisasterRecovery;
