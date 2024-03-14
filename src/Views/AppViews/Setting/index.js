import React, { Component } from "react";
import { Box, List, ListItem } from "@mui/material";
import AccountIcon from "assets/img/setting/account.png";
import Account from "./Account";
import Permissions from "./Permissions";
import Notification from "./Notification";
import Appearance from "./Appearance";
import Billing from "./Billing";
import { deleteActiveTab, getActiveTab, getCurrentUser } from "Utils";

export class Setting extends Component {
  tabMapping = [
    {
      name: "Account",
      dataKey: "account",
      index: 0,
    },
    {
      name: "Users and Permissions",
      dataKey: "permissions",
      index: 1,
    },
    {
      name: "Notification",
      dataKey: "notification",
      index: 2,
    },
    {
      name: "Appearance",
      dataKey: "appearance",
      index: 3,
    },
    {
      name: "Billing",
      dataKey: "billing",
      index: 4,
    },
  ];
  user = { username: "", email: "", profileImage: "" };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setPreviousTab();
  };

  setPreviousTab = () => {
    let currentTab = getActiveTab();
    if (currentTab) {
      for (let tab = 0; tab < this.tabMapping.length; tab++) {
        const element = this.tabMapping[tab];

        if (currentTab.includes(element.dataKey)) {
          this.setActiveTab(element.index);

          if (!currentTab.includes("/")) {
            deleteActiveTab();
          }
          break;
        }
      }
    }
  };
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  // Render page header
  renderHeader = () => {
    return (
      <Box className="page-header">
        <h3>{this.user.username}</h3>
        <div className="header-title" variant="outlined">
          <img src={AccountIcon} alt="" style={{ marginRight: "5px" }} />
          <span className="name">{this.user.type}</span>
        </div>
      </Box>
    );
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
          <Account />
        ) : activeTab === 1 ? (
          <Permissions />
        ) : activeTab === 2 ? (
          <Notification />
        ) : activeTab === 3 ? (
          <Appearance />
        ) : activeTab === 4 ? (
          <Billing />
        ) : (
          <></>
        )}
      </Box>
    );
  };

  render() {
    return (
      <Box className="setting-container">
        {this.renderHeader()}
        <Box className="tabs">
          {this.renderTabMenu()}
          {this.renderActiveTabOfComponent()}
        </Box>
      </Box>
    );
  }
}
export default Setting;
