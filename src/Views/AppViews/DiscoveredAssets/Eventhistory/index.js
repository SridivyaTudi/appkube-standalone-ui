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
  Checkbox,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { v4 } from "uuid";

class Eventhistory extends Component {
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
          <TableCell align="left">
            {" "}
            <Checkbox
              className="check-box"
              size="small"
              //id={index}
              onChange={this.handleCheckBox}
              //checked={selectedService.includes(index)}
            />
            Event name
          </TableCell>
          <TableCell align="left">Event time</TableCell>
          <TableCell align="left">User name</TableCell>
          <TableCell align="left">Event source</TableCell>
          <TableCell align="left">Resources</TableCell>
          <TableCell align="left">Resource name</TableCell>
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
          <Box className="heading">
            Event history <span>(50+)</span>
          </Box>
        </Box>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input
              type="text"
              className="input"
              placeholder="AWS:EC2:Instance"
              //value={searchedKey}
              onChange={this.handleSearchChange}
              autoFocus="autoFocus"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Button className="primary-btn min-width">Filter</Button>
        </Box>
        <Box className="assets-table">{this.renderTable()}</Box>
      </Box>
    );
  }
}

export default Eventhistory;
