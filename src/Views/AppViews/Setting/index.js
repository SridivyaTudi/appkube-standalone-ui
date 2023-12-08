import React, { Component } from "react";
import { Box, List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
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

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
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

  getCurrentUserInfo = () => {
    let userInfo = getCurrentUser()
      ? getCurrentUser()?.info?.user
        ? getCurrentUser().info.user
        : { username: "" }
      : { username: "" };

    let { organization, username } = userInfo;
    let role = organization?.updatedBy || "";
    if (role) {
      role = role.charAt(0)?.toUpperCase() + role?.slice(1);
    }
    return { username, role };
  };

  // Render page header
  renderHeader = () => {
    return (
      <Box className="page-header">
        <h3>{this.getCurrentUserInfo().username}</h3>
        <Button
          className="primary-outline-btn min-width-inherit"
          variant="outlined"
        >
          <img
            src={AccountIcon}
            alt=""
            style={{ maxWidth: "10px", marginRight: "5px" }}
          />
          Admin
        </Button>
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
