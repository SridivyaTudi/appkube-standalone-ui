import React from "react";
import GlobalIcon6 from "assets/img/assetmanager/global-icon6.png";
import GlobalIcon7 from "assets/img/assetmanager/global-icon7.png";
import GlobalIcon3 from "assets/img/assetmanager/global-icon3.png";
import dummyData from "./dummy.json";
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
} from "@mui/material";
import { getUUID } from "utils";

class GatewayDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wafLength: "",
    };
  }

  componentDidMount = () => {
    this.props.vpc.hostingTypeList.map((item) => {
      item.category.map((category) => {
        if (category.category === "WAF") {
          this.setState({ wafLength: category.elementList.length });
        }
      });
    });
  };

  render() {
    const { wafLength } = this.state;
    return (
      <>
        <Box className="global-service-penal">
          <Box className="global-service-cards">
            <Box className="service-card active">
              <Box className="service-icon">
                <img src={GlobalIcon6} alt="serviceicon" />
              </Box>
              <Box className="service-contant">
                <label>WAF-Service</label>
                <strong>{wafLength}</strong>
              </Box>
            </Box>
            <Box className="service-card">
              <Box className="service-icon">
                <img src={GlobalIcon7} alt="serviceicon" />
              </Box>
              <Box className="service-contant">
                <label>API Gateway</label>
                <strong>03</strong>
              </Box>
            </Box>
            <Box className="service-card">
              <Box className="service-icon">
                <img src={GlobalIcon3} alt="serviceicon" />
              </Box>
              <Box className="service-contant">
                <label>Load Balancer</label>
                <strong>19</strong>
              </Box>
            </Box>
          </Box>
          <Box className="resources-section">
            <h4>WAF Resources</h4>
            <Box className="account-list-conitant">
              <Box className="account-list-conitant-scroll">
                {dummyData.eksResources.map((item) => {
                  return (
                    <Box className="account-list-details" key={getUUID()}>
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
                      <Button
                        variant="outlined"
                        className="primary-outline-btn"
                      >
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
                      {dummyData.eksPerformance.map((item) => {
                        return (
                          <TableRow key={getUUID()}>
                            <TableCell>
                              <strong>
                                <a href="#">{item.name}</a>
                              </strong>
                              <i className="fa-solid fa-caret-right m-l-1"></i>
                            </TableCell>
                            <TableCell align="center">
                              <Box className="box green">
                                <i className="fa-solid fa-check"></i>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box className="box orange">
                                <i className="fa-solid fa-sort-up"></i>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box className="box red">
                                <i className="fa-solid fa-stop-circle"></i>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box className="box red">
                                <i className="fa-solid fa-stop-circle"></i>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box className="box green">
                                <i className="fa-solid fa-check"></i>
                              </Box>
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
        </Box>
      </>
    );
  }
}

export default GatewayDetails;
