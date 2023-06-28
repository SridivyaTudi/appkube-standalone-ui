import React, { Component } from "react";
import { Link } from "react-router-dom";
import RunningIcon from "../../../../../../assets/img/assetmanager/running-icon.png";
import AirAsiaIcon from "../../../../../../assets/img/assetmanager/air-asia-icon.png";
import UpdatingIcon from "../../../../../../assets/img/assetmanager/updating-icon.png";
import StopIcon from "../../../../../../assets/img/assetmanager/stop-icon.png";
import ProcurifyIcon from "../../../../../../assets/img/assetmanager/procurify-icon.png";
import FlipkartIcon from "../../../../../../assets/img/assetmanager/flipkart-icon.png";
import AppleIcon from "../../../../../../assets/img/assetmanager/apple-icon.png";
import { Box, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem } from "@mui/material";
import Button from '@mui/material/Button';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showServiceViewFilter: false,
      showRecentFilter: false,
      currentAccountId: null,
      showMenuIndex: null,
    };
  }

  toggleColumnSelect = (drdName) => {
    let current = this.state[drdName];
    this.setState({
      [drdName]: !current,
    });
  };

  toggleMenu = (index) => {
    if (this.state.showMenuIndex === null) {
      this.setState({
        showMenuIndex: index,
      });
    } else {
      this.setState({
        showMenuIndex: null,
      });
    }
  };

  getAppServicesCount = (product) => {
    let count = 0;
    product.deploymentEnvironmentList.map((env) => {
      env.serviceCategoryList.map((serviceCategory) => {
        serviceCategory.serviceNameList.map((serviceName) => {
          serviceName.tagList[0].serviceList?.map((service) => {
            count++;
          });
        });
      });
    });
    return count;
  };

  getDataServicesCount = (product) => {
    let count = 0;
    product.deploymentEnvironmentList.map((env) => {
      env.serviceCategoryList.map((serviceCategory) => {
        serviceCategory.serviceNameList.map((serviceName) => {
          serviceName.tagList[1].serviceList?.map((service) => {
            count++;
          });
        });
      });
    });
    return count;
  };

  setLocalRecentService = (account) => {
    let recentEnv = JSON.parse(localStorage.getItem("recentEnv"));
    recentEnv.map((item, index) => {
      if (item.accountId === account.accountId) {
        arrayMove(recentEnv, index, 0);
      }
    });

    function arrayMove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      localStorage.setItem("recentEnv", JSON.stringify(arr));
    }
  };

  render() {
    const { showSelectFilter, showServiceViewFilter, showRecentFilter } = this.state;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <h3 className="m-b-4">My Workspace</h3>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              <Grid item lg={8} md={8} xs={10}>
                <Box className="d-flex justify-content-center align-items-center">
                  <Box className="lest-view">
                    <List>
                      <ListItem className="active">
                        <a>
                          <i className="fas fa-list p-r-5"></i> List View
                        </a>
                      </ListItem>
                      <ListItem>
                        <a>
                          <i className="fas fa-th-large p-r-5"></i> Grid View
                        </a>
                      </ListItem>
                    </List>
                  </Box>
                  <Box className="environment-fliter">
                    <Box
                      className="fliter-toggel"
                      onClick={() =>
                        this.setState({
                          showSelectFilter: !showSelectFilter,
                        })
                      }
                    >
                      <i className="fa-solid fa-filter fillter-icon"></i>
                      fillter
                      <i className="fa-solid fa-caret-down arrow-icon"></i>
                    </Box>
                    <Box
                      className={
                        showSelectFilter === true
                          ? "fliter-collapse active"
                          : "fliter-collapse"
                      }
                    >
                      <Box className="search-bar">
                        <input type="text" placeholder="Search...." />
                      </Box>
                      <List>
                        <ListItem>
                          <input
                            type="checkbox"
                            onChange={() => this.handleChecked()}
                          />
                          OU
                        </ListItem>
                        <ListItem>
                          <input
                            type="checkbox"
                            onChange={() => this.handleChecked()}
                          />
                          Status
                        </ListItem>
                        <ListItem>
                          <input
                            type="checkbox"
                            onChange={() => this.handleChecked()}
                          />
                          No of Assets
                        </ListItem>
                        <ListItem>
                          <input
                            type="checkbox"
                            onChange={() => this.handleChecked()}
                          />
                          Logs
                        </ListItem>
                        <ListItem>
                          <input
                            type="checkbox"
                            onChange={() => this.handleChecked()}
                          />
                          Performance & Availability
                        </ListItem>
                      </List>
                    </Box>
                    <div
                      className={
                        showSelectFilter === true
                          ? "fliters-collapse-bg active"
                          : "fliters-collapse-bg"
                      }
                      onClick={() =>
                        this.setState({
                          showSelectFilter: !showSelectFilter,
                        })
                      }
                    />
                  </Box>
                  <button className="blue-button min-width-inherit m-b-0 m-r-3">
                    <i className="fa-solid fa-history p-r-5"></i> Recent
                  </button>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} xs={10}>
                <div className="d-inline-block width-100 text-right">
                  <Button className="primary-btn min-width-inherit" variant="contained">
                    <Link
                      style={{ color: "white" }}
                      to={
                        "/assetmanager/pages/environments/environmentlist/deployproject"
                      }
                    >
                      <i className="fa-solid fa-plus-square p-r-5"></i> Create New
                    </Link>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className="environment-table-section">
          <TableContainer className="table">
            <Table className="overview">
              <TableHead>
                <TableRow>
                  <TableCell align="left"><strong>Workspace</strong></TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Client</TableCell>
                  <TableCell align="center" className="ou">Line Of Business</TableCell>
                  <TableCell align="center">Tags</TableCell>
                  <TableCell align="center">User Count</TableCell>
                  <TableCell align="center">Usage</TableCell>
                  <TableCell align="center">App Services</TableCell>
                  <TableCell align="center">Data Services</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      HRMS
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Procurify</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Logistics</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      EMS
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>HDFC bank</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Transaction</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      PROCUREMENT
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={UpdatingIcon} alt="" />
                    </span>
                    <strong>Updating</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Air Asia</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Fleets</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      APPCUBE
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={StopIcon} alt="" />
                    </span>
                    <strong>Stop</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Walmart</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Logistics</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      HRMS
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={UpdatingIcon} alt="" />
                    </span>
                    <strong>Updating</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={'AirAsiaIcon'} alt="" />
                    </span>
                    <strong>Adobe</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Frames</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      EMS
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Procurify</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Banking</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={
                        "/assetmanager/pages/environments/environmentlist/workspacedetails"
                      }
                    >
                      PROCUREMENT
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={RunningIcon} alt="" />
                    </span>
                    <strong>Running</strong>
                  </TableCell>
                  <TableCell align="center">
                    <span>
                      <img src={AirAsiaIcon} alt="" />
                    </span>
                    <strong>Flipkart</strong>
                  </TableCell>
                  <TableCell align="center">
                    <div className="business-btn"> Client</div>
                  </TableCell>
                  <TableCell align="center">
                    <strong>13</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>500</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>33%</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>41</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>29</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="recently-viewed-section">
          <h3 className="m-t-4 m-b-4">Recently Viewed</h3>
          <Box className="recently-cards">
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={ProcurifyIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Procurify</div>
                <Box className="refund-content">
                  <span>Logistics-Tool</span>
                </Box>
              </Box>
            </Box>
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={FlipkartIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Flipkart-App</div>
                <Box className="refund-content">
                  <span>Order</span>
                  <span>Refunds</span>
                </Box>
              </Box>
            </Box>
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={AppleIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Apple-Data</div>
                <Box className="refund-content">
                  <span>Security-Databese</span>
                </Box>
              </Box>
            </Box>
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={ProcurifyIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Forbese-Tools</div>
                <Box className="refund-content">
                  <span>Automation</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="recently-viewed-section">
          <h3 className="m-t-4 m-b-4">Favorites</h3>
          <Box className="recently-cards">
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={ProcurifyIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Procurify</div>
                <Box className="refund-content">
                  <span>Logistics-Tool</span>
                </Box>
              </Box>
              <Box className="favorites-check">
                <i className="fas fa-star"></i>
              </Box>
            </Box>
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={FlipkartIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Flipkart-App</div>
                <Box className="refund-content">
                  <span>Order</span>
                  <span>Refunds</span>
                </Box>
              </Box>
              <Box className="favorites-check">
                <i className="fas fa-star"></i>
              </Box>
            </Box>
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={AppleIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Apple-Data</div>
                <Box className="refund-content">
                  <span>Security-Databese</span>
                </Box>
              </Box>
              <Box className="favorites-check">
                <i className="fas fa-star"></i>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Application;
