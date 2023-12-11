import React, { Component } from "react";
import { v4 } from "uuid";
import { Box } from "@mui/material";
import TabsMenu from "../../Environments/EnvironmentList/TabsMenu";
import Devsecops from "./Devsecops";
import Enviroment from "./Enviroment";
import Sre from "./Sre";
import Product from "./Product";
import { getPermissionCategory } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { ToastMessage } from "Toast/ToastMessage";
class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      permissionCategory: [],
      permissionCount: 0,
    };
  }

  componentDidMount = () => {
   
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
    const { activeTab, permissionCategory } = this.state;
    let permissions = permissionCategory?.[activeTab]?.permissions
      ? permissionCategory[activeTab]?.permissions
      : [];

    return activeTab === 0 ? (
      <Enviroment data={permissions} />
    ) : activeTab === 1 ? (
      <Product data={permissions} />
    ) : activeTab === 2 ? (
      <Sre data={permissions} />
    ) : activeTab === 3 ? (
      <Devsecops data={permissions} />
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
const mapStateToProps = (state) => {
  const { permissionCategory } = state.settings;
  return {
    permissionCategory,
  };
};

const mapDispatchToProps = {
  getPermissionCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
