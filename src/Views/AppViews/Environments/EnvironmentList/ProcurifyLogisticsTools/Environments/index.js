import React, { Component } from "react";
import CommonFilterViewSearch from "../../CommonFilterViewSearch";
import TopologyView from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/TopologyView";
import Aws from "assets/img/aws.png";
import VpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "assets/img/assetmanager/cluster-icon.png";
import GatewayIcon from "assets/img/assetmanager/gateway-icon.png";
import {
  Box,
  Grid,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

let Data = {
  label: "Account ID",
  subLabel: "456262908",
  image: Aws,
  productEnclaveList: [
    {
      label: "vpc-218",
      id: null,
      type: "vpc",
      image: VpcServicesIcon,
      children: [
        {
          label: "cloudManaged",
          id: "",
          image: ClusterIcon,
          type: "cluster",
          children: [],
        },
      ],
    },
    {
      label: "vpc-224",
      id: null,
      type: "vpc",
      image: VpcServicesIcon,
      children: [
        {
          label: "gateway",
          id: "",
          image: ClusterIcon,
          type: "cluster",
          children: [],
        },
      ],
    },
    {
      label: "vpc-223",
      id: null,
      type: "vpc",
      image: VpcServicesIcon,
      children: [
        {
          label: "gateway",
          id: "",
          image: GatewayIcon,
          type: "cluster",
          children: [],
        },
      ],
    },
  ],
  globalServiceList: [],
};

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="environmentlist-container">
        <Box className="discovered-assets">
          <Box className="discovered-assets-head">
            <CommonFilterViewSearch handleSearch={() => {}} />
          </Box>
          <Box sx={{ width: "100%" }} className="m-t-4">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Box className="services-panel">
                  <Box className="services-panel-body">
                    {Object.keys(Data).length ? (
                      <TopologyView
                        data={Data}
                        setCurrentActiveNode={() => {}}
                        parentCssClass="infra-toplogy-view"
                      />
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className="fliter-tabs">
                  <Box
                    className="environment-table-section m-t-0"
                    style={{ minHeight: "445px" }}
                  >
                    <Box className="table discovered-assets-table">
                      <TableContainer>
                        <Table className="overview">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="center">Performance</TableCell>
                              <TableCell align="center">Availability</TableCell>
                              <TableCell align="center">Security</TableCell>
                              <TableCell align="center">
                                Data Protection
                              </TableCell>
                              <TableCell align="center">User Exp</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <strong>EMS</strong>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box red">2</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box orange">3</Box>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Supply Chain</strong>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box red">2</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>Procurement</strong>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box red">2</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box orange">3</Box>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Environments;
