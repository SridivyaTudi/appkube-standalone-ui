import React, { Component } from "react";
import { Box, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem } from "@mui/material";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { } = this.state;
    return (
      <Box className="environment-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <i className="m-r-1 fas fa-sort-down"></i>
                  <strong>Severity</strong>
                </TableCell>
                <TableCell align="center">Created Time</TableCell>
                <TableCell align="center">Sources</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Assignee</TableCell>
                <TableCell align="center">Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <div className="billing-section">
                    <div className="billing-details">
                      <i className="fal fa-question-circle"></i>
                      <p>Billing details will be displayed here</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Billing;
