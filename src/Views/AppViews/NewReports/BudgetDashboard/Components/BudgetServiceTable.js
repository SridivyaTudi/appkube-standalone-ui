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
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

export class BudgetServiceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ minWidth: 1550 }}>
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
          <TableCell>Service name</TableCell>
          <TableCell align="center">Total instances</TableCell>
          <TableCell align="center">Current month spend</TableCell>
          <TableCell align="center">Last Quarter Spend</TableCell>
          <TableCell align="center">Variance</TableCell>
          <TableCell align="center">Action</TableCell>
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
            return (
              <TableRow key={v4()}>
                <TableCell>
                  {details.nameImageShow ? details.nameImageShow : <></>}
                  {details.name}
                </TableCell>
                {this.props?.notShowingField?.includes("id") ? (
                  <></>
                ) : (
                  <TableCell>{details.id}</TableCell>
                )}
                {this.props?.notShowingField?.includes("orgUnit") ? (
                  <></>
                ) : (
                  <TableCell> {details.orgUnit}</TableCell>
                )}

                <TableCell align="center">
                  <strong>{details.currentMonthSpend}</strong>
                </TableCell>
                <TableCell align="center">
                  <strong> {details.lastMonthSpend}</strong>
                </TableCell>
                <TableCell align="center">
                  <Box className="variance-count red">
                    <strong>{details.varience}</strong>
                    <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <strong> {details.avgDailySpend}</strong>
                </TableCell>

                <TableCell align="center">
                  <Link to={`${details.actionUrl || "#"}`}>
                    <Button className="light-btn p-l-15 p-r-15 ">
                      view more <OpenInNewIcon className="p-l-5" />
                    </Button>
                  </Link>
                </TableCell>
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

export default navigateRouter(BudgetServiceTable);
