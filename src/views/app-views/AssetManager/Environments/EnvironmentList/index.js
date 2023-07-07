import React, { Component } from "react";
import DiscoveredAssets from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets";
import Application from "views/app-views/AssetManager/Environments/EnvironmentList/Application";
import Billing from "views/app-views/AssetManager/Environments/EnvironmentList/Billing";
import ThreatEvents from "views/app-views/AssetManager/Environments/EnvironmentList/ThreatEvents";
import CompliancePolicies from "views/app-views/AssetManager/Environments/EnvironmentList/CompliancePolicies";
import Alerts from "views/app-views/AssetManager/Environments/EnvironmentList/Alerts";
import Inputs from "views/app-views/AssetManager/Environments/EnvironmentList/Inputs";
import ServicesNameLogo from "views/app-views/AssetManager/Environments/EnvironmentList/ServicesNameLogo";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import status from "redux/constants/commonDS";
import {
  getEnvironmentDataByLandingZone,
  getDepartments,
} from "redux/assetManager/environments/environmentData/environmentDataThunk";
import { getEnvsSummary } from "redux/assetManager/environments/environmentsThunk";
import { connect } from "react-redux";
import { getCurrentOrgId } from "utils";
class EnvironmentList extends Component {
  tabMapping = [
    {
      name: "Discovered Assets",
      dataKey: "discovered",
    },
    {
      name: "Application",
      dataKey: "application",
    },
    {
      name: "Billing",
      dataKey: "billing",
    },
    {
      name: "Threat and security Events",
      dataKey: "threat",
    },
    {
      name: "Compliance Policies",
      dataKey: "compliance",
    },
    {
      name: "Alerts",
      dataKey: "alerts",
    },
    {
      name: "Inputs",
      dataKey: "inputs",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      servicesPanelShow: false,
      activeTab: 0,
      productEnclaveList: [],
      service: this.getCloudName(),
      departmentWiseData: {},
      accountList: {},
      commonData: {},
      searchedAccountList: {},
      vpcsDetails: [],
      vpcsDetailsBackUp: [],
      landingZone: null,
    };
  }

  toggleColumnSelect = () => {
    this.setState({
      servicesPanelShow: !this.state.servicesPanelShow,
    });
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  getCloudName() {
    const queryPrm = new URLSearchParams(document.location.search);
    return queryPrm.get("cloudName");
  }

  componentDidMount = async () => {
    if (this.state.service !== localStorage.getItem("serviceName")) {
      this.setState({ service: localStorage.getItem("serviceName") });
    }
    this.setLandingZone();
    this.props.getEnvsSummary();
  };

  getVpcsDetails(treeData) {
    let vpcs = [];
    for (let vpcIndex = 0; vpcIndex < treeData.length; vpcIndex++) {
      let details = {
        name: "",
        product_count: 0,
        app_count: 0,
        data_count: 0,
      };
      details.name = treeData[vpcIndex].name;
      const clusters = treeData[vpcIndex].clusters;
      clusters.forEach((cluster) => {
        const products = cluster.products;
        details.product_count += products.length;
        products.forEach((product) => {
          const { environments, name } = product;
          environments.forEach((env) => {
            const { services } = env;
            services.common.forEach((appData) => {
              if (appData.app) {
                details.app_count += appData.app.length;
              }
              if (appData.data) {
                details.data_count += appData.data.length;
              }
            });
            services.business.forEach((appData) => {
              if (appData.app && appData.app.length > 0) {
                details.app_count += appData.app.length;
              }
              if (appData.data && appData.data.length > 0) {
                details.data_count += appData.data.length;
              }
            });
          });
        });
      });
      vpcs.push(details);
    }
    this.setState({
      vpcsDetails: vpcs,
      vpcsDetailsBackUp: vpcs,
    });
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.landingZone !== prevState.landingZone) {
      this.props.getDepartments(this.state.landingZone);
      let { landingZone } = this.state;
      this.props.getEnvironmentDataByLandingZone(landingZone);
    }

    if (prevProps.departments.status !== this.props.departments.status) {
      if (
        this.props.departments.status === status.SUCCESS &&
        this.props.departments.data
      ) {
        let depData = this.props.departments.data;
        this.setState({
          departmentWiseData: depData,
        });
      }
    }

    if (prevProps.allEnv.status !== this.props.allEnv.status) {
      if (
        this.props.allEnv.status === status.SUCCESS &&
        this.props.allEnv.data
      ) {
        let envs = this.props.allEnv.data;
        if (envs.length) {
          const commonData = {};
          const accounts = {};
          envs.forEach((account) => {
            accounts[account.cloud] = accounts[account.cloud] || [];
            accounts[account.cloud].push(account);
            commonData[account.cloud] = commonData[account.cloud]
              ? commonData[account.cloud]
              : {
                  totalBill: 0,
                };
            commonData[account.cloud].totalBill += account.totalBilling || 0;
          });
          this.setState({
            accountList: accounts,
            commonData,
            searchedAccountList: JSON.parse(JSON.stringify(accounts)),
          });
        }
      }
    }
  };

  setLandingZone = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const landingZone = urlParams.get("landingZone");
    this.setState({ landingZone });
  };

  updateCurrentAccountId = (id) => {
    this.setState({ landingZone: id });
  };

  renderEnvironmentBoxes = () => {
    const { accountList, commonData } = this.state;
    const currentEnv = accountList[this.getCloudName()];
    const retData = [];
    retData.push(
      <List>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#ff9900" }}></span>
            <p>Environments</p>
          </Box>
          <label>{currentEnv?.length}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#0089d6" }}></span>
            <p>Assets</p>
          </Box>
          <label>0</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#da4f44" }}></span>
            <p>Alerts</p>
          </Box>
          <label>0</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#00b929" }}></span>
            <p>Total Alerts</p>
          </Box>
          <label>&#65284;{commonData[this.getCloudName()]?.totalBill}</label>
        </ListItem>
      </List>
    );
    return retData;
  };

  render() {
    const { servicesPanelShow, activeTab } = this.state;
    return (
      <Box className="environment-container environmentlist">
        <Box className="list-heading">
          <h3>Environments</h3>
        </Box>
        <Box className="services-panel">
          <Box
            className={`services-panel-title p-t-10 p-b-10 ${
              servicesPanelShow ? "bottom-border" : ""
            }`}
          >
            <Box className="image">
              <img
                src={ServicesNameLogo.LOGOS[this.getCloudName()?.toUpperCase()]}
              />
            </Box>
            <Box className="name">{this.getCloudName()}</Box>
            <Box
              className="right-arrow"
              onClick={() => this.toggleColumnSelect("filterShow")}
            >
              <i
                className={`fa ${
                  servicesPanelShow ? "fa-caret-down" : "fa-caret-right"
                }`}
              ></i>
            </Box>
          </Box>
          <Box
            className="data-contant"
            style={{ display: servicesPanelShow ? "" : "none" }}
          >
            {this.renderEnvironmentBoxes()}
          </Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
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
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 ? (
              <DiscoveredAssets
                vpcsDetails={
                  this.state.vpcsDetails.length && this.state.vpcsDetails
                }
                allVpcsDetails={
                  this.state.vpcsDetailsBackUp.length &&
                  this.state.vpcsDetailsBackUp
                }
                updateCloudName={(service, landingZone) => {
                  this.setState({ service, landingZone });
                }}
                accountList={this.state.accountList}
                updateCurrentAccountId={this.updateCurrentAccountId}
                handleSearchVpcs={(vpcsDetails) => {
                  this.setState({ vpcsDetails });
                }}
              />
            ) : activeTab === 1 ? (
              <Application
                departmentWiseData={this.state?.departmentWiseData}
                updateCurrentAccountId={this.updateCurrentAccountId}
              />
            ) : activeTab === 2 ? (
              <Billing />
            ) : activeTab === 3 ? (
              <ThreatEvents
                updateCurrentAccountId={this.updateCurrentAccountId}
              />
            ) : activeTab === 4 ? (
              <CompliancePolicies
                updateCurrentAccountId={this.updateCurrentAccountId}
              />
            ) : activeTab === 5 ? (
              <Alerts updateCurrentAccountId={this.updateCurrentAccountId} />
            ) : (
              <Inputs updateCurrentAccountId={this.updateCurrentAccountId} />
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { departments, allEnv } = state.environmentData;
  return { departments, allEnv };
}

const mapDispatchToProps = {
  getEnvironmentDataByLandingZone,
  getEnvsSummary,
  getDepartments,
};
export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentList);
