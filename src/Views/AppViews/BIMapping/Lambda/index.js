import React, { Component } from "react";
import { Box, Grid, List, ListItem, Button } from "@mui/material";
import ChartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import Springboot from "assets/img/assetmanager/springboot.png";
import Nginx from "assets/img/assetmanager/nglnx.png";
import Postgresql from "assets/img/assetmanager/postgresql.png";
import Opensearch from "assets/img/assetmanager/opensearch.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import Nglnx from "assets/img/assetmanager/nglnx.png";
import PostgreSql from "assets/img/assetmanager/postgresql.png";
import Aws from "assets/img/aws.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentActiveNode: "",
          activeLayer: "SSL",
        };
      }
  // Render heading
  renderHeading = () => {
    // let { name, id, landingZoneId } = this.getUrlDetails();
    let { activeLayer } = this.state;
    return (
      <Box className="list-heading">
        <h3>Lambda</h3>
        <Box className="breadcrumbs">
          <ul>
            <li>BI-Mapping</li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li>Add Product</li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li className="active">Product Category</li>
          </ul>
        </Box>
      </Box>
    );
  };
  render() {
    let { activeLayer } = this.state;
    return (
      <Box className="bimapping-container">
        {this.renderHeading()}
        <Box className="tier-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Box className="topology-panel">
                <Box className="topology-panel-body">
                <h4 class="m-t-0 m-b-0">MODULE : Requirements</h4>
                  <Box className="topology-inner-content">
                    <Box className="content-left lambda-layer">
                      <List>
                        {/* <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={ChartWebLayerIcon} alt="" />
                            </span>
                            <p>Api Gateway</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem> */}
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
                      </List>
                    </Box>
                    <Box className="content-middle">
                      <List>
                        <ListItem
                          className={` ${
                            activeLayer === "SSL" ? "active" : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                              onClick={() => {
                                this.setState({ activeLayer: "SSL" });
                                this.props.setActiveLayer("SSL");
                              }}
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
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                              onClick={() => {
                                this.setState({ activeLayer: "NGINX" });
                                this.props.setActiveLayer("NGINX");
                              }}
                            >
                              <img src={Nginx} alt="" /> Api Gateway
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
                            activeLayer === "Springboot" ? "active" : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                              onClick={() => {
                                this.setState({ activeLayer: "Springboot" });
                                this.props.setActiveLayer("Springboot");
                              }}
                            >
                              <img src={Springboot} alt="" /> Lambda
                            </Button>
                            <Box className="balancer-boxs m-b-0">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                                <Box
                                  className={`icon  ${
                                    activeLayer === "Postgresql" ? "active" : ""
                                  }`}
                                  onClick={() => {
                                    this.setState({
                                      activeLayer: "Postgresql",
                                    });
                                    this.props.setActiveLayer("Postgresql");
                                  }}
                                >
                                  <img src={Postgresql} alt="" />
                                </Box>
                                <p>PostgreSQL</p>
                              </Box>
                              <Box
                                className="balancer-box"
                                onClick={() => {
                                  this.props.setActiveLayer("Opensearch");
                                }}
                              >
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                                <Box
                                  className={`icon  ${
                                    activeLayer === "Opensearch" ? "active" : ""
                                  }`}
                                  onClick={() => {
                                    this.setState({
                                      activeLayer: "Opensearch",
                                    });
                                    this.props.setActiveLayer("Opensearch");
                                  }}
                                >
                                  <img src={Opensearch} alt="" />
                                </Box>
                                <p>Opensearch</p>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default index;
