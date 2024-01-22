import React, { Component } from "react";
import { Box, List, ListItem, Grid } from "@mui/material";
import GreenArrow from "assets/img/assetmanager/green-arrow.png";
import BlueArrow from "assets/img/assetmanager/blue-arrow.png";
import OrangeArrow from "assets/img/assetmanager/orange-arrow.png";
import AddFile from "../../../../../assets/img/bimapping/add-file.png";
class AppTopology extends Component {
  render() {
    return (
      <Box className="ports-content">
        <Box className="ports-inner-content p-l-10 p-r-10 p-b-20">
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <Box className="ports-public-section">
                <List>
                  <ListItem>
                    <Box className="ports-public">
                      <Box className="public-ip" variant="contained">
                        API Gateway
                      </Box>
                      <Box className="balancer-boxs m-t-2">
                        <Box className="balancer-box">
                          <span>
                            <img src={GreenArrow} alt="" />
                          </span>
                        </Box>
                        <Box className="balancer-box">
                          <span>
                            <img src={BlueArrow} alt="" />
                          </span>
                        </Box>
                        <Box className="balancer-box">
                          <span>
                            <img src={OrangeArrow} alt="" />
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className="ports-public">
                      <Box className="public-ip green">Load balancer</Box>
                      <Box className="balancer-boxs m-t-2">
                        <Box className="balancer-box">
                          <span>
                            <img src={GreenArrow} alt="" />
                          </span>
                        </Box>
                        <Box className="balancer-box">
                          <span>
                            <img src={BlueArrow} alt="" />
                          </span>
                        </Box>
                        <Box className="balancer-box">
                          <span>
                            <img src={OrangeArrow} alt="" />
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className="d-block cluster-box">
                      <List>
                        <ListItem>
                          <Box className="ports-public">
                            <Box className="public-ip ">Cluster</Box>
                            <Box className="balancer-boxs m-t-2">
                              <Box className="balancer-box">
                                <span>
                                  <img src={BlueArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="ports-public">
                            <Box className="public-ip blue">Ingress</Box>
                            <Box className="balancer-boxs m-t-2">
                              <Box className="balancer-box">
                                <span>
                                  <img src={GreenArrow} alt="" />
                                </span>
                              </Box>
                              <Box className="balancer-box">
                                <span>
                                  <img src={BlueArrow} alt="" />
                                </span>
                              </Box>
                              <Box className="balancer-box">
                                <span>
                                  <img src={OrangeArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className="ports-public">
                      <Box className="public-ip blue">Service: EC2</Box>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box className="ingress-boxs">
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                      <Box className="ingress-box">
                        <img src={AddFile} alt="addfile" />
                      </Box>
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box className="following-section">
                <Box className="following-ports">
                  <List>
                    <ListItem>
                      <strong>Name :</strong> Delta API Gateway
                    </ListItem>
                    <ListItem>
                      <strong>Purpose : </strong>
                      Simplifies the creation, management, and integration of
                      APIs, acting as a front door for various services
                    </ListItem>
                    <ListItem>
                      <strong>Type : </strong>
                      HTTP API Gateway
                    </ListItem>
                    <ListItem>
                      <strong>Key Feature : </strong>
                      Seamless integration with serverless functions
                    </ListItem>
                    <ListItem>
                      <strong>Managed Service : </strong>
                      API Gateway Service.
                    </ListItem>
                  </List>
                </Box>
                <Box className="following-ports load-balancer">
                  <List>
                    <ListItem>
                      <strong>Name : </strong> Load Balancer
                    </ListItem>
                    <ListItem>
                      <strong>Purpose : </strong>
                      Distributes incoming network traffic across multiple
                      servers to enhance performance and ensure high
                      availability.
                    </ListItem>
                    <ListItem>
                      <strong>Type : </strong>
                      Network Load Balancer (NLB)
                    </ListItem>
                    <ListItem>
                      <strong>Key Feature : </strong>
                      Efficiently handles TCP/UDP traffic with low latency.
                    </ListItem>
                    <ListItem>
                      <strong>Managed Service : </strong>
                      Cloud Load Balancer Service
                    </ListItem>
                  </List>
                </Box>
                <Box className="following-ports alpha-cluster">
                  <List>
                    <ListItem>
                      <strong>Name : </strong> Alpha Cluster
                    </ListItem>
                    <ListItem>
                      <strong>Purpose : </strong>
                      Facilitates parallel processing and resource optimization
                      by distributing workloads across multiple nodes.
                    </ListItem>
                    <ListItem>
                      <strong>Type : </strong>
                      Compute Cluster
                    </ListItem>
                    <ListItem>
                      <strong>Key Feature : </strong>
                      Scalable architecture for handling diverse workloads
                      simultaneously.
                    </ListItem>
                    <ListItem>
                      <strong>Managed Service : </strong>
                      Beta Cloud Cluster Management
                    </ListItem>
                  </List>
                </Box>

                <Box className="following-ports omega-ingress">
                  <List>
                    <ListItem>
                      <strong>Name : </strong> Omega Ingress
                    </ListItem>
                    <ListItem>
                      <strong>Purpose : </strong>
                      Manages external access to services within a Kubernetes
                      cluster, acting as an entry point for incoming traffic.
                    </ListItem>
                    <ListItem>
                      <strong>Type : </strong>
                      Layer 7 Ingress Controller
                    </ListItem>
                    <ListItem>
                      <strong>Key Feature : </strong>
                      Path-based routing and SSL termination for secure communication.
                    </ListItem>
                    <ListItem>
                      <strong>Managed Service : </strong>
                      Epsilon Cloud Ingress Service
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default AppTopology;
