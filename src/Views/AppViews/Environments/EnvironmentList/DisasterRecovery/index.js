import React, { Component } from "react";
import DrTopology from "./DrTopology";
import Topology from "./Topology";
import { Box, Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import ActivityLogViewDetails from "Views/AppViews/Environments/EnvironmentList/DisasterRecovery/Components/ActivityLogViewDetails";
import { v4 } from "uuid";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

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
            <Box className="tabs-head ">
              <h3>HRMS</h3>
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
              <Box className="breadcrumbs-content">
                <ul>
                  <li>
                    <Link to={`/environments`}>Environments</Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">AWS &nbsp; (062041849235)</li>
                </ul>
              </Box>
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
