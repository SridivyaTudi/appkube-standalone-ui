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
import SelectDepartmentPopup from "views/app-views/AssetManager/Components/SelectDepartmentPopup";
import dummyData from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/dummy.json";
import { Box, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem } from "@mui/material";

class DataLakeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.selectDepartmentPopupModalRef = React.createRef();
  }
  onClickSelectDepartmentPopup = (link) => {
    this.selectDepartmentPopupModalRef.current.setLink(link);
    this.selectDepartmentPopupModalRef.current.toggle();
  };

  render() {
    const { } = this.state;
    return (
      <>
        <Box className="cloud-managed-section">
          <h4>Cloud Managed Services</h4>
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
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Grid item lg={5} md={5} xs={12}>
                  <h4>Lambda Performance</h4>
                </Grid>
                <Grid item lg={7} md={7} xs={12}>
                  <Box className="head-right text-right">
                    <button
                      className="blue-button m-b-0 m-r-3"
                      onClick={() => this.onClickSelectDepartmentPopup("")}
                    >
                      <i className="fa-solid fa-stream p-r-10"></i>
                      fillter
                    </button>
                    <button className="white-outline m-b-0 m-r-0">
                      Explore
                    </button>
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
          <SelectDepartmentPopup ref={this.selectDepartmentPopupModalRef} />
        </Box>
      </>
    );
  }
}

export default DataLakeTable;
