import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox
} from "@mui/material";

export class Service extends Component {
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">
                  Servicename
                </TableCell>
                <TableCell align="center">Port Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  {" "}
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={(e) => {
                      // this.handleCheckBox(e);
                      this.props.setNextTab(3);
                    }}
                  />{" "}
                  MockDB
                </TableCell>
                <TableCell align="center">80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  DummyWebServer
                </TableCell>
                <TableCell align="center">443</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  {" "}
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />{" "}
                  SimulatedQueue
                </TableCell>
                <TableCell align="center">443</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  {" "}
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />{" "}
                  PseudoAnalytics
                </TableCell>
                <TableCell align="center">21</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Service;
