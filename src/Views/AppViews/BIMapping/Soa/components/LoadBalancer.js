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

class LoadBalancer extends Component {
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">
                  Id
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={(e) => {
                      // this.handleCheckBox(e);
                      this.props.setNextTab(1);
                    }}
                  />
                  dummy-lb-12345
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  dummy-lb-12345
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  dummy-lb-12345
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  dummy-lb-12345
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default LoadBalancer;
