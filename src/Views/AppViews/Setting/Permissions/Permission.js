import React, { Component } from "react";
import { v4 } from "uuid";
import { Box } from "@mui/material";
import TabsMenu from "../../Environments/EnvironmentList/TabsMenu";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import PermissionTable from "Views/AppViews/Setting/Permissions/Components/PermissionTable";

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      permissionCategories: [],
    };
  }

  componentDidMount = () => {
    this.setStatePermission();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userPermissionData !== prevProps.userPermissionData) {
      this.setStatePermission();
    }
  };

  setStatePermission = () => {
    let permissionCategories =
      this.props.userPermissionData.data?.permissionCategories || [];
    if (permissionCategories?.length) {
      this.setState({ permissionCategories });
    } else {
      this.setState({ permissionCategories: [] });
    }
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  };
  // Render tabs Component
  renderTabsMenuComponent = () => {
    const { activeTab, permissionCategories } = this.state;
    return (
      <TabsMenu 
        tabs={permissionCategories.length ? permissionCategories : []}
        setActiveTab={this.setActiveTab}
        activeTab={activeTab}
        breakWidth={881}
        key={v4()}
      />
    );
  };

  // Render active tab component
  renderActiveTabComponent = () => {
    let { activeTab, permissionCategories } = this.state;
    let permissions = permissionCategories?.[activeTab]?.permissions;
    permissions = permissions?.length ? permissions : [];

    if (this.props.userPermissionData.status === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return <PermissionTable data={permissions} />;
    }
  };

  render() {
    return (
      <Box className="permission-container">
        <Box className="services-panel-tabs text-center" >
          <Box className="tabs-head  m-t-0">{this.renderTabsMenuComponent()}</Box>
          <Box className="permission-tabs-content">
            {this.renderActiveTabComponent()}
          </Box>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
