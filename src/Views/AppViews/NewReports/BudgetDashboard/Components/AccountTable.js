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
            <TableCell align={`${index === 0 ? "left" : "center"} `}>
              {header}
            </TableCell>
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
                <TableCell align="left">
                  {details.nameImageShow ? details.nameImageShow : <></>}
                  <Link to={`/app/new-reports/budget-dashboard/budget-services-account`}> {details.id}</Link>
                </TableCell>
                {this.props?.notShowingField?.includes("id") ? (
                  <></>
                ) : (
                  <TableCell align="left">{details.department}</TableCell>
                )}
                {this.props?.notShowingField?.includes("orgUnit") ? (
                  <></>
                ) : (
                  <TableCell align="left"> {details.vpc}</TableCell>
                )}

                <TableCell align="center">
                  <strong>{details.serviceCount}</strong>
                </TableCell>
                <TableCell align="center">
                  <strong> {details.region}</strong>
                </TableCell>
                <TableCell align="center">
                  <strong> {details.spending}</strong>
                </TableCell>
                <TableCell align="center">
                  <Box className="variance-count">
                    {details.varience}{" "}
                    <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                  </Box>
                </TableCell>
                <TableCell align="center"><strong>{details.budget}</strong></TableCell>
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
