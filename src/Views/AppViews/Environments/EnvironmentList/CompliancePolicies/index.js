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

class CompliancePolicies extends Component {
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
                  <TableCell align="left" colSpan={2}>
                    <strong>AWS CCPA Framework</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Environment</TableCell>
                  <TableCell align="center">Notification</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">AWS (6579077747545)</TableCell>
                  <TableCell align="center">3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="environment-table-section">
          <TableContainer className="table">
            <Table className="overview">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={2}>
                    <strong>AWS HIPPS Compliance</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Environment</TableCell>
                  <TableCell align="center">Notification</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">AWS (6579077747545)</TableCell>
                  <TableCell align="center">3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}

export default CompliancePolicies;
