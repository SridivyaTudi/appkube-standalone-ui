import React, { Component } from "react";
import { v4 } from "uuid";
import { Box } from "@mui/material";
import TabsMenu from "../../Environments/EnvironmentList/TabsMenu";
import Devsecops from "./Devsecops";
import Enviroment from "./Enviroment";
import Sre from "./Sre";
import Product from "./Product";

class Permission extends Component {
  tabMapping = [
    {
      name: "Enviroment",
    },
    {
      name: "Product",
    },
    {
      name: "SRE",
    },
    {
      name: "DevSecOps",
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

  // Render tabs Component
  renderTabsMenuComponent = () => {
    const { activeTab } = this.state;
    return (
      <TabsMenu
        tabs={this.tabMapping}
        setActiveTab={this.setActiveTab}
        activeTab={activeTab}
        breakWidth={992}
        key={v4()}
      />
    );
  };

  // Render active tab component
  renderActiveTabComponent = () => {
    const { activeTab } = this.state;
    return activeTab === 0 ? (
      <Enviroment />
    ) : activeTab === 1 ? (
      <Product />
    ) : activeTab === 2 ? (
      <Sre />
    ) : activeTab === 3 ? (
      <Devsecops />
    ) : (
      <></>
    );
  };

  render() {
    return (
      <Box className="permission-container">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">{this.renderTabsMenuComponent()}</Box>
          <Box className="permission-tabs-content">
            {this.renderActiveTabComponent()}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Permission;
