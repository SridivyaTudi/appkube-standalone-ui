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
import { v4 } from "uuid";

let percentage = [
  {
    name: <>Action group <a href='#'>email to Siddhesh</a> executed (configured on alert rule)</>,
    date: "09-03-2024; 11:29:02",
  },
  {
    name: "Alert fired",
    date: "09-03-2024; 11:28:56",
  },
];

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

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpModal: false,
      pg: 0,
      rpg: 10,
      percentage,
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
          <TableCell align="left">Date/Time</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { percentage } = this.state;
    return (
      <TableBody>
        {percentage?.length ? (
          percentage.map((data) => {
            return (
              <TableRow key={v4()}>
                <TableCell align="left">{data.name}</TableCell>
                <TableCell align="left">
                  <strong> {data.date} </strong>
                </TableCell>
              </TableRow>
              // <TableRow>
              //   <TableCell align="left">Alert fired</TableCell>
              //   <TableCell align="left"><strong>09-03-2024; 11:28:56</strong></TableCell>
              // </TableRow>
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

export default History;
