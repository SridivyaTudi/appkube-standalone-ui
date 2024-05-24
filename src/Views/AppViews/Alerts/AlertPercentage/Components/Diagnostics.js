import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  ListItem,
  List,
} from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

let diagnostics =[
  {
    name: "Percentage CPU",
    severity: "High",
    monitor: "Fired",
    alertState: "New",
    affectedResource: "Prod_DB_SYN14"
  },
  {
    name: "Percentage CPU",
    severity: "High",
    monitor: "Fired",
    alertState: "New",
    affectedResource: "Prod_DB_SYN14"
  }
]

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class Diagnostics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpModal: false,
      pg: 0,
      rpg: 10,
      diagnostics,
    };
  }
  //  Render table
  renderTable = () => {
    let alerts = this.props.data || [];
    let { rpg, pg } = this.state;

    return this.props.loderStatus ? (
      this.renderLoder()
    ) : (
      <>
        <TableContainer className="table">
          <Table>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
        {alerts?.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={alerts.length}
            rowsPerPage={rpg}
            page={pg}
            className="access-control-pagination"
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Severity</TableCell>
          <TableCell align="left">Monitor Condition</TableCell>
          <TableCell align="left">Alert State</TableCell>
          <TableCell align="left">Affected Resource</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { diagnostics } = this.state;
    return (
      <TableBody>
        {diagnostics?.length ? (
          diagnostics.map((data) => {
            return (
              <TableRow>
                <TableCell align="left">{data.name}</TableCell>
                <TableCell align="left">
                  <span className="percentage-status"></span>{data.severity}
                </TableCell>
                <TableCell align="left">
                  <i
                    className="fas fa-exclamation-triangle m-r-1"
                    style={{ color: "#FF8E3E" }}
                  ></i>
                  {data.monitor}
                </TableCell>
                <TableCell align="left">{data.alertState}</TableCell>
                <TableCell align="left">{data.affectedResource}</TableCell>
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
      <>
        <Box className="table-head m-t-0">
          <h4 className="m-t-0 m-b-0">Percentage CPU</h4>
        </Box>
        <Box className="alert-table">{this.renderTable()}</Box>
      </>
    );
  }
}

export default Diagnostics;
