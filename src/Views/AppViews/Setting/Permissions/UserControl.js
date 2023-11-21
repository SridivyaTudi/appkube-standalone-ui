import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateUserControlModal from "./Components/CreateUserControlModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

class UserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          user: "Super Admin",
          emailAddress: "Carolina.Patzwahl81@gmal.com",
          loginDetails: "Never Login",
          groupName: "Super Admin",
          applications: "AppKube",
        },
        {
          user: "Mats Ertl I",
          emailAddress: "Juliane17@hotmail.com",
          loginDetails: "Never Login",
          groupName: "Finance Manager",
          applications: "AppKube",
        },
        {
          user: "Tayler Buschbaum",
          emailAddress: "Charlotta_Peters4@gmail.com",
          loginDetails: "Never Login",
          groupName: "Team Leads",
          applications: "AppKube",
        },
        {
          user: "Mikail Hooss",
          emailAddress: "Malte50@gmail.com",
          loginDetails: "Never Login",
          groupName: "Approvers",
          applications: "AppKube",
        },
        {
          user: "Irem Olbrich",
          emailAddress: "Anny.Bremer@gmail.com",
          loginDetails: "Never Login",
          groupName: "Fleet Manager",
          applications: "AppKube",
        },
        {
          user: "Karoline Kraft",
          emailAddress: "Anny.Bremer@gmail.com",
          loginDetails: "Never Login",
          groupName: "Fleet Manager",
          applications: "AppKube",
        },
        {
          user: "Arian Sauerland",
          emailAddress: "Anny.Bremer@gmail.com",
          loginDetails: "Never Login",
          groupName: "Fleet Manager",
          applications: "AppKube",
        },
        {
          user: "Prof. Dr. Till Neimke",
          emailAddress: "Aliya.Freimuth29@hotmail.com",
          loginDetails: "Never Login",
          groupName: "Fleet Manager",
          applications: "AppKube",
        },
      ],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
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

  render() {
    const { rows, pg, rpg, showCreateUserControlModal, actionButton } =
      this.state;
    return (
      <>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input type="text" className="input" placeholder="Search User" />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Button
            className="primary-btn min-width"
            onClick={this.handleCreateUserControlModal}
          >
            Invite User
          </Button>
        </Box>
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
            className="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Login Details</TableCell>
                <TableCell>Group Name</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.emailAddress}</TableCell>
                  <TableCell>{row.loginDetails}</TableCell>
                  <TableCell>
                    <Box className="group-name">{row.groupName}</Box>
                  </TableCell>
                  <TableCell>{row.applications}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      className="action-btn"
                      aria-label="morevertIcon"
                      size="small"
                      onClick={() => this.handleActionButton(index)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    {actionButton === index && (
                      <>
                        <Box className="action-buttons">
                          <Button
                            startIcon={
                              <DeleteOutlineOutlinedIcon className="icon" />
                            }
                            className="secondary-text-btn"
                          >
                            Delete User
                          </Button>
                          <Button
                            startIcon={<EditCalendarIcon className="icon" />}
                            className="secondary-text-btn"
                          >
                            Edit User
                          </Button>
                        </Box>
                        <Box
                          className="action-buttons-bg"
                          onClick={() => this.handleActionButton(index)}
                        ></Box>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        {showCreateUserControlModal ? (
          <CreateUserControlModal
            showModal={showCreateUserControlModal}
            handleCreateUserControlModal={this.handleCreateUserControlModal}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default UserControl;
