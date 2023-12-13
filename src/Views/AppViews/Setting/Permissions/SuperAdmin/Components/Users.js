import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from "@mui/material";
import { Component } from "react";
let data = [
  {
    user: "Milena Kahles",
    emailAddress: "Carolina.Patzwahl81@gmal.cm",
    groups: "02",
    id: 0,
  },
  {
    user: "Natalie Clark",
    emailAddress: "mia.johnson@example.com",
    groups: "03",
    id: 1,
  },
  {
    user: "David Garcia",
    emailAddress: "sophia.brown@example.com",
    groups: "08",
    id: 2,
  },
  {
    user: "Olivia Martin",
    emailAddress: "sarah.lee@example.com",
    groups: "03",
    id: 3,
  },
  {
    user: "William Davis",
    emailAddress: "noah.thompson@example.com",
    groups: "02",
    id: 4,
  },
  {
    user: "Ella Lewis",
    emailAddress: "bob.johnson@example.com",
    groups: "00",
    id: 5,
  },
  {
    user: "David Garcia",
    emailAddress: "emma.davis@example.com",
    groups: "04",
    id: 6,
  },
  {
    user: "William Davis",
    emailAddress: "lucas.martinez@example.com",
    groups: "06",
    id: 7,
  },
];
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: data,
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedUsers: [],
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
    const { rows, selectedUsers } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            {" "}
            <Checkbox
              size="small"
              disabled={rows?.length ? false : true}
              checked={rows?.length === selectedUsers?.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />{" "}
            User
          </TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell>Groups</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, selectedUsers } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                {" "}
                <Checkbox
                  size="small"
                  id={row.id}
                  checked={selectedUsers.includes(row.id)}
                  onChange={this.handleCheckBox}
                />{" "}
                {row.user}
              </TableCell>
              <TableCell>{row.emailAddress}</TableCell>
              <TableCell>{row.groups}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center"></TableCell>
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
          sx={{ minWidth: 500 }}
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
    let { selectedUsers } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedUsers.push(+id);
    } else {
      selectedUsers = selectedUsers.filter((value) => value !== +id);
    }

    this.setState({ selectedUsers });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedUsers } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedUsers = data.map((value) => value.id);
    } else {
      selectedUsers = [];
    }
    this.setState({ selectedUsers });
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

export default Users;
