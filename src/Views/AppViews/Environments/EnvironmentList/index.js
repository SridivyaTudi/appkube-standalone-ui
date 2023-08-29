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
import { getSingleEnvironmentCountData } from "Redux/EnvironmentData/EnvironmentDataThunk";
import { connect } from "react-redux";
import { LOGOS } from "CommonData";
import { getCurrentOrgId } from "Utils";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import TabsMenu from "./TabsMenu";

class EnvironmentList extends Component {
  tabMapping = [
    {
      name: "Discovered Assets",
    },
    {
      name: "Application",
    },
    {
      name: "Billing",
    },
    {
      name: "Threat and security Events",
    },
    {
      name: "Compliance Policies",
    },
    {
      name: "Alerts",
    },
    {
      name: "Inputs",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      showLandingZoneDetails: false,
      activeTab: 0,
      cloudName: "",
      singleEnvironmentCountData: {},
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
    this.setState({
      cloudName: queryPrm.get("cloudName"),
    });
    const params = {
      orgId: getCurrentOrgId(),
      cloud: queryPrm.get("cloudName"),
      landingZone: queryPrm.get("landingZone"),
    };
    // this.props.getSingleEnvironmentCountData(params);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.singleEnvironmentCountData.status !==
        this.props.singleEnvironmentCountData.status &&
      this.props.singleEnvironmentCountData.status === status.SUCCESS
    ) {
      this.setState({
        singleEnvironmentCountData: this.props.singleEnvironmentCountData.data,
      });
    }
  };

  renderLandingZoneData = () => {
    const { singleEnvironmentCountData } = this.state;
    return (
      <List>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#ff9900" }}></span>
            <p>Environments</p>
          </Box>
          <label>{singleEnvironmentCountData.environments}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#0089d6" }}></span>
            <p>Assets</p>
          </Box>
          <label>{singleEnvironmentCountData.assets}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#da4f44" }}></span>
            <p>Alerts</p>
          </Box>
          <label>{singleEnvironmentCountData.alerts}</label>
        </ListItem>
        <ListItem>
          <Box className="data-text">
            <span style={{ backgroundColor: "#00b929" }}></span>
            <p>Total Billing</p>
          </Box>
          <label>{singleEnvironmentCountData.totalbilling}</label>
        </ListItem>
      </List>
    );
  };

  getLandingZoneOrCloudName = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    const cloudName = queryPrm.get("cloudName")?.toUpperCase();
    return { cloudName, landingZone };
  };

  render() {
    const {
      showLandingZoneDetails,
      activeTab,
      cloudName,
      singleEnvironmentCountData,
      landingZone,
    } = this.state;
    return (
      <Box className="environment-container environmentlist">
        <Box className="list-heading">
          <h3>Environments</h3>
          {/* <Button
            className="primary-btn min-width"
            component={Link}
            variant="contained"
            to={`${APP_PREFIX_PATH}/environments`}
          >
            Back to Infra View
          </Button> */}
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`${APP_PREFIX_PATH}/environments`}>Environments</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">
                {this.getLandingZoneOrCloudName().cloudName} &nbsp; (
                {this.getLandingZoneOrCloudName().landingZone})
              </li>
              {/* <li>
                <Link
                  to={`${APP_PREFIX_PATH}/environments/environmentlist?landingZone=1234&cloudName=AWS`}
                >
                  Environments List
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>AWS</li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">VPC2</li> */}
            </ul>
          </Box>
        </Box>
        <Box className="services-panel">
          <Box
            className={`services-panel-title p-t-10 p-b-10 ${
              showLandingZoneDetails ? "bottom-border" : ""
            }`}
          >
            <Box className="image">
              <img
                src={
                  LOGOS[this.getLandingZoneOrCloudName().cloudName]
                    ? LOGOS[this.getLandingZoneOrCloudName().cloudName]
                    : ""
                }
              />
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
            {singleEnvironmentCountData ? this.renderLandingZoneData() : <></>}
          </Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <TabsMenu
              tabs={this.tabMapping}
              setActiveTab={this.setActiveTab}
              activeTab={activeTab}
            />
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 ? (
              <DiscoveredAssets />
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
  const { singleEnvironmentCountData } = state.environmentData;
  return { singleEnvironmentCountData };
}

const mapDispatchToProps = {
  getSingleEnvironmentCountData,
};
export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentList);
