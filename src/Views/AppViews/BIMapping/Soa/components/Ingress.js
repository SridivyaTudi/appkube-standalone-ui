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

class Ingress extends Component {
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
                      this.props.setNextTab(2);
                    }}
                  />
                  sg-ingress-12345678
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  sg-ingress-12345678
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  sg-ingress-12345678
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    className="check-box"
                    size="small"
                    onChange={this.handleCheckBox}
                  />
                  sg-ingress-12345678
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Ingress;
