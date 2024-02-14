import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import AmazonWebServices from "./AmazonWebServices";
import AzureCloud from "./AzureCloud";
import GoogleCloudPlatform from "./GoogleCloudPlatform";
import { v4 } from "uuid";
import Aws from "assets/img/aws.png";
import GoogleCloud from "assets/img/google-cloud.png";
import Microsoftazure from "assets/img/microsoftazure.png";
import { tab } from "@testing-library/user-event/dist/tab";

class DiscoveredAssetsComponent extends Component {
  controlMapping = [
    {
      image: Aws,
      label: "Amazon Web Services",
      dataKey: "amazonWebServices",
    },
    {
      image: GoogleCloud,
      label: "Google Cloud Platform",
      dataKey: "googleCloudPlatform",
    },
    {
      image: Microsoftazure,
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
      <Box className="discovered-assets-inner-tabs">
        <Box className="assets-sevices-tabs">
          {this.controlMapping.map((tabData, index) => {
            return (
              <Box
                key={v4()}
                className={`assets-sevice-tab ${
                  index === activeTab ? "active" : ""
                }`}
                onClick={() => this.setActiveTab(index)}
              >
                <Box className="service-image">
                  <img src={tabData.image} alt="" />
                </Box>
                <label>{tabData.label}</label>
              </Box>
            );
          })}
          <Box className="tabs-content">
          {activeTab === 0 ? (
              <AmazonWebServices />
            ) : activeTab === 1 ? (
              <GoogleCloudPlatform />
            ) : activeTab === 2 ? (
              <AzureCloud />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DiscoveredAssetsComponent;
