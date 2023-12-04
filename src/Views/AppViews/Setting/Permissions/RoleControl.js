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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CreateRoleControlModal from "./Components/CreateRoleControlModal";
import DefaultIcon from "../../../../assets/img/setting/default-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { getRoles, deleteRole } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { ToastMessage } from "Toast/ToastMessage";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    color: "#ffffff",
    maxWidth: 250,

    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "8px 10px",
  },
}));

class RoleControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      pg: 0,
      rpg: 5,
      showCreateRoleControlModal: false,
      actionButton: null,
      showConfirmPopup: false,
      roleId: 0,
      editRoleId: 0,
      searchedKey: "",
    };
  }

  componentDidMount = () => {
    this.props.getRoles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allRoles.status !== prevProps.allRoles.status) {
      if (this.props.allRoles.status === status.SUCCESS) {
        let roles = this.props.allRoles.data;
        if (roles) {
          this.setState({ roles });
        }
      }
    }

    if (this.props.removeRole.status !== prevProps.removeRole.status) {
      if (this.props.removeRole.status === status.SUCCESS) {
        let removeRoleRes = this.props.removeRole.data;
        if (removeRoleRes) {
          this.togglePopup();
          ToastMessage.success("Role Removed Successfully");
        } else {
          ToastMessage.error("Role Deletion Failed!");
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

  handleCreateRoleControlModal = () => {
    this.setState({
      showCreateRoleControlModal: !this.state.showCreateRoleControlModal,
      editRoleId: 0,
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

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  // render Roles Table
  renderTable = () => {
    const { status: rolesStatus } = this.props.allRoles;

    if (rolesStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
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
          <TableBody>{this.renderRoles()}</TableBody>
        </Table>
      );
    }
  };

  // render Roles data
  renderRoles = () => {
    const { roles, pg, rpg, actionButton } = this.state;

    if (roles?.length) {
      return roles.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            {row?.name}
            <Box className="d-flex roles-box">
              <HtmlTooltip
                className="table-tooltip"
                title={
                  <React.Fragment>
                    <span>This role created by default by the system</span>
                  </React.Fragment>
                }
              >
                <span>
                  <img src={DefaultIcon} alt="" />
                </span>
                Default
              </HtmlTooltip>
            </Box>
          </TableCell>
          <TableCell>{row?.description}</TableCell>
          <TableCell>
            <Link to="/app/setting/setpolicy">View Policy</Link>
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
                    startIcon={<DeleteOutlineOutlinedIcon className="icon" />}
                    className="secondary-text-btn"
                    onClick={() => {
                      this.setState({
                        showConfirmPopup: true,
                        roleId: row.id,
                      });
                    }}
                  >
                    Delete Role
                  </Button>
                  <Button
                    startIcon={<EditCalendarIcon className="icon" />}
                    className="secondary-text-btn"
                    onClick={() => {
                      this.setState({
                        showCreateRoleControlModal: true,
                        editRoleId: row.id,
                      });
                    }}
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
      ));
    } else {
      return (
        <Box className="d-blck text-center w-100 h-100 ">
          <Box className="environment-loader align-item-center justify-center w-100 h-100 p-t-20 p-b-20 ">
            There are no roles available.
          </Box>
        </Box>
      );
    }
  };

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup, roleId } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
      roleId: showConfirmPopup ? 0 : roleId,
      actionButton: false,
    });
  };

  // Delete role
  handleDeleteRole = () => {
    let { roleId } = this.state;
    if (roleId) {
      this.props.deleteRole(roleId);
    }
  };
  //  serach Roles
  handleSearchChange = (e) => {
    let value = e.target.value;
    this.setState({ searchedKey: value });

    let roles = this.props.allRoles.data;

    if (value) {
      roles = roles.filter((role) => {
        if (
          role?.name.toLowerCase().includes(value.toLowerCase()) ||
          role?.description.toLowerCase().includes(value.toLowerCase())
        ) {
          return role;
        } else {
          return null;
        }
      });
    }

    this.setState({ roles });
  };
  render() {
    const {
      roles,
      pg,
      rpg,
      showCreateRoleControlModal,
      showConfirmPopup,
      editRoleId,
      searchedKey,
    } = this.state;
    let { status: deleteRoleStatus } = this.props.removeRole;
    return (
      <>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input
              type="text"
              className="input"
              placeholder="Search Role"
              value={searchedKey}
              onChange={this.handleSearchChange}
              autoFocus="autoFocus"
            />
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
          {this.renderTable()}
        </TableContainer>
        {roles.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={roles.length}
            rowsPerPage={rpg}
            page={pg}
            className="access-control-pagination"
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}

        {showCreateRoleControlModal ? (
          <CreateRoleControlModal
            showModal={showCreateRoleControlModal}
            handleCreateRoleControlModal={this.handleCreateRoleControlModal}
            roleId={editRoleId}
          />
        ) : (
          <></>
        )}

        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={this.togglePopup}
            labels={{
              btnYes: "Delete",
              description: "Do you want to delete this Role? ",
              btnNo: "Cancel",
            }}
            handleCallBack={this.handleDeleteRole}
            showLoader={deleteRoleStatus === status.IN_PROGRESS}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { allRoles, removeRole } = state.settings;
  return {
    allRoles,
    removeRole,
  };
};

const mapDispatchToProps = {
  getRoles,
  deleteRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleControl);
