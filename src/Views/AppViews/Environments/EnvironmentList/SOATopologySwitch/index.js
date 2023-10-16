import React, { Component } from "react";
import { Box, List, ListItem, Grid, Button, IconButton } from "@mui/material";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
      activeComponent: "",
      isActivityViewDetails: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.toggleView !== this.props.toggleView ||
      prevProps.activeServiceChildTopology !==
        this.props.activeServiceChildTopology
    ) {
      let { toggleView, activeServiceChildTopology } = this.props;
      this.setState({
        toggleView,
        activeComponent: activeServiceChildTopology,
      });
    }
  }

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
    const { activeComponent } = this.state;
    let { activeServiceChildTopology, toggleView } = this.props;
    return (
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ display: `${this.props.toggleView ? "none" : ""}` }}
      >
        <Grid item xs={6}>
          <Box className="business-service">
            <Box className="title">Container Based</Box>
            <IconButton
              size="small"
              className="open-close"
              onClick={() =>
                this.props.setCurrentActiveNode(
                  activeServiceChildTopology,
                  true
                )
              }
            >
              <KeyboardArrowRightIcon fontSize="inherit" />
            </IconButton>

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
                    onClick={() =>
                      this.props.setCurrentActiveNode("SSL", toggleView)
                    }
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
                        onClick={() =>
                          this.props.setCurrentActiveNode(
                            "APIGateway",
                            toggleView
                          )
                        }
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
                        onClick={() =>
                          this.props.setCurrentActiveNode(
                            "LoadBalancer",
                            toggleView
                          )
                        }
                      >
                        <img src={LoadBalancer} alt="" /> Load Balancer
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
                        onClick={() =>
                          this.props.setCurrentActiveNode("Cluster", toggleView)
                        }
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
                        onClick={() =>
                          this.props.setCurrentActiveNode("Ingress", toggleView)
                        }
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
                        onClick={() =>
                          this.props.setCurrentActiveNode(
                            "ServiceMesh",
                            toggleView
                          )
                        }
                      >
                        <img src={ServiceMesh} alt="" /> Service mesh
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
                        onClick={() =>
                          this.props.setCurrentActiveNode(
                            "JavaSpringbot",
                            toggleView
                          )
                        }
                      >
                        <img src={JavaSpringbot} alt="" /> Java springbot
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
          {activeComponent === "SSL" && <SslTableComponent />}
          {activeComponent === "APIGateway" && <APIGatewayComponent />}
          {activeComponent === "LoadBalancer" && <LoadBalancerComponent />}
          {activeComponent === "Cluster" && <ClusterComponent />}
          {activeComponent === "Ingress" && <IngressComponent />}
          {activeComponent === "ServiceMesh" && <ServiceMeshComponent />}
          {activeComponent === "JavaSpringbot" && <JavaSpringbootComponent />}
        </Grid>
      </Grid>
    );
  }
}

export default SOATopologySwitch;
