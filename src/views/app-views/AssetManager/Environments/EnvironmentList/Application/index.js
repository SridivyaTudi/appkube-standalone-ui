import React, { Component } from "react";
import { Link } from "react-router-dom";
import RunningIcon from "assets/img/assetmanager/running-icon.png";
import AirAsiaIcon from "assets/img/assetmanager/air-asia-icon.png";
import UpdatingIcon from "assets/img/assetmanager/updating-icon.png";
import StopIcon from "assets/img/assetmanager/stop-icon.png";
import ProcurifyIcon from "assets/img/assetmanager/procurify-icon.png";
import ProcurifyIcon1 from "assets/img/assetmanager/procurify-icon1.png";
import FlipkartIcon from "assets/img/assetmanager/flipkart-icon.png";
import HdfcIcon from "assets/img/assetmanager/hdfc-icon.png";
import WalmartIcon from "assets/img/assetmanager/walmart-icon.png";
import AdobeIcon from "assets/img/assetmanager/adobe-icon.png";
import AppleIcon from "assets/img/assetmanager/apple-icon.png";
import forbeseToolsIcon from "assets/img/assetmanager/forbese-tools-icon.png";
import slackInventoryIcon from "assets/img/assetmanager/slack-inventory-icon.png";
import {
  Box,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import { APP_PREFIX_PATH } from "configs/AppConfig";

class Application extends Component {
  tabMapping = [
    {
      name: "List View",
      iconName: "fas fa-list p-r-5",
      dataKey: "ListView",
    },
    {
      name: "Grid View",
      iconName: "fas fa-th-large p-r-5",
      dataKey: "GridView",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showServiceViewFilter: false,
      showRecentFilter: false,
      currentAccountId: null,
      showMenuIndex: null,
      activeTab: 0,
      procurifyIconStatus: false,
      flipkartIconStatus: false,
      appleDataIconStatus: false,
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

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  
  render() {
    const {
      showSelectFilter,
      showServiceViewFilter,
      showRecentFilter,
      activeTab,
      procurifyIconStatus,
      flipkartIconStatus,
      appleDataIconStatus
    } = this.state;
    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <h3 className="m-b-4">My Workspace</h3>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Grid item lg={8} md={8} xs={10}>
                <Box className="d-flex justify-content-center align-items-center">
                  <Box className="lest-view">
                    <List>
                      {this.tabMapping.map((tabData, index) => {
                        return (
                          <ListItem
                            key={`${index}`}
                            className={index === activeTab ? "active" : ""}
                            onClick={() => this.setActiveTab(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <a style={{ cursor: "pointer" }}>
                              <i className={tabData.iconName}></i>
                              {tabData.name}
                            </a>
                          </ListItem>
                        );
                      })}
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
                      Fillter
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
                  <Button
                    className="primary-btn min-width-inherit m-r-3"
                    variant="contained"
                  >
                    <i className="fa-solid fa-history p-r-5"></i> Recent
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} xs={10}>
                <div className="d-inline-block width-100 text-right">
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    <Link
                      style={{ color: "white" }}
                      to={`${APP_PREFIX_PATH}/environments/deployproject`}
                    >
                      <i className="fa-solid fa-plus-square p-r-5"></i> Create
                      New
                    </Link>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {activeTab === 0 && (
          <Box className="environment-table-section">
            <TableContainer className="table">
              <Table className="overview">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <strong>Workspace</strong>
                    </TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Client</TableCell>
                    <TableCell align="center" className="ou">
                      Line Of Business
                    </TableCell>
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
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        HRMS
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={RunningIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Running
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={ProcurifyIcon}
                          alt=""
                          style={{ maxWidth: "18px" }}
                        />
                      </span>
                      Procurify
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Logistics</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        EMS
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={RunningIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Running
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={HdfcIcon}
                          alt=""
                          style={{ maxWidth: "18px" }}
                        />
                      </span>
                      HDFC bank
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Transaction</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        PROCUREMENT
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={UpdatingIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Updating
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={AirAsiaIcon}
                          alt=""
                          style={{ maxWidth: "18px" }}
                        />
                      </span>
                      Air Asia
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Fleets</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        APPCUBE
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={StopIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Stop
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={WalmartIcon}
                          alt=""
                          style={{ maxWidth: "18px" }}
                        />
                      </span>
                      Walmart
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Logistics</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        HRMS
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={UpdatingIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Updating
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={AdobeIcon}
                          alt=""
                          style={{ maxWidth: "18px" }}
                        />
                      </span>
                      Adobe
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Frames</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        EMS
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={RunningIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Running
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={ProcurifyIcon1}
                          alt=""
                          style={{ maxWidth: "18px" }}
                        />
                      </span>
                      Procurify
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Banking</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Link
                        to={`${APP_PREFIX_PATH}/environments/procurifylogisticstools`}
                      >
                        PROCUREMENT
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={RunningIcon}
                          alt=""
                          style={{ maxWidth: "16px" }}
                        />
                      </span>
                      Running
                    </TableCell>
                    <TableCell align="center">
                      <span>
                        <img
                          src={FlipkartIcon}
                          alt=""
                          style={{ maxWidth: "14px" }}
                        />
                      </span>
                      Flipkart
                    </TableCell>
                    <TableCell align="center">
                      <div className="business-btn"> Client</div>
                    </TableCell>
                    <TableCell align="center">13</TableCell>
                    <TableCell align="center">500</TableCell>
                    <TableCell align="center">33%</TableCell>
                    <TableCell align="center">41</TableCell>
                    <TableCell align="center">29</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {activeTab === 1 && (
          <Box className="logistics-cards">
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
            <Box className="logistics-card">
              <Box className="d-flex width-100 top-content">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <Box className="d-flex width-100 title">
                    Procurify-Logistics
                  </Box>
                  <Box className="d-flex width-100 status-content">
                    <span className="d-flex width-100">
                      Status : <strong>Running</strong>
                    </span>
                    <span className="d-flex width-100">
                      App Services : <strong>96</strong>
                    </span>
                    <span className="d-flex width-100">
                      Data Services : <strong>96</strong>
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block width-100 bottom-content">
                <Box className="content">
                  <label>Client</label>
                  <p>Forbese</p>
                </Box>
                <Box className="content">
                  <label>Usage</label>
                  <p>33%</p>
                </Box>
                <Box className="content">
                  <label>User Count</label>
                  <p>241</p>
                </Box>
                <Box className="content">
                  <label>Tags</label>
                  <span className="outline">Logistics</span>
                </Box>
                <Box className="content">
                  <label>L.O.B</label>
                  <span>Customs</span>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        <Box className="recently-viewed-section">
          <h3>Recently Viewed</h3>
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
                <img src={forbeseToolsIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Forbese-Tools</div>
                <Box className="refund-content">
                  <span>Automation</span>
                </Box>
              </Box>
            </Box>
            <Box className="recently-card">
              <Box className="recently-image">
                <img src={slackInventoryIcon} alt="" />
              </Box>
              <Box className="recently-content">
                <div className="title">Slack Inventory</div>
                <Box className="refund-content">
                  <span>Order</span>
                  <span>Refund</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="recently-viewed-section">
          <h3>Favorites</h3>
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
              <Box
                className={
                  procurifyIconStatus ? "favorites-star" : "favorites-check"
                }
                onClick={() => this.setState({ procurifyIconStatus: !procurifyIconStatus })
              }
              >
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
              <Box
                className={
                  flipkartIconStatus ? "favorites-star" : "favorites-check"
                }
                onClick={() => {this.setState({flipkartIconStatus:!flipkartIconStatus})}}
              >
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
              <Box 
              
              className={
                appleDataIconStatus ? "favorites-star" : "favorites-check"
              }
              onClick={() => {this.setState({appleDataIconStatus:!appleDataIconStatus})}}
              >
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
