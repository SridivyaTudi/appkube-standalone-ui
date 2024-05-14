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

class TopologyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveNode: "",
      activeLayer: "SSL",
    };
  }

  render() {
    let { activeLayer } = this.state;
    return (
      <>
        <Grid item xs={5}>
          <Box className="topology-panel">
            <Box className="topology-panel-body">
              <Box className="topology-inner-content">
                <Box className="content-left tier-layer">
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
                  </List>
                </Box>
                <Box className="content-middle">
                  <List>
                    <ListItem
                      className={` ${activeLayer === "SSL" ? "active" : ""}`}
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
                      className={`  ${activeLayer === "NGINX" ? "active" : ""}`}
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
                          <img src={Nginx} alt="" /> NGINX
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
                          <img src={Springboot} alt="" /> Springboot
                        </Button>
                        <Box className="balancer-boxs">
                          <Box className="balancer-box">
                            <span>
                              <img src={bottomArrow} alt="" />
                            </span>
                            <Box
                              className={`icon  ${
                                activeLayer === "Postgresql" ? "active" : ""
                              }`}
                              onClick={() => {
                                this.setState({ activeLayer: "Postgresql" });
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
                                this.setState({ activeLayer: "Opensearch" });
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
      </>
    );
  }
}

export default TopologyView;
