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

class ManagementInfo extends Component {
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
                <TableCell align="left">Hosted on</TableCell>
                <TableCell align="center">drop down</TableCell>
                <TableCell align="center">Instance ID	</TableCell>
                <TableCell align="center">user input</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default ManagementInfo;
