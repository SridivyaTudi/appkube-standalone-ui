import React, { Component } from "react";
import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { v4 } from "uuid";
import Gateway from "assets/img/assetmanager/gateway.png";
import LoadBalancer from "assets/img/assetmanager/load-balancer.png";
import Cluster from "assets/img/assetmanager/cluster.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import Ingress from "assets/img/assetmanager/ingress.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import ServiceMesh from "assets/img/assetmanager/service-mesh.png";
import JavaSpringbot from "assets/img/assetmanager/java-springbot.png";
import Postgresql from "assets/img/assetmanager/postgresql.png";
import Opensearch from "assets/img/assetmanager/opensearch.png";
import SslTableComponent from "./SslTable";
import APIGatewayComponent from "./APIGateway";
import LoadBalancerComponent from "./LoadBalancer";
import ClusterComponent from "./Cluster";
import IngressComponent from "./Ingress";
import ServiceMeshComponent from "./ServiceMesh";
import JavaSpringbootComponent from "./JavaSpringboot";

class SOATopologySwitch extends Component {
  tabMapping = [
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "IOT Topology",
      dataKey: "IotTopology",
    },
    {
      name: "Lake Topology",
      dataKey: "LakeTopology",
    },
    {
      name: "Mesh Topology",
      dataKey: "MeshTopology",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      activeComponent: 0,
      isActivityViewDetails: false,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  setActiveComponent = (activeComponent) => {
    this.setState({ activeComponent });
  };

  /** Get url details. */
  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");

    return { landingZone, landingZoneId, cloudName };
  }

  render() {
    const { activeTab, activeComponent } = this.state;
    return (
      <Box className="disaster-recovery-container">
        <Box className="services-panel-tabs">
          <Box className="tabs-head ">
            <h3>EMS</h3>
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
            <Box className="breadcrumbs-content"></Box>
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 && (
              <Box className="discovered-assets">
                <Box className="discovered-assets-body">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Box className="business-service">
                        <Box className="title">Container Based</Box>
                        <Box className="business-service-content">
                          <Box className="business-service-left">
                            <List>
                              <ListItem>
                                <Box className="button-box">
                                  <p>Cloud Managed</p>
                                </Box>
                                <span>
                                  <img src={RightArrow} alt="" />
                                </span>
                              </ListItem>
                            </List>
                          </Box>
                          <Box className="business-service-right">
                            <Box className="application-balancer m-b-10">
                              <Button
                                className="secondary-btn min-width"
                                variant="contained"
                                onClick={() => this.setActiveComponent(0)}
                              >
                                SSL
                              </Button>
                            </Box>
                            <List>
                              <ListItem>
                                <Box className="application-balancer">
                                  <Box className="balancer-boxs m-b-10">
                                    <Box className="balancer-box">
                                      <span>
                                        <img src={bottomArrow} alt="" />
                                      </span>
                                    </Box>
                                  </Box>
                                  <Button
                                    className="secondary-btn min-width"
                                    variant="contained"
                                    onClick={() => this.setActiveComponent(1)}
                                  >
                                    <img src={Gateway} alt="" />
                                    API Gateway
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Button>
                                </Box>
                              </ListItem>
                              <ListItem>
                                <Box className="application-balancer">
                                  <Box className="balancer-boxs  m-b-10">
                                    <Box className="balancer-box">
                                      <span>
                                        <img src={bottomArrow} alt="" />
                                      </span>
                                    </Box>
                                  </Box>
                                  <Button
                                    className="secondary-btn min-width"
                                    variant="contained"
                                    onClick={() => this.setActiveComponent(2)}
                                  >
                                    <img src={LoadBalancer} alt="" /> Load
                                    Balancer
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Button>
                                </Box>
                              </ListItem>
                            </List>
                          </Box>
                        </Box>
                        <Box className="business-service-content">
                          <Box className="business-service-left">
                            <List>
                              <ListItem>
                                <Box className="button-box">
                                  <p>Cluster Managed</p>
                                </Box>
                                <span>
                                  <img src={RightArrow} alt="" />
                                </span>
                              </ListItem>
                            </List>
                          </Box>
                          <Box className="business-service-right">
                            <Box className="balancer-boxs text-center">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                            <List>
                              <ListItem>
                                <Box className="application-balancer p-t-15">
                                  <Button
                                    className="secondary-btn min-width"
                                    variant="contained"
                                    onClick={() => this.setActiveComponent(3)}
                                  >
                                    <img src={Cluster} alt="" />
                                    Cluster
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Button>
                                </Box>
                              </ListItem>
                              <ListItem>
                                <Box className="application-balancer">
                                  <Box className="balancer-boxs  m-b-10">
                                    <Box className="balancer-box">
                                      <span>
                                        <img src={bottomArrow} alt="" />
                                      </span>
                                    </Box>
                                  </Box>
                                  <Button
                                    className="secondary-btn min-width"
                                    variant="contained"
                                    onClick={() => this.setActiveComponent(4)}
                                  >
                                    <img src={Ingress} alt="" /> Ingress
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Button>
                                </Box>
                              </ListItem>
                              <ListItem>
                                <Box className="application-balancer">
                                  <Box className="balancer-boxs  m-b-10">
                                    <Box className="balancer-box">
                                      <span>
                                        <img src={bottomArrow} alt="" />
                                      </span>
                                    </Box>
                                  </Box>
                                  <Button
                                    className="secondary-btn min-width"
                                    variant="contained"
                                    onClick={() => this.setActiveComponent(5)}
                                  >
                                    <img src={ServiceMesh} alt="" /> Service
                                    mesh
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Button>
                                </Box>
                              </ListItem>
                              <ListItem>
                                <Box className="application-balancer">
                                  <Box className="balancer-boxs  m-b-10">
                                    <Box className="balancer-box">
                                      <span>
                                        <img src={bottomArrow} alt="" />
                                      </span>
                                    </Box>
                                  </Box>
                                  <Button
                                    className="secondary-btn min-width"
                                    variant="contained"
                                    onClick={() => this.setActiveComponent(6)}
                                  >
                                    <img src={JavaSpringbot} alt="" /> Java
                                    springbot
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Button>
                                </Box>
                              </ListItem>
                            </List>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                                <Box className="icon">
                                  <img src={Postgresql} alt="" />
                                </Box>
                                <p>PostgreSQL</p>
                              </Box>
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                                <Box className="icon">
                                  <img src={Opensearch} alt="" />
                                </Box>
                                <p>Opensearch</p>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      {activeComponent === 0 && <SslTableComponent />}
                      {activeComponent === 1 && <APIGatewayComponent />}
                      {activeComponent === 2 && <LoadBalancerComponent />}
                      {activeComponent === 3 && <ClusterComponent />}
                      {activeComponent === 4 && <IngressComponent />}
                      {activeComponent === 5 && <ServiceMeshComponent />}
                      {activeComponent === 6 && <JavaSpringbootComponent />}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
            {activeTab === 1 && <Box>IOT Topology</Box>}
            {activeTab === 2 && <Box>IOT Topology</Box>}
            {activeTab === 3 && <Box>Lake Topology</Box>}
            {activeTab === 4 && <Box>Mesh Topology</Box>}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SOATopologySwitch;
