import React, { Component } from "react";
import { Box, List, ListItem, Grid, Button } from "@mui/material";
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

class Container extends Component {
  render() {
    return (
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
                  onClick={() => this.props.setCurrentActiveNode("SSL")}
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
                      variant="contained"  onClick={() => this.props.setCurrentActiveNode("APIGateway")}
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
                      variant="contained"  onClick={() => this.props.setCurrentActiveNode("LoadBalancer")}
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
                      variant="contained" onClick={() => this.props.setCurrentActiveNode("Cluster")}
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
                      variant="contained" onClick={() => this.props.setCurrentActiveNode("Ingress")}
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
                      variant="contained" onClick={() => this.props.setCurrentActiveNode("ServiceMesh")}
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
                      variant="contained" onClick={() => this.props.setCurrentActiveNode("JavaSpringbot")}
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
                  <Box className="icon" onClick={() => this.props.setCurrentActiveNode("PostgreSQL")}>
                    <img src={Postgresql} alt="" />
                  </Box>
                  <p>PostgreSQL</p>
                </Box>
                <Box className="balancer-box">
                  <span>
                    <img src={bottomArrow} alt="" />
                  </span>
                  <Box className="icon" onClick={() => this.props.setCurrentActiveNode("Opensearch")}>
                    <img src={Opensearch} alt="" />
                  </Box>
                  <p>Opensearch</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  }
}

export default Container;
