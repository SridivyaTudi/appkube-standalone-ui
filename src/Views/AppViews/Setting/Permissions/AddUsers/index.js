import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Grid, Button } from "@mui/material";
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
import { setActiveTab, getCurrentUser, getFormattedDate } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import {
  getUserPermissionData,
  addUsersFromGroupDetails,
} from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import CancelGroupControlModal from "../Components/CancelGroupControlModal";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
class AddUsers extends Component {
  user = { id: "", username: "", email: "", profileImage: "" };
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 10,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedUsers: [],
      searchedKey: "",
      showCancelUserControlModal: false,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.props.getUserPermissionData(this.user.username);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userPermissionData.status !==
      prevProps.userPermissionData.status
    ) {
      if (this.props.userPermissionData.status === status.SUCCESS) {
        let rows = this.props.userPermissionData.data?.users || [];
        if (rows) {
          this.setState({ rows });
        }
      }
    }

    if (
      this.props.userCreationFromGroupDetails.status !==
      prevProps.userCreationFromGroupDetails.status
    ) {
      if (this.props.userCreationFromGroupDetails.status === status.SUCCESS) {
        let response = this.props.userCreationFromGroupDetails.data;
        if (response.type === "SUCCESS") {
          ToastMessage.success(
            response.message || "User's added to role group successfully."
          );
          this.props.hideComponent();
        } else {
          ToastMessage.error(
            response.message || "User can't add to role group."
          );
        }
      }
    }
  };

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10), pg: 0 });
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
            <Checkbox
              className="check-box"
              size="small"
              disabled={rows?.length ? false : true}
              checked={
                rows?.length > 0 && rows.length === selectedUsers?.length
              }
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />
            User
          </TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell align="center">Groups</TableCell>
          <TableCell align="center">User Creation Date</TableCell>
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
                <Checkbox
                  className="check-box"
                  size="small"
                  id={`${row.id}`}
                  checked={selectedUsers.includes(row.id)}
                  onChange={this.handleCheckBox}
                />
                <span
                  onClick={(e) => {
                    this.handleCheckBox({
                      target: {
                        id: row.id,
                        checked: !selectedUsers.includes(row.id),
                      },
                    });
                  }}
                >
                  {row.username}
                </span>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="center">{row.roles?.length}</TableCell>
              <TableCell align="center">
                {getFormattedDate(row.createdAt)}
              </TableCell>
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
    let { status: userStatus } = this.props.userPermissionData;
    if (userStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 800 }}
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
    let { selectedUsers, rows } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedUsers = rows.map((value) => value.id);
    } else {
      selectedUsers = [];
    }
    this.setState({ selectedUsers });
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;
    let data = this.props.userPermissionData.data?.users || [];

    if (data?.length) {
      if (value) {
        rows = data.filter((user) => {
          if (user?.username?.toLowerCase().includes(value.toLowerCase())) {
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

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  handleCancelUserControlModal = () => {
    this.setState({
      showCancelUserControlModal: !this.state.showCancelUserControlModal,
    });
  };

  getGroupId = () => this.props.params.id;

  onClickAddUsers = () => {
    let { selectedUsers } = this.state;

    if (selectedUsers?.length) {
      this.props.addUsersFromGroupDetails({
        roleId: +this.getGroupId(),
        userIds: selectedUsers.toString(),
      });
    } else {
      ToastMessage.error("Please select users!");
    }
  };

  render() {
    let { searchedKey, showCancelUserControlModal, rows } = this.state;
    let { userCreationFromGroupDetails } = this.props;
    let userToGroupsCreationStatus =
      userCreationFromGroupDetails.status === status.IN_PROGRESS;
    return (
      <Box className="add-users-container">
        <Box className="setting-common-searchbar">
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
          </Grid>
        </Box>
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
        {rows.length ? (
          <Box className="d-flex justify-content-end m-t-1">
            <Link onClick={this.handleCancelUserControlModal}>
              <Button
                className="danger-btn min-width-inherit m-r-2"
                variant="contained"
              >
                Cancel
              </Button>
            </Link>

            <LoadingButton
              className="primary-btn min-width-inherit"
              variant="contained"
              onClick={this.onClickAddUsers}
              disabled={userToGroupsCreationStatus}
              loading={userToGroupsCreationStatus}
            >
              Add users
            </LoadingButton>
          </Box>
        ) : (
          <></>
        )}
        {showCancelUserControlModal ? (
          <CancelGroupControlModal
            showModal={showCancelUserControlModal}
            handleCancelGroupControlModal={(event, isClickOnContinueBtn) => {
              if (isClickOnContinueBtn) {
                try {
                  this.props.hideComponent();
                } catch (e) {
                  console.log(e);
                }
              }
              this.handleCancelUserControlModal();
            }}
            isHandleCallBackOnContinueBtn={1}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userPermissionData, userCreationFromGroupDetails } = state.settings;
  return {
    userPermissionData,
    userCreationFromGroupDetails,
  };
};

const mapDispatchToProps = {
  getUserPermissionData,
  addUsersFromGroupDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AddUsers));
