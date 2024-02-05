import React, { Component } from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

class RolesPolicies extends Component {
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">Name</TableCell>
                <TableCell align="center">HTTP Environment</TableCell>
                <TableCell align="center">gRPC</TableCell>
                <TableCell align="center">Applied on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                Error Response format
                </TableCell>
                <TableCell align="center">Applied By Default</TableCell>
                <TableCell align="center">Applied By Default</TableCell>
                <TableCell align="center">Outbound</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                TLS Backend
                </TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Backend</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                TLS Inbound
                </TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Inbound</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                GRPC Backend config
                </TableCell>
                <TableCell align="center">Not Supported</TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Inbound</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                Cluster zone sync
                </TableCell>
                <TableCell align="center">Applied By Default</TableCell>
                <TableCell align="center">Applied By Default</TableCell>
                <TableCell align="center">Inbound</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                Cluster wide config setting
                </TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Supported</TableCell>
                <TableCell align="center">Inbound</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }
}

export default RolesPolicies