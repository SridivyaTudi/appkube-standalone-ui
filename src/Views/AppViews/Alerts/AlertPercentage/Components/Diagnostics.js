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
    return (
      <TableBody>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left"><span className="percentage-status"></span>High</TableCell>
          <TableCell align="left">
            <i
              className="fas fa-exclamation-triangle m-r-1"
              style={{ color: "#FF8E3E" }}
            ></i>
            Fired
          </TableCell>
          <TableCell align="left">New</TableCell>
          <TableCell align="left">Prod_DB_SYN14</TableCell>
        </TableRow>
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
