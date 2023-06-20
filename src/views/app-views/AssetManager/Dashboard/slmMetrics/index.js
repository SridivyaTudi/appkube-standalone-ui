import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import {Box, Grid, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem} from "@mui/material";

class SLMMetrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slaData: undefined,
      dataLoaded: false,
    };
  }
  // componentDidMount = () => {
  //   fetch(Services.slaCentral)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       this.setState({ slaData: result });
  //     });
  // };

  handletableColor = (number) => {
    let color = "";
    if (number > 98) {
      color = "green";
    } else if (number > 75 && number < 90) {
      color = "orange";
    } else {
      color = "red";
    }
    return color;
  };

  showTableData = () => {
    const { slaData } = this.state;
    let tableHTML = [];
    if (slaData) {
      let products = Object.keys(slaData);
      products.forEach((product, index) => {
        const productData = slaData[product];
        tableHTML.push(
          <TableRow key={uuidv4()}>
            <TableCell className="products"> {product} </TableCell>
            <TableCell className={this.handletableColor(productData.Performance)}>
              {productData.Performance}%
            </TableCell>
            <TableCell className={this.handletableColor(productData.Availability)}>
              {productData.Availability}%
            </TableCell>
            <TableCell className={this.handletableColor(productData.Reliability)}>
              {productData.Reliability}%
            </TableCell>
            <TableCell className={this.handletableColor(productData.Security)}>
              {productData.Security}%
            </TableCell>
            <TableCell className={this.handletableColor(productData["End Usage"])}>
              {productData["End Usage"]}%
            </TableCell>
          </TableRow>
        );
      });
      return tableHTML;
    }
  };
  render() {
    return (
      <Box className="metrics-container">
        <Box className="applications-container">
          <Box className="applications-inner-container">
            <Box className="metrics-table">
              <TableContainer className="metrics-table-inner">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="products"> Products </TableCell>
                      <TableCell> Performance </TableCell>
                      <TableCell> Availability </TableCell>
                      <TableCell> Reliability </TableCell>
                      <TableCell> Security </TableCell>
                      <TableCell> End Usage </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.showTableData()}</TableBody>
                </Table>
              </TableContainer>
              <Box className="metrics-performance">
                <Box className="performance-box green">
                  <span>❯</span>98%
                </Box>
                <Box
                  className="performance-box"
                  style={{ marginright: 2, paddingLeft: 0 }}
                >
                  75%<span>❯</span>
                </Box>
                <Box className="performance-box orange">
                  <span>❯</span>90%
                </Box>
                <Box className="performance-box red">
                  <span>❮</span>75%
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SLMMetrics;
