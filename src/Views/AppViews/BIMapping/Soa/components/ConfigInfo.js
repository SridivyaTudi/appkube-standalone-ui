import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";

class ConfigInfo extends Component {
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">
                  key
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  value
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  subkey
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  subvalue
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">dummy-lb-12345</TableCell>
                <TableCell align="left">dummy-lb-12345</TableCell>
                <TableCell align="left">dummy-lb-12345</TableCell>
                <TableCell align="left">dummy-lb-12345</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default ConfigInfo;
