import React, { Component } from "react";
import {
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { v4 } from "uuid";

class ApplicationStatusDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          resources: "EC2",
          resourcesType: "Web App",
          primaryResources: "Frontend elb",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "EKS",
          resourcesType: "App App",
          primaryResources: "APIELB",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "ELB",
          resourcesType: "Web",
          primaryResources: "FrontendASG",
          failureResources: "Web",
          status: "Done",
        },
        {
          resources: "Aurora",
          resourcesType: "Data",
          primaryResources: "Jenkis",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "EC2",
          resourcesType: "App layer",
          primaryResources: "Frontend elb",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "EKS",
          resourcesType: "App layer",
          primaryResources: "APIELB",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "ELB",
          resourcesType: "Web",
          primaryResources: "FrontendASG",
          failureResources: "Web",
          status: "Done",
        },
        {
          resources: "Aurora",
          resourcesType: "Data",
          primaryResources: "Jenkis",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "EKS",
          resourcesType: "App layer",
          primaryResources: "APIELB",
          failureResources: "",
          status: "Done",
        },
        {
          resources: "ELB",
          resourcesType: "Web",
          primaryResources: "FrontendASG",
          failureResources: "Web",
          status: "Done",
        },
        {
          resources: "Aurora",
          resourcesType: "Data",
          primaryResources: "Jenkis",
          failureResources: "",
          status: "Done",
        },
      ],
    };
  }

  /** Render table level-1 data . */
  renderTableData() {
    let { data } = this.state;
    return data.map((datas, index) => {
      return (
        <TableRow key={v4()}>
          <TableCell align="center">{datas.resources}</TableCell>
          <TableCell align="center">{datas.resourcesType}</TableCell>
          <TableCell align="center">{datas.primaryResources}</TableCell>
          <TableCell align="center">{datas.failureResources}</TableCell>
          <TableCell align="center">
            <Box className="done">{datas.status}</Box>
          </TableCell>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Box className="application-status-dashboard-container">
        <Box className="heading">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems={"center"}
          >
            <Grid item xs={12} md={9} lg={9}>
              <h3>
                Application <span>0515698 1234-8520-9510-3248/ USeast5</span>
              </h3>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Box className="button-group">
                <Button
                  className="primary-outline-btn min-width m-r-2"
                  variant="outlined"
                >
                  Test
                </Button>
                <Button className="primary-btn min-width" variant="contained">
                  Start Failover
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="application-table-section">
          <Box className="head">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
            >
              <Grid item xs={12} md={8} lg={8}>
                <span>Failover point status : 1 hour</span>
                <strong>Last Failover test : 30/july/2023</strong>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Box className="search-box">
                  <Box className="form-group search-control-group m-b-0">
                    <input
                      type="text"
                      className="input-group-text"
                      placeholder=""
                      name="searchedKey"
                    />
                    <button className="search-btn">
                      <i className="fa fa-search" />
                    </button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <TableContainer className="table">
            <Table className="application-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Resources</TableCell>
                  <TableCell align="center">Resources Type</TableCell>
                  <TableCell align="center">Primary resources</TableCell>
                  <TableCell align="center">Failure resources</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.renderTableData()}</TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}

export default ApplicationStatusDashboard;
