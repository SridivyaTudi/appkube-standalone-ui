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
  TablePagination,
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
      lambdaFunctionsData: [
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
      ],
      pg: 0,
      rpg: 10,
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

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
    const { lambdaFunctionsData, pg, rpg } = this.state;
    return (
      <>
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
        <Box className="lambda-functions-container">
          <Box className="heading">Lambda Functions</Box>
          <Box className="lambda-functions-table-section">
            <TableContainer className="table">
              <Table className="lambda-functions-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Function name</TableCell>
                    <TableCell align="center">Response time</TableCell>
                    <TableCell align="center">Duration</TableCell>
                    <TableCell align="center">Invocations</TableCell>
                    <TableCell align="center">Throttles</TableCell>
                    <TableCell align="center">Errors</TableCell>
                    <TableCell align="center">Latency</TableCell>
                    <TableCell align="center">Network received</TableCell>
                    <TableCell align="center">Requests</TableCell>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Environment</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lambdaFunctionsData
                    .slice(pg * rpg, pg * rpg + rpg)
                    .map((row, index) => (
                      <TableRow key={v4()}>
                        <TableCell align="center">{row.functionName}</TableCell>
                        <TableCell align="center">{row.responseTime}</TableCell>
                        <TableCell align="center">{row.duration}</TableCell>
                        <TableCell align="center">{row.invocations}</TableCell>
                        <TableCell align="center">{row.throttles}</TableCell>
                        <TableCell align="center">{row.errors}</TableCell>
                        <TableCell align="center">{row.latency}</TableCell>
                        <TableCell align="center">
                          {row.networkReceived}
                        </TableCell>
                        <TableCell align="center">{row.requests}</TableCell>
                        <TableCell align="center">{row.product}</TableCell>
                        <TableCell align="center">{row.environment}</TableCell>
                        <TableCell align="center">{row.actions}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={lambdaFunctionsData.length}
              rowsPerPage={rpg}
              page={pg}
              className="access-control-pagination"
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </>
    );
  }
}

export default ApplicationStatusDashboard;
