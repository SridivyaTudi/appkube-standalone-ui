import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { v4 } from "uuid";

class LoginEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //  Render table
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Timestamp</TableCell>
          <TableCell align="left">Ingestion Time</TableCell>
          <TableCell align="left">Message</TableCell>
          <TableCell align="left">Event ID</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let environmentList = this.props.data || [];
    return (
      <TableBody>
        {environmentList.length ? (
          environmentList.map((environment) => {
            let { name, elementType, landingZone, productEnclave } =
              environment;
            return (
              <TableRow key={v4()}>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">{elementType}</TableCell>
                <TableCell align="left">{landingZone}</TableCell>
                <TableCell align="left">{productEnclave}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };
  render() {
    return (
      <Box className="discovered-assets-container">
        <Box className="assets-heading">
          <h3 className="m-b-0">ASSETS MANAGEMENT</h3>
          <Button className="primary-btn min-width-inherit" variant="contained">
            Back
          </Button>
        </Box>
        <Box className="global-services-fliter">
          <Box className="heading">Log Events</Box>
        </Box>
        <Box className="assets-table">{this.renderTable()}</Box>
      </Box>
    );
  }
}

export default LoginEvents;
