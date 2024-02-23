import React, { Component } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

export class SpendingTable extends Component {
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
          <TableCell>Tags</TableCell>
          <TableCell>Instance ID </TableCell>
          <TableCell>Instance Type</TableCell>
          <TableCell>Instance Status</TableCell>
          <TableCell>Pricing model</TableCell>
          <TableCell>Availability zone</TableCell>
          <TableCell>Ondemand cost / hr</TableCell>
          <TableCell>RI cost / hr</TableCell>
          <TableCell>Usage Hours</TableCell>
          <TableCell>Add-ons</TableCell>
          <TableCell>Total Spend</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { data } = this.props;
    return (
      <TableBody>
        {data?.length ? (
          data.map((details) => {
            let {
              tags,
              InstanceID,
              type,
              status,
              priceModel,
              availabilityZone,
              onDemandCostHr,
              RICostHr,
              usageHrs,
              addOns,
              totalSpend,
            } = details;
            return (
              <TableRow>
                <TableCell>{tags}</TableCell>
                <TableCell>{InstanceID}</TableCell>
                <TableCell>{type} </TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{priceModel}</TableCell>
                <TableCell>{availabilityZone}</TableCell>
                <TableCell>{onDemandCostHr}</TableCell>
                <TableCell>{RICostHr}</TableCell>
                <TableCell>{usageHrs}</TableCell>
                <TableCell>{addOns}</TableCell>
                <TableCell>{totalSpend}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">There are no data available.</h5>
            </Box>
          </Box>
        )}
      </TableBody>
    );
  };

  render() {
    return <Box className="new-reports-table">{this.renderTable()}</Box>;
  }
}

export default SpendingTable;
