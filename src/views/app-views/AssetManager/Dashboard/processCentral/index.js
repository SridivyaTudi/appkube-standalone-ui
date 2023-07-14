import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, List, ListItem } from "@mui/material";
import Grid from "@mui/material/Grid";

const mappingData = {
  devcentral: "Dev Central",
  volume: "Volume",
  product: "Product",
  services: "Services",
  release: "Release",
  useCase: "Use Case",
  bugs: "Bugs",
  workFlow: "Workflow",
  documentation: "Documentation",
  automationTest: "Automation Test",
  velocity: "Velocity",
  scheduleDeviation: "Schedule Deviation",
  releaseTime: "Release Time",
  bugFixing: "Bug Fixing",
  useCaseDelivery: "Use Case Delivery",
  workFlowGeneration: "Work Flow Generation",
  reliability: "Reliability",
  postReleaseDefects: "Post Release Defects",
  usageStats: "Usage Stats",
  seccentral: "Sec Central",
  infra: "Infra",
  account: "Account",
  vpc: "VPC",
  cluster: "Cluster",
  managedServices: "Managed Services",
  app: "App",
  container: "Container",
  code: "Code",
  data: "Data",
  accessControl: "Access Control",
  governance: "Governance",
  transitAndStore: "Transit And Store",
  opscentral: "Ops Central",
  newCloudProvisioning: "New Cloud Provisioning",
  newProduct: "New Product",
  serviceOnboarding: "Service On Boarding",
  newAutomation: "New Automation",
  alertResolved: "Alert Resolved",
  usecaseDelivery: "Use Case Delivery",
  rateofReopenTickets: "Rate of Reopen Tickets",
};

const dummyData = {
  devcentral: {
    volume: {
      product: "+56",
      services: "-21",
      release: "-35",
      useCase: "+40",
      bugs: "+45",
      workFlow: "-32",
      documentation: "-10",
      automationTest: "+12",
    },
    velocity: {
      scheduleDeviation: "+56",
      releaseTime: "-21",
      bugFixing: "+40",
      useCaseDelivery: "+45",
      bugs: "+45",
      workFlowGeneration: "-32",
      documentation: "-10",
      automationTest: "+12",
    },
    reliability: {
      postReleaseDefects: "+56",
      usageStats: "-21",
    },
  },
  seccentral: {
    infra: {
      account: "+56",
      vpc: "-21",
      cluster: "-35",
      managedServices: "+40",
    },
    app: {
      container: "+56",
      code: "-21",
    },
    data: {
      accessControl: "+56",
      governance: "-21",
      transitAndStore: "-35",
    },
  },
  opscentral: {
    volume: {
      newCloudProvisioning: "+56",
      newProduct: "-21",
      serviceOnboarding: "-35",
      newAutomation: "+40",
      alertResolved: "+45",
    },
    velocity: {
      scheduleDeviation: "+56",
      releaseTime: "-21",
      bugFixing: "-35",
      usecaseDelivery: "+40",
      bugs: "+45",
      workFlowGeneration: "-32",
      documentation: "-10",
      automationTest: "+12",
    },
    reliability: {
      rateofReopenTickets: "+56",
    },
  },
};

class ProcessCentral extends Component {
  mapping = mappingData;
  constructor(props) {
    super(props);
    this.state = {
      activeTabs: {
        devcentral: "volume",
        seccentral: "infra",
        opscentral: "volume",
      },
      centralTable: {},
    };
  }

  componentDidMount = () => {
    this.setState({
      centralTable: dummyData,
    });
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
        value = val[Object.keys(val)[i]];
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
                <span>{`${Math.abs(value)}%`}</span>
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
        {
          activeTabs[tableKey] === tab &&
            listJSX.push(
              <Box key={uuidv4()} className="reports-boxes active">
                {this.renderRows(rows)}
              </Box>
            );
        }
      }
    }
    retData.push(
      <Grid item lg={4} md={6} xs={12} key={uuidv4()}>
        <Box className="collapse-expand">
          <Box className="heading">
            <h3>{this.mapping[tableKey]}</h3>
          </Box>
          <Box className="contents">
            <List className="tabs">{tabsJSX}</List>
            {listJSX}
          </Box>
        </Box>
      </Grid>
    );
    return retData;
  };

  render() {
    const { centralTable } = this.state;
    return (
      <Box className="process-central-container">
        <Box className="report-inner-container">
          <Box className="main-collapse-expand">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                {this.renderTable(centralTable.devcentral, "devcentral")}
                {this.renderTable(centralTable.seccentral, "seccentral")}
                {this.renderTable(centralTable.opscentral, "opscentral")}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ProcessCentral;
