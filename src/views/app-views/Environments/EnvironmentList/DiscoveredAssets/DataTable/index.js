import React, { Component } from "react";
import Lambda from "assets/img/assetmanager/cloud-managed-icon1.png";
import S3 from "assets/img/assetmanager/cloud-managed-icon2.png";
import SQS from "assets/img/assetmanager/cloud-managed-icon3.png";
import SNS from "assets/img/assetmanager/cloud-managed-icon4.png";
import Redshift from "assets/img/assetmanager/cloud-managed-icon5.png";
import RDS from "assets/img/assetmanager/cloud-managed-icon6.png";
import AppMesh from "assets/img/assetmanager/cloud-managed-icon7.png";
import Kinesis from "assets/img/assetmanager/cloud-managed-icon8.png";
import TimeSeries from "assets/img/assetmanager/cloud-managed-icon9.png";
import Athena from "assets/img/assetmanager/cloud-managed-icon10.png";
import dummyData from "views/app-views/Environments/EnvironmentList/DiscoveredAssets/dummy.json";
import AllServices from "./AllServices";
import NoSqldb from "./NoSqldb";
import GitDb from "./GitDb";
import SearchDb from "./SearchDb";
import LedgerDb from "./LedgerDb";
import CacheDb from "./CacheDb";
import ObjectDb from "./ObjectDb";
import MetricsDb from "./MetricsDb";

import {
  Button,
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

class DataTable extends Component {
  tableMapping = [
    {
      name: "All Services",
      dataKey: "AllServices",
      component: AllServices,
    },
    {
      name: "No SQLDB",
      dataKey: "NoSqldb",
      component: NoSqldb,
    },
    {
      name: "Git DB",
      dataKey: "GitDb",
      component: GitDb,
    },
    {
      name: "Search DB",
      dataKey: "SearchDb",
      component: SearchDb,
    },
    {
      name: "Ledger DB",
      dataKey: "LedgerDb",
      component: LedgerDb,
    },
    {
      name: "Cache DB",
      dataKey: "CacheDb",
      component: CacheDb,
    },
    {
      name: "Object DB",
      dataKey: "ObjectDb",
      component: ObjectDb,
    },
    {
      name: "Metrics DB",
      dataKey: "MetricsDb",
      component: MetricsDb,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      serivceImages: [
        Lambda,
        S3,
        SQS,
        SNS,
        Redshift,
        RDS,
        AppMesh,
        Kinesis,
        TimeSeries,
        Athena,
      ],
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <Box className="cloud-managed-section">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <Box className="cloud-managed-tab">
                  <Box>
                    <List>
                      {this.tableMapping.map((tabData, index) => {
                        return (
                          <ListItem
                            key={`ops-tab-${index}`}
                            className={index === activeTab ? "active" : ""}
                            onClick={() => this.setActiveTab(index)}
                          >
                            {tabData.name}
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </Box>
                {/* <Box className="cloud-managed-tab">
                  <List>
                    <ListItem className="active">
                      <a>All Services</a>
                    </ListItem>
                    <ListItem>
                      <a>No SQLDB</a>
                    </ListItem>
                    <ListItem>
                      <a>Git DB</a>
                    </ListItem>
                    <ListItem>
                      <a>Search DB</a>
                    </ListItem>
                    <ListItem>
                      <a>Ledger DB</a>
                    </ListItem>
                    <ListItem>
                      <a>Cache DB</a>
                    </ListItem>
                    <ListItem>
                      <a>Object DB</a>
                    </ListItem>
                    <ListItem>
                      <a>Metrics DB</a>
                    </ListItem>
                  </List>
                </Box> */}
              </Grid>
              <Grid item xs={8}>
                <Box className="tabs-content m-t-0">
                  {activeTab === 0 ? (
                    <AllServices />
                  ) : activeTab === 1 ? (
                    <NoSqldb />
                  ) : activeTab === 2 ? (
                    <GitDb />
                  ) : activeTab === 3 ? (
                    <SearchDb />
                  ) : activeTab === 4 ? (
                    <LedgerDb />
                  ) : activeTab === 5 ? (
                    <CacheDb />
                  ) : activeTab === 6 ? (
                    <ObjectDb />
                  ) : activeTab === 7 ? (
                    <MetricsDb />
                  ) : (
                    <></>
                  )}
                </Box>
              </Grid>
              {/* <Grid item xs={8}>
                <Box className="cloud-managed-cards">
                  <Box className="cloud-managed-cards-scroll">
                    {dummyData.cloudManagedServices.map((item, index) => {
                      return (
                        <Box className="service-card active">
                          <Box className="service-icon">
                            <img
                              src={this.state.serivceImages[index]}
                              alt="serviceicon"
                            />
                          </Box>
                          <Box className="service-contant">
                            <label>{item.name}</label>
                            <strong>{item.value}</strong>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Box className="resources-section">
          <h4>Lambda Resources</h4>
          <Box className="account-list-conitant">
            <Box className="account-list-conitant-scroll">
              {dummyData.lambdaResources.map((item) => {
                return (
                  <Box className="account-list-details">
                    <Box className="d-block">
                      <strong>{item.value}</strong>
                      <p>{item.title}</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box className="performance-section">
          <Box className="performance-head">
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item lg={5} md={5} xs={12}>
                  <h4>Lambda Performance</h4>
                </Grid>
                <Grid item lg={7} md={7} xs={12}>
                  <Box className="head-right text-right">
                    <Button
                      className="primary-btn min-width-inherit m-r-3"
                      variant="contained"
                    >
                      <i className="fa-solid fa-stream p-r-10"></i>
                      fillter
                    </Button>
                    <Button variant="outlined" className="primary-outline-btn">
                      Explore
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="environment-table-section">
            <Box className="table discovered-assets-table">
              <TableContainer>
                <Table className="overview">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Performance</TableCell>
                      <TableCell align="center">Availability</TableCell>
                      <TableCell align="center">Security</TableCell>
                      <TableCell align="center">Data Protection</TableCell>
                      <TableCell align="center">User Exp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyData.lambdaPerformance.map((item) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <strong>
                              <a href="#">{item.name}</a>
                            </strong>
                            <i className="fa-solid fa-caret-right m-l-1"></i>
                          </TableCell>
                          <TableCell align="center">
                            <div className="box green">
                              <i className="fa-solid fa-check"></i>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="box orange">
                              <i className="fa-solid fa-sort-up"></i>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="box red">
                              <i className="fa-solid fa-stop-circle"></i>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="box red">
                              <i className="fa-solid fa-stop-circle"></i>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="box green">
                              <i className="fa-solid fa-check"></i>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default DataTable;
