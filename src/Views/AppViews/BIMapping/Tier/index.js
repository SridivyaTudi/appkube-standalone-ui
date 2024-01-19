import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import ChartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import deployed1 from "../../../../assets/img/bimapping/deployed1.png";
import deployed4 from "../../../../assets/img/bimapping/deployed4.png";
import deployed5 from "../../../../assets/img/bimapping/deployed5.png";
import Aws from "../../../../assets/img/aws.png";

class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveNode: "",
      activeLayer: "",
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
    };
  }

  toggleSelectNginx = () => {
    this.setState({
      isSelectNginxOpen: !this.state.isSelectNginxOpen,
    });
  };
  toggleSelectSpringBoot = () => {
    this.setState({
      isSelectSpringBootOpen: !this.state.isSelectSpringBootOpen,
    });
  };
  toggleSelectMySQL = () => {
    this.setState({
      isSelectMySQLOpen: !this.state.isSelectMySQLOpen,
    });
  };
  toggleSelectRedis = () => {
    this.setState({
      isSelectRedisOpen: !this.state.isSelectRedisOpen,
    });
  };
  render() {
    let { activeLayer, isSelectNginxOpen, isSelectSpringBootOpen, isSelectMySQLOpen, isSelectRedisOpen } = this.state;
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>3 Tier</h3>
          <Link to={`/app/bim/adding-product`}>
            <Button
              className="primary-btn min-width-inherit"
              variant="contained"
            >
              Back
            </Button>
          </Link>
        </Box>
        <Box className="tier-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={5}>
              <Box className="topology-panel">
                <Box className="topology-panel-body">
                  <Box className="topology-inner-content">
                    <Box className="content-left">
                      <List>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={ChartWebLayerIcon} alt="" />
                            </span>
                            <p>Web Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={ChartAppLayerIcon} alt="" />
                            </span>
                            <p>App Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={DataServiceSvgrepo} alt="" />
                            </span>
                            <p>Data Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={DataServiceSvgrepo} alt="" />
                            </span>
                            <p>AUX Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                      </List>
                    </Box>
                    <Box className="content-middle">
                      <List>
                        <ListItem>
                          <Box className="application-balancer">
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                            >
                              SSL
                            </Button>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            activeLayer === "NGINX" ? "active" : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={this.toggleSelectNginx}
                              >
                                Select
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                    isSelectNginxOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    NGINX
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Varnish
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    HA Proxy
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Apache Tomcat
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Microsoft IAS
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Traefik
                                  </ListItem>
                                </List>
                              </Box>
                              <div
                                className={
                                    isSelectNginxOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={this.toggleSelectNginx}
                              />
                            </Box>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            activeLayer === "NGINX" ? "active" : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={this.toggleSelectSpringBoot}
                              >
                                Select
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isSelectSpringBootOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Java Spring Boot API{" "}
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    NodeJs API Service
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Golang API Service
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Python API Service
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Laravel API Service
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Ruby API Service
                                  </ListItem>
                                </List>
                              </Box>
                              <div
                                className={
                                    isSelectSpringBootOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={this.toggleSelectSpringBoot}
                              />
                            </Box>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            activeLayer === "NGINX" ? "active" : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={this.toggleSelectMySQL}
                              >
                                Select
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isSelectMySQLOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    MySQL
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Postgresql
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Oracle
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Dynamo
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    MongoDB
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    InfluxDB
                                  </ListItem>
                                  <ListItem>
                                    <i className="fa-solid fa-circle-dot"></i>{" "}
                                    Casandra
                                  </ListItem>
                                </List>
                              </Box>
                              <div
                                className={
                                  isSelectMySQLOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={this.toggleSelectMySQL}
                              />
                            </Box>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            activeLayer === "Springboot" ? "active" : ""
                          }`}
                        >
                          <Box className="mapping-fliter">
                            <Box
                              className="fliter-toggel"
                              onClick={this.toggleSelectRedis}
                            >
                              Select
                              <i className="fa-solid fa-caret-down arrow-icon"></i>
                            </Box>
                            <Box
                              className={
                                isSelectRedisOpen
                                  ? "fliter-collapse active"
                                  : "fliter-collapse"
                              }
                            >
                              <List>
                                <ListItem>
                                  <i className="fa-solid fa-circle-dot"></i>{" "}
                                  Redis
                                </ListItem>
                                <ListItem>
                                  <i className="fa-solid fa-circle-dot"></i>{" "}
                                  MemCache
                                </ListItem>
                                <ListItem>
                                  <i className="fa-solid fa-circle-dot"></i>{" "}
                                  Elasticsearch
                                </ListItem>
                                <ListItem>
                                  <i className="fa-solid fa-circle-dot"></i>{" "}
                                  Open search
                                </ListItem>
                              </List>
                            </Box>
                            <div
                              className={
                                isSelectRedisOpen
                                  ? "fliters-collapse-bg active"
                                  : "fliters-collapse-bg"
                              }
                              onClick={this.toggleSelectRedis}
                            />
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                    <Box className="content-right">
                      <List>
                        <ListItem>
                          <Box className="add-button">
                            <i className="fa-solid fa-plus"></i>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="add-button">
                            <i className="fa-solid fa-plus"></i>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box className="nginx-cards">
                <Box className="deployed-section">
                  <Box className="deployed-head">
                    <h4 className="m-t-0">Deployed to</h4>
                  </Box>
                  <Box className="deployed-content">
                    <Box className="deployed-cards">
                      <Box className="deployed-card">
                        <Box className="d-block text-center">
                          <Box className="deployed-image">
                            <img src={deployed1} alt="" />
                          </Box>
                          <Box className="deployed-title">EC2</Box>
                        </Box>
                      </Box>
                      <Box className="deployed-card">
                        <Box className="d-block text-center">
                          <Box className="deployed-image">
                            <img src={deployed1} alt="" />
                          </Box>
                          <Box className="deployed-title">ECS</Box>
                        </Box>
                      </Box>
                      <Box className="deployed-card">
                        <Box className="d-block text-center">
                          <Box className="deployed-image">
                            <img src={deployed1} alt="" />
                          </Box>
                          <Box className="deployed-title">EkS</Box>
                        </Box>
                      </Box>
                      <Box className="deployed-card">
                        <Box className="d-block text-center">
                          <Box className="deployed-image">
                            <img src={deployed4} alt="" />
                          </Box>
                          <Box className="deployed-title">Lambda</Box>
                        </Box>
                      </Box>
                      <Box className="deployed-card">
                        <Box className="d-block text-center">
                          <Box className="deployed-image">
                            <img src={deployed5} alt="" />
                          </Box>
                          <Box className="deployed-title">CM</Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="deployed-section m-t-4">
                  <Box className="deployed-head">
                    <h4 className="m-t-0">Select Instance</h4>
                  </Box>
                  <Box className="deployed-content">
                    <Box className="deployed-cards">
                      <Box className="environment-box">
                        <Box className="environment-title">
                          <Box className="environment-image">
                            <img src={Aws} alt="aws" />
                          </Box>
                          <Box className="title-name">EC2</Box>
                        </Box>
                        <Box className="data-contant">
                          <List>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FFBA69" }}
                                ></span>
                                <p>ID</p>
                              </Box>
                              <label>123456</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#8676FF" }}
                                ></span>
                                <p>Key</p>
                              </Box>
                              <label>Name</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FF2D2E" }}
                                ></span>
                                <p>Value</p>
                              </Box>
                              <label>Kick</label>
                            </ListItem>
                          </List>
                        </Box>
                      </Box>
                      <Box className="environment-box">
                        <Box className="environment-title">
                          <Box className="environment-image">
                            <img src={Aws} alt="aws" />
                          </Box>
                          <Box className="title-name">EC2</Box>
                        </Box>
                        <Box className="data-contant">
                          <List>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FFBA69" }}
                                ></span>
                                <p>ID</p>
                              </Box>
                              <label>123456</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#8676FF" }}
                                ></span>
                                <p>Key</p>
                              </Box>
                              <label>Name</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FF2D2E" }}
                                ></span>
                                <p>Value</p>
                              </Box>
                              <label>Kick</label>
                            </ListItem>
                          </List>
                        </Box>
                      </Box>
                      <Box className="environment-box">
                        <Box className="environment-title">
                          <Box className="environment-image">
                            <img src={Aws} alt="aws" />
                          </Box>
                          <Box className="title-name">EC2</Box>
                        </Box>
                        <Box className="data-contant">
                          <List>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FFBA69" }}
                                ></span>
                                <p>ID</p>
                              </Box>
                              <label>123456</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#8676FF" }}
                                ></span>
                                <p>Key</p>
                              </Box>
                              <label>Name</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FF2D2E" }}
                                ></span>
                                <p>Value</p>
                              </Box>
                              <label>Kick</label>
                            </ListItem>
                          </List>
                        </Box>
                      </Box>
                      <Box className="environment-box">
                        <Box className="environment-title">
                          <Box className="environment-image">
                            <img src={Aws} alt="aws" />
                          </Box>
                          <Box className="title-name">EC2</Box>
                        </Box>
                        <Box className="data-contant">
                          <List>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FFBA69" }}
                                ></span>
                                <p>ID</p>
                              </Box>
                              <label>123456</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#8676FF" }}
                                ></span>
                                <p>Key</p>
                              </Box>
                              <label>Name</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FF2D2E" }}
                                ></span>
                                <p>Value</p>
                              </Box>
                              <label>Kick</label>
                            </ListItem>
                          </List>
                        </Box>
                      </Box>
                      <Box className="environment-box">
                        <Box className="environment-title">
                          <Box className="environment-image">
                            <img src={Aws} alt="aws" />
                          </Box>
                          <Box className="title-name">EC2</Box>
                        </Box>
                        <Box className="data-contant">
                          <List>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FFBA69" }}
                                ></span>
                                <p>ID</p>
                              </Box>
                              <label>123456</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#8676FF" }}
                                ></span>
                                <p>Key</p>
                              </Box>
                              <label>Name</label>
                            </ListItem>
                            <ListItem>
                              <Box className="data-text">
                                <span
                                  style={{ backgroundColor: "#FF2D2E" }}
                                ></span>
                                <p>Value</p>
                              </Box>
                              <label>Kick</label>
                            </ListItem>
                          </List>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box className="nginx-table-section">
            <TableContainer className="table">
              <Table className="overview">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      Servicename
                    </TableCell>
                    <TableCell align="center">Port Details</TableCell>
                    <TableCell align="center">Department URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox
                        className="check-box"
                        size="small"
                        onChange={this.handleCheckBox}
                      />
                      MockDB
                    </TableCell>
                    <TableCell align="center">80</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox
                        className="check-box"
                        size="small"
                        onChange={this.handleCheckBox}
                      />
                      DummyWebServer
                    </TableCell>
                    <TableCell align="center">443</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox
                        className="check-box"
                        size="small"
                        onChange={this.handleCheckBox}
                      />
                      SimulatedQueue
                    </TableCell>
                    <TableCell align="center">443</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox
                        className="check-box"
                        size="small"
                        onChange={this.handleCheckBox}
                      />
                      PseudoAnalytics
                    </TableCell>
                    <TableCell align="center">21</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Checkbox
                        className="check-box"
                        size="small"
                        onChange={this.handleCheckBox}
                      />
                      PhantomCache
                    </TableCell>
                    <TableCell align="center">53</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box justifyContent={"center"} className="text-center m-t-4">
            <Button
              className="info-btn primary-btn min-width-inherit"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Tier;
