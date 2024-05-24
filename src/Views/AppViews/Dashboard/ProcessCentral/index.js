import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, List, ListItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getProcessCentral } from "Redux/Dashboard/DashboardThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";

const mappingData = {
  devCentral: "Dev Central",
  volume: "Volume",
  product: "Product",
  services: "Services",
  release: "Release",
  useCase: "Use Case",
  bugs: "Bugs",
  workflow: "Work flow",
  documentation: "Documentation",
  automationTest: "Automation Test",
  velocity: "Velocity",
  scheduleDeviation: "Schedule Deviation",
  releaseTime: "Release Time",
  bugFixing: "Bug Fixing",
  useCaseDelivery: "Use Case Delivery",
  workflowGeneration: "Work Flow Generation",
  reliability: "Reliability",
  postReleaseDefects: "Post Release Defects",
  usageStats: "Usage Stats",
  secCentral: "Sec Central",
  infra: "Infra",
  account: "Account",
  vpc: "VPC",
  cluster: "Cluster",
  managedServices: "Managed Services",
  app: "App",
  container: "Container",
  code: "Code",
  data: "Data",
  accessCentral: "Access Central",
  governance: "Governance",
  transitAndStore: "Transit And Store",
  opsCentral: "Ops Central",
  newCloudProvisioning: "New Cloud Provisioning",
  newProduct: "New Product",
  serviceOnboarding: "Service On Boarding",
  newAutomation: "New Automation",
  alertsResolved: "Alert Resolved",
  usecaseDelivery: "Use Case Delivery",
  rateOfReopenTickets: "Rate of Reopen Tickets",
};

class ProcessCentral extends Component {
  mapping = mappingData;
  constructor(props) {
    super(props);
    this.state = {
      activeTabs: {
        devCentral: "volume",
        secCentral: "app",
        opsCentral: "volume",
      },
      centralTable: {},
    };
  }

  componentDidMount = () => {
    this.props.getProcessCentral();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.processCentral.status !== this.props.processCentral.status &&
      this.props.processCentral.status === status.SUCCESS &&
      this.props.processCentral.data
    ) {
      this.setState({ centralTable: this.props.processCentral.data[0] });
    }
  };

  handleTabToggle = (table, key) => {
    const { activeTabs } = this.state;
    activeTabs[table] = key;
    this.setState({ activeTabs });
  };

  renderRows = (val) => {
    let retData = [];

    if (val) {
      let key;
      let value;
      for (let i = 0; i < Object.keys(val).length; i++) {
        key = Object.keys(val)[i];
        value = val[Object.keys(val)[i]]?.["diff"].replace("%", "");

        if (value) {
          retData.push(
            <Box className="report-box" key={uuidv4()}>
              <strong>{this.mapping[key]}</strong>
              <Box className="report">
                {value * 1 > 0 ? (
                  <span className="up">
                    <i className="fa fa-caret-up"></i>
                  </span>
                ) : (
                  <span className="down">
                    <i className="fa fa-caret-down"></i>
                  </span>
                )}
                <span>{`${Math.abs(+value)}%`}</span>
              </Box>
            </Box>
          );
        }
      }
    }
    return retData;
  };

  renderTable = (data, tableKey) => {
    let retData = [];
    let listJSX = [];
    let tabsJSX = [];
    const { activeTabs } = this.state;
    if (data) {
      const tabs = Object.keys(data);
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        let rows = data[tab];
        tabsJSX.push(
          <ListItem
            className={activeTabs[tableKey] === tab ? "active" : ""}
            onClick={() => this.handleTabToggle(tableKey, tab)}
            key={uuidv4()}
          >
            {this.mapping[tab]}
          </ListItem>
        );
        activeTabs[tableKey] === tab &&
          listJSX.push(
            <Box key={uuidv4()} className="reports-boxes active">
              {this.renderRows(rows)}
            </Box>
          );
      }
    }
    retData.push(
      <Grid item lg={4} md={6} xs={12} key={uuidv4()}>
        <Box className="collapse-expand">
          <Box className="heading">
            <h3>{this.mapping[tableKey]}</h3>
          </Box>
          {listJSX.length ? (
            <Box className="contents">
              <List className="tabs">{tabsJSX}</List>
              {listJSX}
            </Box>
          ) : (
            this.renderNoDataHtml(
              this.props.processCentral.status === status.FAILURE
                ? API_ERROR_MESSAGE
                : NO_DATA_FOUND
            )
          )}
        </Box>
      </Grid>
    );
    return retData;
  };
  renderNoDataHtml = (text) => {
    return (
      <Box
        className="d-flex  align-items-center spend-loading"
        justifyContent={"center"}
        style={{ height: 306 }}
      >
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };
  render() {
    const { centralTable } = this.state;
    let { processCentral } = this.props;

    return (
      <Box className="process-central-container">
        <Box className="report-inner-container">
          <Box className="main-collapse-expand">
            <Box sx={{ flexGrow: 1 }}>
              {processCentral.status === status.IN_PROGRESS ? (
                <Loader className="h-100 text-center" />
              ) : (
                <Grid container spacing={3}>
                  {this.renderTable(centralTable.devCentral, "devCentral")}
                  {this.renderTable(centralTable.secCentral, "secCentral")}
                  {this.renderTable(centralTable.opsCentral, "opsCentral")}
                </Grid>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { processCentral } = state.dashboard;
  return { processCentral };
};

const mapDispatchToProps = {
  getProcessCentral,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCentral);
