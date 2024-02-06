import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

class Variable extends Component {
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">Name</TableCell>
                <TableCell align="center">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                NGINX_VERSION
                </TableCell>
                <TableCell align="center">1.24.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                OWASP_MODSECURITY_CRS_VERSION
                </TableCell>
                <TableCell align="center">3.1.1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                PATH
                </TableCell>
                <TableCell align="center">/usr/local/sbin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                PROXY_READ_TIMEOUT
                </TableCell>
                <TableCell align="center">200</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                UPSTREAM_KEEPALIVE
                </TableCell>
                <TableCell align="center">1.24.0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                WORKER_PROCESS
                </TableCell>
                <TableCell align="center">auto</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Variable;
