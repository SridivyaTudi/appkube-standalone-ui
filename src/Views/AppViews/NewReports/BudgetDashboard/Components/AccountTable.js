import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
export class AccountTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ minWidth: 1500 }}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    let headers = this.props.headers || [];
    return (
      <TableHead>
        <TableRow>
          <TableCell>Account ID</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Vpc</TableCell>
          <TableCell align="center">Service count</TableCell>
          <TableCell>High spending region</TableCell>
          <TableCell align="center">Spending</TableCell>
          <TableCell align="center">Variance</TableCell>
          <TableCell align="center">Budget</TableCell>
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
              <TableRow>
                <TableCell>
                  {details.nameImageShow ? details.nameImageShow : <></>}
                  <Link
                    to={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-services-account`}
                  >
                    <strong>{details.id}</strong>
                  </Link>
                </TableCell>
                {this.props?.notShowingField?.includes("id") ? (
                  <></>
                ) : (
                  <TableCell>{details.department}</TableCell>
                )}
                {this.props?.notShowingField?.includes("orgUnit") ? (
                  <></>
                ) : (
                  <TableCell> {details.vpc}</TableCell>
                )}

                <TableCell align="center">
                  <strong>{details.serviceCount}</strong>
                </TableCell>
                <TableCell>{details.region}</TableCell>
                <TableCell align="center">
                  <strong> {details.spending}</strong>
                </TableCell>
                <TableCell align="center">
                  <Box className="variance-count red">
                    <strong>{details.varience}</strong>
                    <i className="fas fa-sort-down p-l-5 "></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <strong>{details.budget}</strong>
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

export default navigateRouter(AccountTable);
