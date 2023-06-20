import React from "react";
import SelectDepartmentPopup from "../../../../Components/SelectDepartmentPopup";
import dummyData from "./../dummy.json";
import { Box, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem } from "@mui/material";

class EksCluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectDepartmentPopupModalRef = React.createRef();
  }
  onClickSelectDepartmentPopup = (link) => {
    this.selectDepartmentPopupModalRef.current.setLink(link);
    this.selectDepartmentPopupModalRef.current.toggle();
  };

  render() {
    return (
      <>
        <Box className="resources-section">
          <h4>EKS Resources</h4>
          <Box className="account-list-conitant">
            <Box className="account-list-conitant-scroll">
              {dummyData.eksResources.map((item) => {
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
                    {dummyData.eksPerformance.map((item) => {
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

export default EksCluster;
