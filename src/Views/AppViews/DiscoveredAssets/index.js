import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import DiscoveredAssetsComponent from "./Components/DiscoveredAssetsComponent";
import NonLTEAssets from "./Components/NonLTEAssets";
import TaggedAssets from "./Components/TaggedAssets";
import UntaggedAssets from "./Components/UntaggedAssets";
import TabsMenu from "./TabsMenu";
import { v4 } from "uuid";




class DiscoveredAssets extends Component {
  tabMapping = [
    {
      name: "Discovered Assets",
    },
    {
      name: "Tagged Assets",
    },
    {
      name: "Untagged Assets",
    },
    {
      name: "Non LTE Assets",
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
    const { activeTab,  } = this.state;
    return (
      <Box className="discovered-assets-container">
        <Box className="assets-heading">
          <h3 className="m-b-0">ASSETS MANAGEMENT</h3>
          <Button className="primary-btn min-width-inherit" variant="contained">
            Back
          </Button>
        </Box>
        <Box className="global-services-fliter">
          <Box className="heading">Discovered Assets</Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <TabsMenu
              tabs={this.tabMapping}
              setActiveTab={this.setActiveTab}
              activeTab={activeTab}
              breakWidth={992}
              key={v4()}
            />
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 ? (
              <DiscoveredAssetsComponent />
            ) : activeTab === 1 ? (
              <TaggedAssets />
            ) : activeTab === 2 ? (
              <UntaggedAssets />
            ) : activeTab === 3 ? (
              <NonLTEAssets />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DiscoveredAssets;
