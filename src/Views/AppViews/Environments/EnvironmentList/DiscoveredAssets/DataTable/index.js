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
import dummyData from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/dummy.json";
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
        <Box className="cloud-managed-section cloud-all-services">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={3}>
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
              <Grid item xs={9}>
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
      </>
    );
  }
}

export default DataTable;
