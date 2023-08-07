import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

class SLAMetrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slaData: undefined,
      dataLoaded: false,
    };
  }

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
            <TableCell
              className={this.handletableColor(productData.Performance)}
            >
              {productData.Performance}%
            </TableCell>
            <TableCell
              className={this.handletableColor(productData.Availability)}
            >
              {productData.Availability}%
            </TableCell>
            <TableCell
              className={this.handletableColor(productData.Reliability)}
            >
              {productData.Reliability}%
            </TableCell>
            <TableCell className={this.handletableColor(productData.Security)}>
              {productData.Security}%
            </TableCell>
            <TableCell
              className={this.handletableColor(productData["End Usage"])}
            >
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
              <TableBody>
                <TableRow>
                  <TableCell className="products">Product 1</TableCell>
                  <TableCell className="orange">89%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="red">67%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="products">Product 2</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="products">Product 3</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="orange">83%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="products">Product 4</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="orange">86%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="products">Product 5</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="products">Product 6</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="orange">85%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                  <TableCell className="green">99%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="metrics-performance">
            <Box className="performance-box green">
              <i className="fa-solid fa-angle-right"></i> 98%
            </Box>
            <Box className="performance-box orange">
              <i className="fa-solid fa-angle-right"></i> 90%
            </Box>
            <Box className="performance-box red">
              <i className="fa-solid fa-angle-left"></i> 90%
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SLAMetrics;
