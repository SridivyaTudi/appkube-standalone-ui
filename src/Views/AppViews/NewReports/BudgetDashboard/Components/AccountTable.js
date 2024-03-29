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
        <Table style={{ width: 1500 }}>
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
          {headers.map((header, index) => (
            <TableCell>{header}</TableCell>
          ))}
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
                    to={`/app/new-reports/budget-dashboard/budget-services-account`}
                  >
                    {" "}
                    {details.id}
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

                <TableCell>
                  <strong>{details.serviceCount}</strong>
                </TableCell>
                <TableCell>
                  <strong> {details.region}</strong>
                </TableCell>
                <TableCell>
                  <strong> {details.spending}</strong>
                </TableCell>
                <TableCell>
                  <Box className="variance-count red">
                    {details.varience}{" "}
                    <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                  </Box>
                </TableCell>
                <TableCell>
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
