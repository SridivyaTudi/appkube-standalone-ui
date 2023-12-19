import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { Component } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "assets/img/setting/default-icon.png";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(11),
  },
}));
let data = [
  {
    user: "Senior Leadership",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 1,
  },
  {
    user: "Administrator",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 2,
  },
  {
    user: "Tech user",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 3,
  },
  {
    user: "DevSecOps",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 3,
  },
  {
    user: "System Engineer",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 4,
  },
  {
    user: "Architect Designer",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 5,
  },
  {
    user: "Product Manager",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 6,
  },
  {
    user: "Tester",
    Description:
      "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
    id: 6,
  },
];
class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: data,
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedRoles: [],
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleCreateUserControlModal = () => {
    this.setState({
      showCreateUserControlModal: !this.state.showCreateUserControlModal,
    });
  };

  handleActionButton = (index) => {
    const { actionButton } = this.state;
    if (actionButton === null) {
      this.setState({
        actionButton: index,
      });
    } else {
      this.setState({
        actionButton: null,
      });
    }
  };

  // Render header of table
  renderTableHead = () => {
    const { rows, selectedRoles } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            {" "}
            <Checkbox
              size="small" className="check-box"
              disabled={rows?.length ? false : true}
              checked={rows?.length === selectedRoles?.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />{" "}
            Role Name
          </TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, selectedRoles } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  size="small" className="check-box"
                  id={`${row.id}`}
                  checked={selectedRoles.includes(row.id)}
                  onChange={this.handleCheckBox}
                />{" "}
                {row.user}{" "}
                <Box className="d-flex roles-box">
                  <HtmlTooltip
                    className="table-tooltip-dark"
                    title={
                      <React.Fragment>
                        <span>This role created by default by the system</span>
                      </React.Fragment>
                    }
                  >
                    <span>
                      <img src={DefaultIcon} alt="" /> Default
                    </span>
                   
                  </HtmlTooltip>
                </Box>
              </TableCell>
              <TableCell>{row.Description}</TableCell>
            </TableRow>
          ))
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

  renderComponentTablePagination = () => {
    const { rows, pg, rpg } = this.state;
    return rows?.length ? (
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rpg}
        page={pg}
        className="access-control-pagination"
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
      />
    ) : (
      <></>
    );
  };

  // Render table container
  renderTableContainer = () => {
    return (
      <TableContainer component={Paper} className="access-control-table">
        <Table
          sx={{ minWidth: 900 }}
          aria-label="custom pagination table"
          className="table"
        >
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedRoles } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedRoles.push(+id);
    } else {
      selectedRoles = selectedRoles.filter((value) => value !== +id);
    }

    this.setState({ selectedRoles });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedRoles } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedRoles = data.map((value) => value.id);
    } else {
      selectedRoles = [];
    }
    this.setState({ selectedRoles });
  };
  render() {
    return (
      <>
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
      </>
    );
  }
}

export default Roles;
