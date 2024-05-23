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

export class SpendingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ minWidth: 1210 }}>
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
          <TableCell align="left">Service name</TableCell>
          <TableCell align="center">
            Last {this.props.selectedGranularity} spend{" "}
          </TableCell>
          <TableCell align="center">
            This {this.props.selectedGranularity} spend
          </TableCell>
          <TableCell align="center">Variance</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { data, error } = this.props;

    return (
      <TableBody>
        {data?.length ? (
          data.map((details) => {
            let {
              name,
              icon,
              last_month_spend,
              month_spend,
              variance,
              actions,
            } = details;
            return (
              <TableRow>
                <TableCell align="left">
                  {/* <Box className="service-image d-inline-block">
                    <img src={icon} alt="" />
                  </Box> */}
                  {name}
                </TableCell>
                <TableCell align="center">
                  <strong>
                    {last_month_spend ? `$${last_month_spend}` : 0}
                  </strong>
                </TableCell>
                <TableCell align="center">
                  <strong>{month_spend ? `$${month_spend}` : 0}</strong>
                </TableCell>
                <TableCell align="center">
                  <Box
                    className={`variance-count ${variance > 0 ? "" : "red"} `}
                  >
                    <strong> {Math.abs(variance)}</strong>
                    {variance > 0 ? (
                      <i className="fas fa-sort-up p-l-5 " />
                    ) : (
                      <i className="fas fa-sort-down p-l-5" />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      this.props.navigate(
                        `${actions}${name}/${
                          this.props.page || "spend-overview"
                        }`
                      )
                    }
                    className="light-btn p-l-15 p-r-15 "
                  >
                    view more <OpenInNewIcon className="p-l-5" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">
                {error ? error : "There are no data available."}
              </h5>
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

export default navigateRouter(SpendingTable);
