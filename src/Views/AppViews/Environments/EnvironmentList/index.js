import React, { Component } from "react";
import DiscoveredAssets from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets";
import Application from "Views/AppViews/Environments/EnvironmentList/Application";
import Billing from "Views/AppViews/Environments/EnvironmentList/Billing";
import ThreatEvents from "Views/AppViews/Environments/EnvironmentList/ThreatEvents";
import CompliancePolicies from "Views/AppViews/Environments/EnvironmentList/CompliancePolicies";
import Alerts from "Views/AppViews/Environments/EnvironmentList/Alerts";
import Inputs from "Views/AppViews/Environments/EnvironmentList/Inputs";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import status from "Redux/Constants/CommonDS";
import {
  getEnvironmentDataByLandingZone,
  getDepartments,
  getEnvironmentBoxesData,
} from "Redux/EnvironmentData/EnvironmentDataThunk";
import { getEnvsSummary } from "Redux/Environments/EnvironmentsThunk";
import { connect } from "react-redux";
import { LOGOS } from "CommonData";
import { v4 } from "uuid";
import { getCurrentOrgId } from "Utils";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

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
      showLandingZoneDetails: false,
      activeTab: 0,
      accountList: {},
      commonData: {},
      searchedAccountList: {},
      vpcsDetails: [],
      vpcsDetailsBackUp: [],
      landingZone: null,
      cloudName: "",
      environmentBoxesData: {},
    };
  }

  toggleLandingZoneDetails = () => {
    this.setState({
      showLandingZoneDetails: !this.state.showLandingZoneDetails,
    });
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  componentDidMount = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    this.setState(
      {
        cloudName: queryPrm.get("cloudName"),
        landingZone: queryPrm.get("landingZone"),
      },
      () => {
        const params = {
          orgId: getCurrentOrgId(),
          cloud: this.state.cloudName,
          landingZone: this.state.landingZone,
        };
        this.props.getEnvironmentBoxesData(params);
      }
    );
    this.props.getEnvsSummary();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.landingZone !== prevState.landingZone) {
      this.props.getDepartments(this.state.landingZone);
      let { landingZone } = this.state;
      this.props.getEnvironmentDataByLandingZone(landingZone);
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

    if (
      prevProps.environmentBoxesData.status !==
        this.props.environmentBoxesData.status &&
      this.props.environmentBoxesData.status === status.SUCCESS
    ) {
      this.setState({
        environmentBoxesData: this.props.environmentBoxesData.data,
      });
    }
  };

  updateCurrentAccountId = (id) => {
    this.setState({ landingZone: id });
  };

  renderEnvironmentBoxes = () => {
    const { environmentBoxesData } = this.state;
    const retData = [];
    retData.push(
      <List key={v4()}>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#ff9900" }}></span>
            <p>Environments</p>
          </Box>
          <label>{environmentBoxesData.environments}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#0089d6" }}></span>
            <p>Assets</p>
          </Box>
          <label>{environmentBoxesData.assets}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#da4f44" }}></span>
            <p>Alerts</p>
          </Box>
          <label>{environmentBoxesData.alerts}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#00b929" }}></span>
            <p>Total Billing</p>
          </Box>
          <label>{environmentBoxesData.totalbilling}</label>
        </ListItem>
      </List>
    );
    return retData;
  };

  render() {
    const {
      showLandingZoneDetails,
      activeTab,
      cloudName,
      environmentBoxesData,
    } = this.state;
    return (
      <Box className="environment-container environmentlist">
        <Box className="list-heading">
          <h3>Environments</h3>
          <Button
            className="primary-btn min-width"
            component={Link}
            variant="contained"
            to={`${APP_PREFIX_PATH}/environments`}
          >
            Back to Infra View
          </Button>
        </Box>
        <Box className="services-panel">
          <Box
            className={`services-panel-title p-t-10 p-b-10 ${
              showLandingZoneDetails ? "bottom-border" : ""
            }`}
          >
            <Box className="image">
              <img src={LOGOS[environmentBoxesData.cloud?.toUpperCase()]} />
            </Box>
            <Box className="name">{cloudName}</Box>
            <Box
              className="right-arrow"
              onClick={() => this.toggleLandingZoneDetails("filterShow")}
            >
              <i
                className={`fa ${
                  showLandingZoneDetails ? "fa-caret-down" : "fa-caret-right"
                }`}
              ></i>
            </Box>
          </Box>
          <Box
            className="data-contant"
            style={{ display: showLandingZoneDetails ? "" : "none" }}
          >
            {environmentBoxesData ? this.renderEnvironmentBoxes() : <></>}
          </Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={v4()}
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
                updateCloudNameAndLandingZone={(service, landingZone) => {
                  this.setState({ service, landingZone });
                }}
                accountList={this.state.accountList}
                updateCurrentAccountId={this.updateCurrentAccountId}
              />
            ) : activeTab === 1 ? (
              <Application />
            ) : activeTab === 2 ? (
              <Billing />
            ) : activeTab === 3 ? (
              <ThreatEvents />
            ) : activeTab === 4 ? (
              <CompliancePolicies />
            ) : activeTab === 5 ? (
              <Alerts />
            ) : (
              <Inputs />
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { departments, allEnv, environmentBoxesData } = state.environmentData;
  return { departments, allEnv, environmentBoxesData };
}

const mapDispatchToProps = {
  getEnvironmentDataByLandingZone,
  getEnvsSummary,
  getDepartments,
  getEnvironmentBoxesData,
};
export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentList);
