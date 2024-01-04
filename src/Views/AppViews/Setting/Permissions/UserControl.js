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
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateUserControlModal from "./Components/CreateUserControlModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { v4 } from "uuid";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { getFormattedDate, getCurrentUser } from "Utils";
import { deleteUser } from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
class UserControl extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      searchedKey: "",
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setUsersStateOrReturnData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userPermissionData?.status !==
      prevProps.userPermissionData?.status
    ) {
      if (this.props.userPermissionData.status === status.SUCCESS) {
        this.setUsersStateOrReturnData();
      }
    }

    if (this.props.removeUser.status !== prevProps.removeUser.status) {
      if (this.props.removeUser.status === status.SUCCESS) {
        let removeUserRes = this.props.removeUser.data;
        if (removeUserRes) {
          this.togglePopup();
          this.props.getUserPermissionData(this.user.username);
          ToastMessage.success("User Removed Successfully");
        } else {
          ToastMessage.error("User Deletion Failed!");
        }
      }
    }
  };

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

  //  Serach Users
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;
    let users = this.props.userPermissionData.data?.users || [];
    if (value) {
      rows = users.filter((userData) => {
        if (
          userData?.username?.toLowerCase().includes(value.toLowerCase()) ||
          userData?.email?.toLowerCase().includes(value.toLowerCase())
        ) {
          return userData;
        } else {
          return null;
        }
      });
    } else {
      rows = users;
    }

    this.setState({ rows, searchedKey: value });
  };

  // Render user search input and btn
  renderSearchInputAndBtn = () => {
    let { searchedKey } = this.state;
    return (
      <Box className="d-flex width-100 search-box">
        <Box className="search">
          <input
            type="text"
            className="input"
            placeholder="Search User"
            value={searchedKey}
            onChange={this.handleSearchChange}
          />
          <button className="button">
            <SearchOutlinedIcon />
          </button>
        </Box>
        <Button
          className="primary-btn min-width"
          onClick={this.handleCreateUserControlModal}
        >
          Create User
        </Button>
      </Box>
    );
  };

  // Render header of table
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell>Login Details</TableCell>
          <TableCell align="center">Groups</TableCell>
          <TableCell align="center">Created Date</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, actionButton } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={v4()}>
              <TableCell>
                <Link to={`/app/setting/user-profile/${row.id}`}>
                  {row.username}
                </Link>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Box className="d-block">
                  {row.loginCount ? (
                    <strong>Count : {row.loginCount} </strong>
                  ) : (
                    "Never Login "
                  )}
                </Box>
                <Box className="d-block">
                  {row.lastLoginAt ? (
                    <strong>Last : {getFormattedDate(row.lastLoginAt)}</strong>
                  ) : (
                    ""
                  )}
                </Box>
              </TableCell>
              <TableCell align="center">{row.roles?.length}</TableCell>
              <TableCell align="center">
                {getFormattedDate(row.createdAt)}
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
                        onClick={() => {
                          this.setState({
                            showConfirmPopup: true,
                            userId: row.id,
                          });
                        }}
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no users available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  // Render table container
  renderTableContainer = () => {
    const { status: userStatus } = this.props.userPermissionData;

    if (userStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 1000 }}
            aria-label="custom pagination table"
            className="table"
          >
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
      );
    }
  };

  // Render component of table pagination
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

  // Render component of Create User Modal
  renderComponentCreateUserModal = () => {
    const { showCreateUserControlModal } = this.state;
    return showCreateUserControlModal ? (
      <CreateUserControlModal
        showModal={showCreateUserControlModal}
        handleCreateUserControlModal={this.handleCreateUserControlModal}
      />
    ) : (
      <></>
    );
  };

  // Render component of Create User Modal
  renderComponentConfirmationModal = () => {
    const { showConfirmPopup } = this.state;
    let userStatus = this.props.removeUser?.status === status.IN_PROGRESS;
    return showConfirmPopup ? (
      <ConfirmationPopup
        showModal={showConfirmPopup}
        togglePopup={this.togglePopup}
        labels={{
          btnYes: "Delete",
          header: "Do you want to delete this User ? ",
          btnNo: "Cancel",
        }}
        icon={<i class="fas fa-trash-alt"></i>}
        handleCallBack={this.handleDeleteUser}
        showLoader={userStatus}
      />
    ) : (
      <></>
    );
  };

  // Set state or return data
  setUsersStateOrReturnData = (isStateSet = 1) => {
    let rows = this.props?.userPermissionData.data?.users || [];
    if (isStateSet) {
      this.setState({ rows });
    } else {
      return rows;
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  // Delete user API
  handleDeleteUser = () => {
    this.props.deleteUser(this.state.userId);
  };

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup, userId } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
      userId: showConfirmPopup ? 0 : userId,
      actionButton: false,
    });
  };
  render() {
    return (
      <>
        {this.renderSearchInputAndBtn()}
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
        {this.renderComponentCreateUserModal()}
        {this.renderComponentConfirmationModal()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { allUsers, userPermissionData, removeUser } = state.settings;
  return {
    allUsers,
    userPermissionData,
    removeUser,
  };
};

const mapDispatchToProps = { deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);
