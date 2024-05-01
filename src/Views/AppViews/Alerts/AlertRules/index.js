import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
const tableData = [
  {
    name: "Percentage CPU 1",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 2",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 3",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 4",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 1",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 2",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 3",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 4",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 1",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 2",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 3",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
  {
    name: "Percentage CPU 4",
    Condition: "Percentage CPU GreaterOrEqual 0",
    status: "Enabled",
    targetResource: "kub-master-1467834",
  },
];
class AlertRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpModal: false,
      pg: 0,
      rpg: 10,
      alertsData: tableData,
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ pg: 0, rpg: parseInt(event.target.value, 10) });
  };

  //  Render table
  renderTable = () => {
    let { rpg, pg, alertsData } = this.state;

    return this.props.loderStatus ? (
      this.renderLoder()
    ) : (
      <>
        <TableContainer className="table">
          <Table style={{ minWidth: 1300 }}>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
        {alertsData?.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={alertsData.length}
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
          <TableCell align="left">Condition</TableCell>
          <TableCell align="left">Status</TableCell>
          <TableCell align="left">Target Resource</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { alertsData, pg, rpg } = this.state;
    return (
      <TableBody>
        {alertsData.length ? (
          alertsData.slice(pg * rpg, pg * rpg + rpg).map((alert) => {
            return (
              <TableRow>
                <TableCell align="left">{alert.name}</TableCell>
                <TableCell align="left">{alert.Condition}</TableCell>
                <TableCell align="left" className="status">
                  {alert.status}
                </TableCell>
                <TableCell align="left">{alert.targetResource}</TableCell>
                <TableCell align="center">
                  <button type="button" className="list-icon">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
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

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { alertsData } = this.state;
    let data = tableData || [];
    if (data?.length) {
      if (value) {
        alertsData = data.filter((tableData) => {
          if (tableData?.name.toLowerCase().includes(value.toLowerCase())) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        alertsData = data;
      }
      this.setState({ alertsData, searchedKey: value });
    }
  };

  render() {
    let { searchedKey } = this.state;
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Monitor Alerts</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts`)}
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Alerts | Rules</li>
            </ul>
          </Box>
        </Box>
        <Box className="table-head">
          <h4 className="m-t-0 m-b-0">24 Rules / 20 Enabled</h4>
          <Box className="d-flex">
            <Box className="search m-r-2">
              <input
                type="text"
                className="input"
                placeholder="Search"
                value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
            <Button className="light-btn p-l-15 p-r-15">Bulk Action</Button>
          </Box>
        </Box>
        <Box className="alert-table">{this.renderTable()}</Box>
      </Box>
    );
  }
}

export default navigateRouter(AlertRules);
