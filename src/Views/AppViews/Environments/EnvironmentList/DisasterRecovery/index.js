import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import DrTopology from "./DrTopology";
import Topology from "./Topology";
import { Box, List, ListItem, Button } from "@mui/material";
import ActivityLogViewDetails from "Views/AppViews/Environments/EnvironmentList/DisasterRecovery/Components/ActivityLogViewDetails";

class DisasterRecovery extends Component {
  tabMapping = [
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "IOT Topology",
      dataKey: "IotTopology",
    },
    {
      name: "Lake Topology",
      dataKey: "LakeTopology",
    },
    {
      name: "Mesh Topology",
      dataKey: "MeshTopology",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isActivityViewDetails: false,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab, isActivityViewDetails } = this.state;
    return (
      <Box className="disaster-recovery-container">
        {isActivityViewDetails ? (
          <ActivityLogViewDetails
            backToDRS={() => {
              this.setState({ isActivityViewDetails: false });
            }}
          />
        ) : (
          <Box className="services-panel-tabs">
            <Box className="tabs-head">
              <h3>HRMS</h3>
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
              <Button
                className="primary-btn min-width"
                component={Link}
                variant="contained"
                to={`${APP_PREFIX_PATH}/environments`}
              >
                Back to Infra View
              </Button>
            </Box>
            <Box className="tabs-content">
              {activeTab === 0 && <Topology />}
              {activeTab === 1 && (
                <DrTopology
                  redirectViewDetails={() => {
                    this.setState({ isActivityViewDetails: true });
                  }}
                />
              )}
              {activeTab === 2 && <Box>IOT Topology</Box>}
              {activeTab === 3 && <Box>Lake Topology</Box>}
              {activeTab === 4 && <Box>Mesh Topology</Box>}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

export default DisasterRecovery;
