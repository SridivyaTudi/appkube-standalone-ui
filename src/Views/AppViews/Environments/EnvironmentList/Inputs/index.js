import React, { Component } from "react";
import CommonFilterViewSearch from "Views/AppViews/Environments/EnvironmentList/CommonFilterViewSearch";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  filterVpcsData = (search) => {};
  render() {
    return (
      <Box className="discovered-assets">
        <CommonFilterViewSearch
          data={{ vpcsDetails: this.state.vpcsDetails }}
          handleSearch={(string) => {
            this.filterVpcsData(string);
          }}
          updateAccountId={(accountId) => {
            this.setState({ accountId });
            this.props.updateCloudName(
              new URLSearchParams(document.location.search).get("cloudName"),
              accountId
            );
          }}
          accountList={this.props.accountList}
        />
        <Box className="environment-table-section">
          <TableContainer className="table">
            <Table className="overview">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <i className="m-r-1 fas fa-sort-down"></i>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="center">Source of input</TableCell>
                  <TableCell align="center">Type of input</TableCell>
                  <TableCell align="center">Dashboard</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <strong className="input-name">Name</strong>
                  </TableCell>
                  <TableCell align="center">Grafana</TableCell>
                  <TableCell align="center">KPI</TableCell>
                  <TableCell align="center">05</TableCell>
                  <TableCell align="center">
                    <button className="green-btn">Active</button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <strong className="input-name">Name</strong>
                  </TableCell>
                  <TableCell align="center">Grafana</TableCell>
                  <TableCell align="center">KPI</TableCell>
                  <TableCell align="center">05</TableCell>
                  <TableCell align="center">
                    <button className="green-btn">Active</button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}

export default Inputs;
