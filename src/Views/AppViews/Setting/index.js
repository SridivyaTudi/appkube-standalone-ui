import React, { Component } from "react";
import { Box, List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import AccountIcon from "assets/img/setting/account.png";
import Account from "./Account";
import Permissions from "./Permissions";
import Notification from "./Notification";
import Appearance from "./Appearance";
import Billing from "./Billing";

export class Setting extends Component {
  tabMapping = [
    {
      name: "Account",
      dataKey: "account",
    },
    {
      name: "Users and Permissions",
      dataKey: "permissions",
    },
    {
      name: "Notification",
      dataKey: "notification",
    },
    {
      name: "Appearance",
      dataKey: "appearance",
    },
    {
      name: "Billing",
      dataKey: "billing",
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
      <Box className="setting-container">
        <Box className="page-header">
          <h3>James Kernal</h3>
          <Button
            className="primary-outline-btn min-width-inherit"
            variant="outlined"
          >
            <img
              src={AccountIcon}
              alt=""
              style={{ maxWidth: "10px", marginRight: "5px" }}
            />{" "}
            Admin
          </Button>
        </Box>
        <Box className="tabs">
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
        </Box>
      </Box>
    );
  }
}
export default Setting;
