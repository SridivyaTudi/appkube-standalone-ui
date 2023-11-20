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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CreateRoleControlModal from "./Components/CreateRoleControlModal";

class RoleControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Super Admin",
          content:
            "The super admin is the highest level of administrative authority within a system",
        },
      ],
      pg: 0,
      rpg: 5,
      showCreateRoleControlModal: false,
      actionButton: null,
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleCreateRoleControlModal = () => {
    this.setState({
      showCreateRoleControlModal: !this.state.showCreateRoleControlModal,
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
    const { rows, pg, rpg, showCreateRoleControlModal, actionButton } =
      this.state;
    return (
      <>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input type="text" className="input" placeholder="Search Role" />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Button
            className="primary-btn min-width"
            onClick={this.handleCreateRoleControlModal}
          >
            Create New Role
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
                <TableCell>Roles</TableCell>
                <TableCell>Role Description</TableCell>
                <TableCell>Preferences</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.content}</TableCell>
                  <TableCell>
                    <a href="/app/setpolicy">Set Transitions</a>
                  </TableCell>
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
                            Delete Role
                          </Button>
                          <Button
                            startIcon={<EditCalendarIcon className="icon" />}
                            className="secondary-text-btn"
                          >
                            Edit Role
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
        {showCreateRoleControlModal ? (
          <CreateRoleControlModal
            showModal={showCreateRoleControlModal}
            handleCreateRoleControlModal={this.handleCreateRoleControlModal}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default RoleControl;
