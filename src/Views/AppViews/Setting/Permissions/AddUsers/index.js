import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Grid, List, ListItem, Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import { setActiveTab } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
let data = [
  {
    user: "Milena Kahles",
    emailAddress: "Carolina.Patzwahl81@gmal.cm",
    groups: "02",
    date: "03/01/2023",
    id: 1,
  },
  {
    user: "Natalie Clark",
    emailAddress: "mia.johnson@example.com",
    groups: "03",
    date: "03/01/2023",
    id: 2,
  },
  {
    user: "David Garcia",
    emailAddress: "sophia.brown@example.com",
    groups: "08",
    date: "03/01/2023",
    id: 3,
  },
  {
    user: "Olivia Martin",
    emailAddress: "sarah.lee@example.com",
    groups: "03",
    date: "03/01/2023",
    id: 4,
  },
  {
    user: "William Davis",
    emailAddress: "noah.thompson@example.com",
    groups: "02",
    date: "03/01/2023",
    id: 5,
  },
  {
    user: "Ella Lewis",
    emailAddress: "bob.johnson@example.com",
    groups: "00",
    date: "03/01/2023",
    id: 6,
  },
  {
    user: "David Garcia",
    emailAddress: "emma.davis@example.com",
    groups: "04",
    date: "03/01/2023",
    id: 7,
  },
  {
    user: "William Davis",
    emailAddress: "lucas.martinez@example.com",
    groups: "06",
    date: "03/01/2023",
    id: 8,
  },
];
class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: data,
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedUsers: [],
      searchedKey: "",
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
  // Move to previous page
  handlePreviousPage = (tab, url) => {
    setActiveTab(tab);
    this.props.navigate(url);
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
              className="check-box"
              size="small"
              disabled={rows?.length ? false : true}
              checked={rows?.length === selectedUsers?.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />{" "}
            User
          </TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell>Groups</TableCell>
          <TableCell>User Creation Date</TableCell>
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
                  className="check-box"
                  size="small"
                  id={row.id}
                  checked={selectedUsers.includes(row.id)}
                  onChange={this.handleCheckBox}
                />
                {row.user}
              </TableCell>
              <TableCell>{row.emailAddress}</TableCell>
              <TableCell>{row.groups}</TableCell>
              <TableCell>{row.date}</TableCell>
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

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;

    if (data?.length) {
      if (value) {
        rows = data.filter((user) => {
          if (user?.user.toLowerCase().includes(value.toLowerCase())) {
            return user;
          } else {
            return null;
          }
        });
      } else {
        rows = data;
      }
      this.setState({ rows, searchedKey: value });
    }
  };
  render() {
    let { searchedKey } = this.state;
    return (
      <Box className="add-users-container">
        <Box className="list-heading">
          <h3>Group Infra team Add users</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.handlePreviousPage("permissions/group", "/app/setting")
                }
              >
                <Link>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link to={`/app/setting/group-details`}>Super Admin Group</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Add users</li>
            </ul>
          </Box>
        </Box>
        <Box className="setting-common-searchbar">
          <h5>Add users to infra team</h5>
          <Grid container className="h-100" alignItems={"center"}>
            <Grid item xs={6}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search user"
                  value={searchedKey}
                  onChange={this.handleSearchChange}
                  autoFocus="autoFocus"
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <Button
                    className="danger-btn min-width-inherit"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </ListItem>
                <ListItem>
                  <Link to={`/app/setting/group-details`}>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                    >
                      Add users
                    </Button>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
      </Box>
    );
  }
}

export default navigateRouter(AddUsers);
