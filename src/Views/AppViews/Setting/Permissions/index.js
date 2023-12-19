import React, { Component } from "react";
import { Box } from "@mui/material";
import RoleControl from "./RoleControl";
import GroupControl from "./GroupControl";
import UserControl from "./UserControl";
import Policies from "./Policies";
import Permissson from "./Permission";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { getActiveTab, deleteActiveTab, getCurrentUser } from "Utils";
import {
  getPermissionCategory,
  getPolicies,
  getUsers,
  getRoles,
  getGroups,
} from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
export class Permissions extends Component {
  controlMapping = [
    {
      icon: "fa-user-gear",
      label: "Role",
      value: 0,
      dataKey: "role",
    },
    {
      icon: "fa-users",
      label: "Group",
      value: 0,
      dataKey: "group",
    },
    {
      icon: "fa-user",
      label: "User",
      value: 0,
      dataKey: "user",
    },
    {
      icon: "fa-users",
      label: "Policies",
      value: 0,
      dataKey: "policies",
    },
    {
      icon: "fa-user",
      label: "Permissions",
      value: 0,
      dataKey: "permissions",
    },
  ];

  loder = {
    role: this.props.allRoles.status,
    group: this.props.allGroups.status,
    user: this.props.allUsers.status,
    policies: this.props.allPolicy.status,
    permissions: this.props.permissionCategory.status,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabMapping: this.controlMapping,
    };
  }

  componentDidMount = () => {
    this.setPreviousTab();
    this.props.getPermissionCategory();
    this.props.getPolicies();
    this.props.getUsers(this.getCurrentUserInfo().id);
    this.props.getRoles(this.getCurrentUserInfo().username);
    this.props.getGroups(this.getCurrentUserInfo().username);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allRoles.status !== prevProps.allRoles.status) {
      if (this.props.allRoles.status === status.SUCCESS) {
        let roles = this.props.allRoles.data;
        if (roles) {
          this.getTabCount("role", roles.length);
        }
      }
    }

    if (
      this.props.permissionCategory.status !==
      prevProps.permissionCategory.status
    ) {
      if (this.props.permissionCategory.status === status.SUCCESS) {
        let permissionCategory = this.props.permissionCategory.data;
        if (permissionCategory?.length) {
          let permissionCount = this.getPermissionLength(permissionCategory);
          this.getTabCount("permissions", permissionCount);
        }
      }
    }

    if (this.props.allPolicy.status !== prevProps.allPolicy.status) {
      if (this.props.allPolicy.status === status.SUCCESS) {
        let policies = this.props.allPolicy.data;
        if (policies) {
          this.getTabCount("policies", policies.length);
        }
      }
    }

    if (this.props.allUsers.status !== prevProps.allUsers.status) {
      if (this.props.allUsers.status === status.SUCCESS) {
        let users = this.props.allUsers.data;
        if (users?.length) {
          this.getTabCount("user", users.length);
        }
      }
    }

    if (this.props.allGroups.status !== prevProps.allGroups.status) {
      if (this.props.allGroups.status === status.SUCCESS) {
        let groups = this.props.allGroups.data;
        if (groups?.length) {
          this.getTabCount("group", groups.length);
        }
      }
    }
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  setPreviousTab = () => {
    let currentTab = getActiveTab();
    if (currentTab) {
      for (let tab = 0; tab < this.controlMapping.length; tab++) {
        const element = this.controlMapping[tab];
        if (currentTab.includes(element.dataKey)) {
          this.setActiveTab(tab);
          deleteActiveTab();
          break;
        }
      }
    }
  };

  // Render tabs
  renderTabMenu = () => {
    const { activeTab, tabMapping } = this.state;
    let {
      allGroups: { status: groupStatus },
      allPolicy: { status: policyStatus },
      allRoles: { status: roleStatus },
      allUsers: { status: userStatus },
    } = this.props;
    let isLoding = [groupStatus, policyStatus, roleStatus, userStatus].includes(
      status.IN_PROGRESS
    );
    return tabMapping.map((tabData, index) => {
      return (
        <Box
          key={`control-${index}`}
          className={index === activeTab ? "control-box active" : "control-box"}
          onClick={() => this.setActiveTab(index)}
        >
          <Box className="icon">
            <i className={`fa-solid ${tabData.icon}`}></i>
          </Box>
          <Box className="content">
            <label>{tabData.label}</label>
            {isLoding && this.loder[tabData.dataKey] ? (
              this.renderLoder()
            ) : (
              <strong>{tabData.value}</strong>
            )}
          </Box>
        </Box>
      );
    });
  };

  // Render active tab component
  renderActiveTabComponent = () => {
    const { activeTab } = this.state;
    return activeTab === 0 ? (
      <RoleControl />
    ) : activeTab === 1 ? (
      <GroupControl
        setActiveTab={() => {
          this.setActiveTab(0);
        }}
      />
    ) : activeTab === 2 ? (
      <UserControl />
    ) : activeTab === 3 ? (
      <Policies />
    ) : activeTab === 4 ? (
      <Permissson />
    ) : (
      <></>
    );
  };

  // Tab data length
  getTabCount = (key, count) => {
    if (key) {
      let { tabMapping } = this.state;
      tabMapping = tabMapping.map((tab) => {
        if (tab.dataKey === key) {
          tab.value = count;
        }
        return tab;
      });

      this.setState({ tabMapping });
    }
  };

  getPermissionLength = (data = []) => {
    let count = 0;
    if (data.length) {
      data.forEach((permission) => {
        if (permission?.permissions.length) {
          count = count + permission.permissions.length;
        }
      });
    }
    return count;
  };
  //CurrentUser details
  getCurrentUserInfo = () => {
    return getCurrentUser()
      ? getCurrentUser()?.info?.user
        ? getCurrentUser().info.user
        : { id: "", username: "" }
      : { id: "", username: "" };
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };
  render() {
    return (
      <Box className="permissions-container">
        <Box className="heading">Role Based Access Control</Box>
        <Box className="access-control-boxs">{this.renderTabMenu()}</Box>
        <Box className="access-control-container">
          {this.renderActiveTabComponent()}
        </Box>
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { allRoles, permissionCategory, allPolicy, allUsers, allGroups } =
    state.settings;
  return {
    allRoles,
    permissionCategory,
    allPolicy,
    allUsers,
    allGroups,
  };
};

const mapDispatchToProps = {
  getPermissionCategory,
  getPolicies,
  getUsers,
  getRoles,
  getGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
