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
import AllServices from "./AllServices";
import NoSqldb from "./NoSqldb";
import GitDb from "./GitDb";
import SearchDb from "./SearchDb";
import LedgerDb from "./LedgerDb";
import CacheDb from "./CacheDb";
import ObjectDb from "./ObjectDb";
import MetricsDb from "./MetricsDb";
import { Box, Grid, List, ListItem } from "@mui/material";

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
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default DataTable;
