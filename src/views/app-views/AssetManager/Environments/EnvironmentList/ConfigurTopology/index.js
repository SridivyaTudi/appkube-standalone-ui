import React, { Component } from "react";
import PhpIcon from "assets/img/assetmanager/php-icon.png";
import RubyIcon from "assets/img/assetmanager/ruby-icon.png";
import NetIcon from "assets/img/assetmanager/net-icon.png";
import PythonIcon from "assets/img/assetmanager/python-icon.png";
import LangIcon from "assets/img/assetmanager/lang-icon.png";
import GlobalIcon4 from "assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "assets/img/assetmanager/global-icon5.png";
import GlobalIcon8 from "assets/img/assetmanager/global-icon8.png";
import CacheIcon from "assets/img/assetmanager/cache-icon.png";
import SqlIcon from "assets/img/assetmanager/sql-icon.png";
import NoSqlIcon from "assets/img/assetmanager/no-sql-icon.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

class ConfigurTopology extends Component {
  render() {
    return (
      <Box className="deploy-project-container">
        <Box className="page-heading">
          <h3>Configure Topology</h3>
        </Box>
        <Box className="configur-head">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={8}>
              <Box className="button-group">
                <Button className="primary-btn min-width-inherit m-r-3" variant="contained">
                  <i className="fab fa-java m-r-2"></i> Java
                </Button>
                <Button className="light-btn min-width-inherit m-r-3" variant="contained">
                  <img src={PhpIcon} alt="php" className="m-r-2" /> Php
                </Button>
                <Button className="light-btn min-width-inherit m-r-3" variant="contained">
                  <img src={RubyIcon} alt="ruby" className="m-r-2" /> Ruby
                </Button>
                <Button className="light-btn min-width-inherit m-r-3" variant="contained">
                  <img src={NetIcon} alt="net" className="m-r-2" /> .Net
                </Button>
                <Button className="light-btn min-width-inherit m-r-3" variant="contained">
                  <img src={PythonIcon} alt="paython" className="m-r-2" /> Python
                </Button>
                <Button className="light-btn min-width-inherit m-r-3" variant="contained">
                  <img src={LangIcon} alt="lang" className="m-r-2" /> Lang
                </Button>
                <Button className="primary-btn primary-custom-btn min-width-inherit" variant="contained">
                  Custom <i className="fas fa-chevron-down p-l-10"></i>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="configur-content">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <Box className="api-server text-center">
                <Box className="d-block">
                  <Button className="primary-btn min-width-inherit" variant="contained">
                    API Gateway Server
                  </Button>
                </Box>
                <Box className="d-block">
                  <Box className="plus-icon">
                    <i className="fas fa-plus"></i>
                  </Box>
                </Box>
                <Box className="d-block">
                  <Button className="primary-btn min-width-inherit" variant="contained">
                    App Layer Server
                  </Button>
                </Box>
                <Box className="d-block down-arrow">
                  <i class="fa-solid fa-down-long"></i>
                </Box>
                <Box className="d-block">
                  <Button className="primary-btn min-width-inherit" variant="contained">
                    Cluster <i className="fas fa-chevron-down p-l-10"></i>
                  </Button>
                </Box>
                <Box className="eks-logo-boxs border-bottom">
                  <Box className="d-inline-block">
                    <Box className="box-arrow">
                      <i class="fa-solid fa-down-long"></i>
                    </Box>
                    <Box className="eks-logo">
                      <img src={GlobalIcon5} alt="" />
                    </Box>
                    <div className="title">EKS</div>
                  </Box>
                  <Box className="d-inline-block">
                    <Box className="box-arrow">
                      <i class="fa-solid fa-down-long"></i>
                    </Box>
                    <Box className="eks-logo">
                      <img src={GlobalIcon4} alt="" />
                    </Box>
                  </Box>
                  <Box className="d-inline-block">
                    <Box className="box-arrow">
                      <i class="fa-solid fa-down-long"></i>
                    </Box>
                    <Box className="eks-logo">
                      <img src={GlobalIcon8} alt="" />
                    </Box>
                  </Box>
                </Box>
                <Box className="d-block m-t-1">
                  <Button className="primary-btn min-width-inherit" variant="contained">
                    DB Layer
                  </Button>
                </Box>
                <Box className="eks-logo-boxs">
                  <Box className="d-inline-block">
                    <Box className="box-arrow">
                      <i class="fa-solid fa-down-long"></i>
                    </Box>
                    <Box className="eks-logo">
                      <img src={CacheIcon} alt="" />
                    </Box>
                    <div className="title">Cache</div>
                  </Box>
                  <Box className="d-inline-block">
                    <Box className="box-arrow">
                      <i class="fa-solid fa-down-long"></i>
                    </Box>
                    <Box className="eks-logo">
                      <img src={SqlIcon} alt="" />
                    </Box>
                    <div className="title">SQL</div>
                  </Box>
                  <Box className="d-inline-block">
                    <Box className="box-arrow">
                      <i class="fa-solid fa-down-long"></i>
                    </Box>
                    <Box className="eks-logo">
                      <img src={NoSqlIcon} alt="" />
                    </Box>
                    <div className="title">No SQL</div>
                  </Box>
                </Box>
                <Box className="d-block">
                  <Box className="plus-icon">
                    <i className="far fa-plus"></i>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="api-server text-center">
                <h2>Application Servers</h2>
                <p>Vartical Scaling Per Node</p>
                <Box className="application-cards">
                  <Box className="reserved-card">
                    <Box className="title">
                      <h4>RESERVED</h4>
                      <i className="fas fa-question"></i>
                    </Box>
                    <Box className="reseved-content">
                      <Box className="d-flex align-items-center justify-content-center">
                        <input id="number" type="number" value="42" />
                        <Box className="dropdown-arrow">
                          <Box className="d-block">
                            <i className="fas fa-angle-up"></i>
                          </Box>
                          <Box className="d-block">
                            <i className="fas fa-angle-down"></i>
                          </Box>
                        </Box>
                        <span className="p-l-5">Cloudlet(s)</span>
                      </Box>
                      <p className="text-left">1.75 GIB, 5.6 GHz</p>
                    </Box>
                  </Box>
                  <Box className="reserved-card">
                    <Box className="title">
                      <h4>SCALING LIMIT</h4>
                      <i className="fas fa-question"></i>
                    </Box>
                    <Box className="reseved-content">
                      <Box className="d-flex align-items-center justify-content-center">
                        <span className="p-r-5">Up to</span>
                        <input id="number" type="number" value="42" />
                        <Box className="dropdown-arrow">
                          <Box className="d-block">
                            <i className="fas fa-angle-up"></i>
                          </Box>
                          <Box className="d-block">
                            <i className="fas fa-angle-down"></i>
                          </Box>
                        </Box>
                        <span className="p-l-5">Cloudlet(s)</span>
                      </Box>
                      <p className="text-left">up to 44 GIB, 140.8 GHz</p>
                    </Box>
                  </Box>
                </Box>
                <Box className="d-block m-t-3">
                  <progress
                    id="file"
                    value="32"
                    className="progress-bar"
                    max="100"
                  >
                    {" "}
                    32%{" "}
                  </progress>
                  <p className="m-t-2">Horizontal Scaling Per Node</p>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className="api-server text-center">
                <Box className="address-content">
                  <span><i className="fa-sharp fa-solid fa-location-dot"></i></span>
                  <p>Region: Newyork</p>
                  <i className="fas fa-angle-down"></i>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default ConfigurTopology;
