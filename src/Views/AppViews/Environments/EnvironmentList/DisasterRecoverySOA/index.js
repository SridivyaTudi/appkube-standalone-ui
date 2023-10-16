import React, { Component } from "react";
import DrTopology from "Views/AppViews/Environments/EnvironmentList/DisasterRecovery/DrTopology";
import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import TopologyView from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/TopologyView";
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

let data = {
  landingZone: "Xuber",
  productEnclaveList: [
    {
      id: 18,
      instanceName: "Business Service",
      instanceId: "Business Service",
      threeTier: {
        productCount: 0,
        webCount: 0,
        appCount: 0,
        dataCount: 0,
        auxiliaryCount: 0,
      },
      soa: {
        productCount: 2,
        appCount: 0,
        dataCount: 10,
        otherCount: 0,
      },
      productEnclaveList: [
        {
          id: 15,
          instanceName: "Admission Fee",
          instanceId: "Admission Fee",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "A/C Payable",
          instanceId: "A/C Payable",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Canteen",
          instanceId: "Canteen",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Library",
          instanceId: "Library",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Classroom",
          instanceId: "Classroom",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Attendance",
          instanceId: "Attendance",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Finance",
          instanceId: "Finance",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
      ],
      globalServiceList: [],
    },
    {
      id: 15,
      instanceName: "Common Service",
      instanceId: "Common Service",
      threeTier: {
        productCount: 0,
        webCount: 0,
        appCount: 0,
        dataCount: 0,
        auxiliaryCount: 0,
      },
      soa: {
        productCount: 0,
        appCount: 0,
        dataCount: 0,
        otherCount: 0,
      },
      productEnclaveList: [
        {
          id: 15,
          instanceName: "Search",
          instanceId: "Search",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Filter",
          instanceId: "Filter",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Rbac",
          instanceId: "Rbac",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Security",
          instanceId: "Security",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Message",
          instanceId: "Message",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Setting",
          instanceId: "Setting",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
        {
          id: 16,
          instanceName: "Navigation",
          instanceId: "Navigation",
          threeTier: {
            productCount: 0,
            webCount: 0,
            appCount: 0,
            dataCount: 0,
            auxiliaryCount: 0,
          },
          soa: {
            productCount: 0,
            appCount: 0,
            dataCount: 0,
            otherCount: 0,
          },
        },
      ],
      globalServiceList: [],
    },
  ],
  globalServiceList: [],
};
class DisasterRecoverySOA extends Component {
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
      isActivityViewDetails: false,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
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
    const { activeTab, isActivityViewDetails } = this.state;
    const { landingZone, landingZoneId, cloudName } = this.getUrlDetails();
    return (
      <Box className="disaster-recovery-container">
        <Box className="services-panel-tabs">
          <Box className="tabs-head ">
            <h3>XUBER</h3>
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
            <Box className="breadcrumbs-content">
              <ul>
                <li>
                  <Link to={`${APP_PREFIX_PATH}/environments`}>
                    Environments
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>
                  <Link
                    to={`${APP_PREFIX_PATH}/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`}
                  >
                    {cloudName} &nbsp;(
                    {landingZone})
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">HRMS</li>
              </ul>
            </Box>
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 && (
              <Box className="environment-container">
                <Box className="discovered-assets">
                  <Box className="discovered-assets-body">
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={6}>
                        <Box className="services-panel">
                          <Box className="services-panel-title bottom-border">
                            <Box className="name">Service View Topology </Box>
                            {/* <Box className="back-btn">
                                <i className="fa-solid fa-arrow-left"></i>
                            </Box> */}
                          </Box>
                          <Box className="services-panel-body">
                            <TopologyView
                              data={data}
                              parentCssClass="infra-toplogy-view"
                              setCurrentActiveNode={() => {}}
                            />
                          </Box>
                        </Box>
                      </Grid>
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
                                  <Box
                                    className="icon"  
                                  >
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
                    </Grid>
                  </Box>
                </Box>
              </Box>
            )}
            {activeTab === 1 && (
              <DrTopology
                redirectViewDetails={() => {
                  this.setState({ isActivityViewDetails: true });
                }}
              />
            )}
            {activeTab === 2 && <Box>IOT Topology</Box>}
            {activeTab === 3 && <Box>Lake Topology</Box>}
            {activeTab === 4 && <Box>Mesh Topology</Box>}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DisasterRecoverySOA;
