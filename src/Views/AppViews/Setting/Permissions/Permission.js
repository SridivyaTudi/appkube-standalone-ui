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
      permissionCategory: [],
    };
  }

  componentDidMount = () => {
    let permissionCategory = this.props?.permissionCategory?.data;
    if (permissionCategory?.length) {
      this.setState({ permissionCategory });
    }
  };
  
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.permissionCategory.status !==
      prevProps.permissionCategory.status
    ) {
      if (this.props.permissionCategory.status === status.SUCCESS) {
        let permissionCategory = this.props.permissionCategory.data;
        if (permissionCategory?.length) {
          this.setState({ permissionCategory });
        }
      }
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
    const { activeTab, permissionCategory } = this.state;
    return (
      <TabsMenu
        tabs={permissionCategory.length ? permissionCategory : []}
        setActiveTab={this.setActiveTab}
        activeTab={activeTab}
        breakWidth={992}
        key={v4()}
      />
    );
  };

  // Render active tab component
  renderActiveTabComponent = () => {
    let { activeTab, permissionCategory } = this.state;
    let permissions = permissionCategory?.[activeTab]?.permissions;
    permissions = permissions?.length ? permissions : [];

    if (this.props.permissionCategory.status === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return <PermissionTable data={permissions} />;
    }
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
const mapStateToProps = (state) => {
  const { permissionCategory } = state.settings;
  return {
    permissionCategory,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
