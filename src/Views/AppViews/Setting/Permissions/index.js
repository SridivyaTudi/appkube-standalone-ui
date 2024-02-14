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
import { getUserPermissionData } from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
import TitleIconAndCountOfCard from "Components/TitleIconAndCountOfCard";
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
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabMapping: this.controlMapping,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setPreviousTab();
    this.props.getUserPermissionData(this.user.username);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userPermissionData.status !==
      prevProps.userPermissionData.status
    ) {
      if (this.props.userPermissionData.status === status.SUCCESS) {
        let userPermissionData = this.props.userPermissionData.data;
        if (userPermissionData) {
          let { permissionCategories, roles, policies, roleGroups, users } =
            userPermissionData;

          let data = {
            role: roles?.length,
            permissions: this.getPermissionLength(permissionCategories),
            policies: policies?.length,
            user: users?.length,
            group: roleGroups?.length,
          };
          this.getTabCount(data);
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

  renderTabMenu = () => {
    const { activeTab, tabMapping } = this.state;
    let {
      userPermissionData: { status: userStatus },
    } = this.props;
    let isLoding = userStatus === status.IN_PROGRESS;
    return tabMapping.map((tabData, index) => {
      let cuttentItem = {
        active: index === activeTab ? "active" : "",
        image: <i className={`fa-solid ${tabData.icon}`}></i>,
        title: tabData.label,
        count: tabData.value,
        isLoding,
        isIcon: true,
        style: { width: "200px" },
      };
      return (
        <TitleIconAndCountOfCard
          data={cuttentItem}
          onClickCard={(data) => {
            this.setActiveTab(index);
          }}
        />
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
  getTabCount = (data) => {
    if (data) {
      let { tabMapping } = this.state;
      tabMapping = tabMapping.map((tab) => {
        if (data[tab.dataKey]) {
          tab.value = data[tab.dataKey];
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
  const { userPermissionData } = state.settings;
  return {
    userPermissionData,
  };
};

const mapDispatchToProps = {
  getUserPermissionData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
