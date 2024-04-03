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
        <Table style={{ minWidth: 1550 }}>
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
            <TableCell key={v4()}>{header}</TableCell>
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

                <TableCell>
                  <strong>{details.currentMonthSpend}</strong>
                </TableCell>
                <TableCell>
                  <strong> {details.lastMonthSpend}</strong>
                </TableCell>
                <TableCell>
                  <Box className="variance-count red">
                    {details.varience}{" "}
                    <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                  </Box>
                </TableCell>
                <TableCell>
                  <strong> {details.avgDailySpend}</strong>
                </TableCell>

                <TableCell>
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

export default navigateRouter(AccountTable);
