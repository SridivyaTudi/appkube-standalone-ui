import React, { Component } from 'react';
import { Box, Button, List, ListItem } from "@mui/material";
import AmazonWebServices from './AmazonWebServices';
import AzureCloud from './AzureCloud';
import GoogleCloudPlatform from './GoogleCloudPlatform';
import { v4 } from "uuid";


class DiscoveredAssetsComponent extends Component {
  controlMapping = [
    {
      icon: "fa-user-gear",
      label: "Amazon Web Services",
      dataKey: "amazonWebServices",
    },
    {
      icon: "fa-users",
      label: "Google Cloud Platform",
      dataKey: "googleCloudPlatform",
    },
    {
      icon: "fa-user",
      label: "Azure Cloud",
      dataKey: "azureCloud",
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
      <Box className="services-panel-tabs">
      <Box className="tabs-head">
        <Box className="access-control-boxs">
          {this.controlMapping.map((tabData, index) => {
            return (
              <Box
                key={v4()}
                className={index === activeTab ? "active service-card" : ""}
                onClick={() => this.setActiveTab(index)}
              >
                <Box className="service-icon">
                <i >{tabData.icon}</i>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="tabs-content">
        <div style={{ display: activeTab === 0 ? "block" : "none" }}>
          <AmazonWebServices />
        </div>
        <div style={{ display: activeTab === 1 ? "block" : "none" }}>
          <AzureCloud />
        </div>
        <div style={{ display: activeTab === 2 ? "block" : "none" }}>
          <GoogleCloudPlatform />
        </div>
      </Box>
    </Box>
    )
  }
}

export default DiscoveredAssetsComponent;