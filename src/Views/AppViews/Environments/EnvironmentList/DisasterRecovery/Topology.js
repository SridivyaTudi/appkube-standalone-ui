import React, { Component } from "react";
import Hrms from "assets/img/assetmanager/hrms.png";
import chartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import chartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import dataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import chartAuxiliaryLayerIcon from "assets/img/assetmanager/chart-auxiliary-layer-icon.png";
import balancingIcon from "assets/img/assetmanager/balancing-icon.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import amazonEc2 from "assets/img/assetmanager/amazon-ec2.png";
import amazonEc3 from "assets/img/assetmanager/amazon-ec3.png";
import Nglnx from "assets/img/assetmanager/nglnx.png";
import Aws from "assets/img/aws.png";
import { Box, Grid, Button, List, ListItem } from "@mui/material";
import { connect } from "react-redux";
import TopologyView from "./TopologyView";
import { v4 } from "uuid";
import Variable from "./Components/Variable";
import Ports from "./Components/Ports";
import RolesPolicies from "./Components/RolesPolicies";

let topologyData = {
  label: "HRMS",
  image: Hrms,
  children: [
    [
      {
        label: "Web Layer",
        id: null,
        type: "WebLayer",
        image: chartWebLayerIcon,
        children: [],
      },
      {
        label: "App Layer",
        id: null,
        type: "AppLayer",
        image: chartAppLayerIcon,
        children: [],
      },
      {
        label: "Data Layer",
        id: null,
        type: "DataLayer",
        image: dataServiceSvgrepo,
        children: [],
      },
      {
        label: "Auxiliary",
        id: null,
        type: "Auxiliary",
        image: chartAuxiliaryLayerIcon,
        children: [],
      },
    ],
    [],
  ],
};

let resourceData = {
  web_layer: [
    {
      name: "CPU ",
      number: "512GB",
    },
    {
      name: "Memory(RAM)",
      number: "512GB",
    },
    {
      name: "Disk Space",
      number: "512GB",
    },
    {
      name: "Network resources",
      number: "512GB",
    },
  ],
  data_layer: [
    {
      name: "CPU Utilization",
      number: "50%",
    },
    {
      name: "Data Connections",
      number: "100",
    },
    {
      name: "Free Storage Space",
      number: "50 GB",
    },
    {
      name: "ReadOPS",
      number: "500 IOPS",
    },
    {
      name: "Write OPS",
      number: "300 OPS",
    },
    {
      name: "Read latency",
      number: "5 ms",
    },
    {
      name: "Write latency",
      number: "3 MS",
    },
    {
      name: "NR Throughput",
      number: "10 MB/s",
    },
    {
      name: "NT Throughput",
      number: "5 MB/s",
    },
    {
      name: "Replica lag",
      number: "0 sec",
    },
  ],
  auxiliary_layer: [
    {
      name: "No. Of Messages Published",
      number: "1000",
    },
    {
      name: "No. Of Notification Delivered",
      number: "900",
    },
    {
      name: "No. Of Notification Failed",
      number: "20",
    },
    {
      name: "No. Of Notification Filtered",
      number: "50",
    },
    {
      name: "Public Size",
      number: "1 KB",
    },
    {
      name: "Publish Throughput",
      number: "10 M/s",
    },
    {
      name: "No Of  Subs Confirmed",
      number: "50",
    },
    {
      name: "No Of  Subs Pending",
      number: "5",
    },
    {
      name: "No Of  Subs Deleted",
      number: "10",
    },
    {
      name: "Sms month to date spent USD",
      number: "$5.00",
    },
  ],
};

class Topology extends Component {
  tabMapping = [
    {
      name: "Variable",
      dataKey: "variable",
    },
    {
      name: "Ports",
      dataKey: "ports",
    },
    {
      name: "Roles and policies",
      dataKey: "policies",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      dataOfLevel1: topologyData,
      resources: resourceData,
      selectedResource: "web",
      activeLayer: "",
      activeTab: 0,
    };
  }

  componentDidMount = () => {
    this.setState({
      dataOfLevel1: topologyData,
      resources: resourceData,
      selectedResource: "web",
    });
  };

  getCurrentActiveTreeLevel = (label, isLevel2Data = 0) => {
    this.setState({
      selectedResource: label?.toLowerCase().replace(" layer", ""),
    });
  };

  // Render resources
  renderResources = () => {
    let { resources, selectedResource } = this.state;
    selectedResource = selectedResource === "app" ? "web" : selectedResource;
    return (
      resources[`${selectedResource}_layer`]?.length &&
      resources[`${selectedResource}_layer`].map((resource) => {
        return (
          <Box className="card-box" key={v4()}>
            <span>{resource.name}</span>
            <strong>{resource.number}</strong>
          </Box>
        );
      })
    );
  };

  // Render resources container
  renderResourcesWrapper = () => {
    let { selectedResource } = this.state;
    let resourceName =
      selectedResource === "data"
        ? "RDS"
        : selectedResource === "auxiliary"
        ? "SNS"
        : "EC2";
    return (
      selectedResource && (
        <Box className="resources-cards m-t-4">
          <Box className="resources">
            <div className="heading p-l-15">Resourses</div>
            <Box className="resources-inner">{this.renderResources()}</Box>
          </Box>
        </Box>
      )
    );
  };
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const {
      dataOfLevel1,
      breadcrumbs,
      selectedResource,
      activeLayer,
      activeTab,
    } = this.state;
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <TopologyView
              data={dataOfLevel1}
              setLevel={this.getCurrentActiveTreeLevel}
              selectedBreadCrumbs={breadcrumbs}
              setActiveLayer={(activeLayer) => {
                this.setState({ activeLayer });
              }}
            />
            <Grid item xs={7}>
              {activeLayer === "SSL" ? (
                <Box className="certificate-cards">
                  <Box className="title">
                    <Box className="environment-image">
                      <img src={Aws} alt="" />
                    </Box>
                    <Box className="name">Certificate</Box>
                  </Box>
                  <Box className="certificate-content">
                    <Box className="overview-content">
                      <Box className="heading">Overview</Box>
                      <p className="overview-text">
                        ACM is a service for easily managing SSL/TLS
                        certificates on AWS. It automates certificate
                        provisioning, renewal, and integration with AWS
                        resources like Load Balancers and CloudFront. ACM
                        ensures strong security with HSM storage and offers a
                        free tier.
                      </p>
                    </Box>
                    <Box className="certificate-status">
                      <Box className="heading">Certificate status</Box>
                      <List>
                        <ListItem>
                          <Box className="status-content">
                            <label className="d-block">Identifier</label>
                            <span className="d-block">A696rthy</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">Status</label>
                            <Box className="status">
                              <i className="fa-solid fa-check"></i>
                              Issued
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">ARN</label>
                            <span className="d-block">ARN:AWS:US-east</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">Type</label>
                            <span className="d-block">Amazon Issued</span>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                    <Box className="certificate-status">
                      <Box className="heading">Details</Box>
                      <List>
                        <ListItem>
                          <Box className="status-content">
                            <label className="d-block">Identifier</label>
                            <span className="d-block">A696rthy</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">
                              Signature Algorithm
                            </label>
                            <span>A696rthy</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">Public Key info</label>
                            <span className="d-block">A696rthy</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">Expiry Date</label>
                            <span className="d-block">20/02/2023</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">Issue Date</label>
                            <span className="d-block">21/02/2021</span>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="status-content ">
                            <label className="d-block">Renewal Date</label>
                            <span className="d-block">21/02/2023</span>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
              <Box className="nginx-cards">
                <Box className="title">
                  <Box className="head-left">
                    <Box className="environment-image">
                      <img src={Nglnx} alt="" />
                    </Box>
                    <Box className="name">NGINX</Box>
                    <Box className="version-text">Version: 1.21.3</Box>
                  </Box>
                  <Box className="head-right">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      View Explorer
                    </Button>
                  </Box>
                </Box>
                <Box className="nginx-content">
                  <Box className="d-flex">
                    <Box className="form-group m-r-3">
                      <label htmlFor="Instance" className="form-label">
                        No Of Instance
                      </label>
                      <input
                        className="form-control"
                        id="Instance"
                        name="instance"
                        placeholder="91"
                      />
                    </Box>
                    <Box className="form-group">
                      <label htmlFor="Instance" className="form-label">
                        State
                      </label>
                      <input
                        className="form-control"
                        id="Instance"
                        name="instance"
                        placeholder="Statefull"
                      />
                    </Box>
                  </Box>
                  <Box className="autoscaling-cards">
                    <Box className="heading">Autoscaling</Box>
                    <Box className="card-box">
                      <span>Initial Scaling</span>
                      <strong>123</strong>
                    </Box>
                    <Box className="card-box">
                      <span>Scaling</span>
                      <strong>151</strong>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {this.renderResourcesWrapper()}

              {/* <Box className="cloud-managed-cards">
                {selectedResource === "web" && (
                  <Box className="application-balancer">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      <img src={balancingIcon} alt="" /> Application Load
                      Balancer
                    </Button>
                    <Box className="balancer-boxs">
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                    </Box>
                  </Box>
                )}
                {selectedResource === "app" && (
                  <Box className="application-balancer">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      <img src={balancingIcon} alt="" /> Application Load
                      Balancer
                    </Button>
                    <Box className="balancer-boxs">
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc2} alt="" />
                        </Box>
                        <p>EC2</p>
                      </Box>
                    </Box>
                  </Box>
                )}
                {selectedResource === "data" && (
                  <Box className="application-balancer">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      <p>
                        <img src={amazonEc3} alt="" />
                      </p>{" "}
                      Relational Database Service
                    </Button>
                    <Box className="balancer-boxs">
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc3} alt="" />
                        </Box>
                        <p>RDS</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc3} alt="" />
                        </Box>
                        <p>RDS</p>
                      </Box>
                    </Box>
                  </Box>
                )}
                {selectedResource === "auxiliary" && (
                  <Box className="application-balancer">
                    <Button
                      className="primary-btn min-width"
                      variant="contained"
                    >
                      <p>
                        <img src={amazonEc3} alt="" />
                      </p>{" "}
                      Auxiliary
                    </Button>
                    <Box className="balancer-boxs">
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc3} alt="" />
                        </Box>
                        <p>SNS</p>
                      </Box>
                      <Box className="balancer-box">
                        <span>
                          <img src={bottomArrow} alt="" />
                        </span>
                        <Box className="icon">
                          <img src={amazonEc3} alt="" />
                        </Box>
                        <p>SQS</p>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              {this.renderResourcesWrapper()} */}
            </Grid>
          </Grid>
          <Box className="nginx-section">
            <Box className="tabs">
              <List className="tabs-menu">
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
              <Box className="tabs-content">
                {activeTab === 0 ? (
                  <Variable />
                ) : activeTab === 1 ? (
                  <Ports />
                ) : activeTab === 2 ? (
                  <RolesPolicies />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { envDataByLandingZone, departments } = state.environmentData;
  return { envDataByLandingZone, departments };
}

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Topology);
