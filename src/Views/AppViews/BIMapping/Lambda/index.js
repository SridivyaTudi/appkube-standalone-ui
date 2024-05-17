import React, { Component } from "react";
import { Box, Grid, List, ListItem, Button } from "@mui/material";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import Springboot from "assets/img/assetmanager/springboot.png";
import Nginx from "assets/img/assetmanager/nglnx.png";
import Postgresql from "assets/img/assetmanager/postgresql.png";
import Opensearch from "assets/img/assetmanager/opensearch.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

class Lambda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveNode: "",
      activeLayer: "SSL",
    };
  }
  // Render heading
  renderHeading = () => {
    let { name, id, landingZoneId, cloud } = this.getUrlDetails();

    return (
      <Box className="list-heading">
        <h3>Lambda</h3>
        <Box className="breadcrumbs">
          <ul>
            <li onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/bim`)}>
              BI-Mapping
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li
              onClick={() =>
                this.props.navigate(
                  `${APP_PREFIX_PATH}/bim/add-product/${name}/${id}/${landingZoneId}/${cloud}`
                )
              }
            >
              Add Product
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li className="active">Product Category</li>
          </ul>
        </Box>
      </Box>
    );
  };

  /** Get url details. */
  getUrlDetails() {
    let name = this.props.params.name;
    let id = this.props.params.id;
    let landingZoneId = this.props.params.landingZoneId;
    let cloud = this.props.params.cloud;

    return { name, id, landingZoneId, cloud };
  }
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
                  {/* <h4 class="m-t-0 m-b-0">MODULE : Requirements</h4> */}
                  <Box className="topology-inner-content">
                    <Box className="content-left lambda-layer">
                      <List>
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
                              style={{ width: 140 }}
                              variant="contained"
                              onClick={() => {
                                this.setState({ activeLayer: "NGINX" });
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
                                  }}
                                >
                                  <img src={Postgresql} alt="" />
                                </Box>
                                <p>PostgreSQL</p>
                              </Box>
                              <Box className="balancer-box" onClick={() => {}}>
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
            <Grid item xs={6}></Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default navigateRouter(Lambda);
