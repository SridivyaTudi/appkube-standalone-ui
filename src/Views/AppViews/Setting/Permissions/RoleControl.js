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
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateRoleControlModal from "./Components/CreateRoleControlModal";
import DefaultIcon from "../../../../assets/img/setting/default-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  deleteRole,
  getUserPermissionData,
} from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { ToastMessage } from "Toast/ToastMessage";
import { getCurrentUser } from "Utils";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";

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

class RoleControl extends Component {
  user = { username: "", email: "", profileImage: "" };
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      pg: 0,
      rpg: 10,
      showCreateRoleControlModal: false,
      actionButton: null,
      showConfirmPopup: false,
      roleId: 0,
      editRoleId: 0,
      searchedKey: "",
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setStateRoles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userPermissionData !== prevProps.userPermissionData) {
      this.setStateRoles();
    }

    if (this.props.removeRole.status !== prevProps.removeRole.status) {
      if (this.props.removeRole.status === status.SUCCESS) {
        let removeRoleRes = this.props.removeRole.data;
        if (removeRoleRes) {
          this.togglePopup();
          this.props.getUserPermissionData(this.user.username);
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
    this.setState({ rpg: parseInt(event.target.value, 10), pg: 0 });
  };

  handleCreateRoleControlModal = () => {
    this.setState({
      showCreateRoleControlModal: !this.state.showCreateRoleControlModal,
      editRoleId: 0,
      actionButton: null,
    });
  };

  handleActionButton = (index, anchorEl) => {
    this.setState({
      actionButton: index,
      anchorEl,
    });
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }
  // Render search role and btn
  renderSearchInputAndBtn = () => {
    const { searchedKey } = this.state;
    return (
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
    );
  };

  // render Roles Table
  renderTable = () => {
    const { status: rolesStatus } = this.props.userPermissionData;

    if (rolesStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <Table
          sx={{ minWidth: 800 }}
          aria-label="custom pagination table"
          className="table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Roles</TableCell>
              <TableCell>Role Description</TableCell>
              <TableCell>Preferences</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderRoles()}</TableBody>
        </Table>
      );
    }
  };

  renderDropDownData = (roleId) => {
    return [
      { label: " Delete Role", icon: "fas fa-trash-alt" },
      { label: " Edit Role", icon: "fas fa-edit" },
    ].map((data, index) => {
      return (
        <MenuItem
          key={index}
          onClick={() => {
            if (index) {
              this.setState({
                showCreateRoleControlModal: true,
                editRoleId: roleId,
              });
            } else {
              this.setState({
                showConfirmPopup: true,
                roleId,
              });
            }
          }}
        >
          <i className={data.icon} />
          {data.label}
        </MenuItem>
      );
    });
  };

  // render Roles data
  renderRoles = () => {
    const { roles, pg, rpg, actionButton } = this.state;

    if (roles?.length) {
      return roles.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            {row?.name}
            {row.default ? (
              <Box className="d-flex roles-box">
                <HtmlTooltip
                  className="table-tooltip-dark"
                  title={
                    <React.Fragment>
                      <span>This role created by default by the system</span>
                    </React.Fragment>
                  }
                >
                  <span className=" m-r-0">
                    <img src={DefaultIcon} alt="" /> Default
                  </span>
                </HtmlTooltip>
              </Box>
            ) : (
              <></>
            )}
          </TableCell>
          <TableCell>
            <Box className="role-description">
              <HtmlTooltip className="table-tooltip" title={row?.description}>
                {row?.description}
              </HtmlTooltip>
            </Box>
          </TableCell>
          <TableCell>
            <Link to={`${APP_PREFIX_PATH}/setting/role-details/${row.id}`}>
              View Policy
            </Link>
          </TableCell>
          <TableCell align="center">
            <IconButton
              className="action-btn"
              aria-label="morevertIcon"
              size="small"
              onClick={(e) => this.handleActionButton(row.id, e.currentTarget)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              className="common-list-menu"
              id={`basic-menu-${row.id}`}
              anchorEl={this.state.anchorEl}
              open={actionButton === row.id}
              onClose={() => this.handleActionButton(null, null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {this.renderDropDownData(row.id)}
            </Menu>
          </TableCell>
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell colSpan={12}>
            <Box className="d-blck text-center w-100 h-100 ">
              <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                <h5 className="m-t-0 m-b-0">
                  {this.props.userPermissionData.status === status.FAILURE
                    ? API_ERROR_MESSAGE
                    : NO_DATA_FOUND}
                </h5>
              </Box>
            </Box>
          </TableCell>
        </TableRow>
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
    let roles = this.props.userPermissionData.data?.roles;

    if (roles?.length) {
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
      this.setState({ roles, searchedKey: value });
    }
  };

  // Render component of table pagination
  renderComponentTablePagination = () => {
    const { roles, pg, rpg } = this.state;
    return roles.length ? (
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
    );
  };

  // Render component of Create User Modal
  renderOtherComponents = () => {
    const { showCreateRoleControlModal, showConfirmPopup, editRoleId } =
      this.state;
    let { status: deleteRoleStatus } = this.props.removeRole;
    return (
      <>
        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={this.togglePopup}
            labels={{
              btnYes: "Delete",
              header: "Do you want to delete this Role ? ",
              description: "This action can’t be undone",
              btnNo: "Cancel",
            }}
            icon={<i className="fas fa-trash-alt"></i>}
            handleCallBack={this.handleDeleteRole}
            showLoader={deleteRoleStatus === status.IN_PROGRESS}
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
      </>
    );
  };

  setStateRoles = () => {
    let roles = this.props.userPermissionData.data?.roles || [];
    if (roles.length) {
      this.setState({ roles });
    } else {
      this.setState({ roles: [] });
    }
  };

  render() {
    return (
      <>
        {this.renderSearchInputAndBtn()}
        <TableContainer component={Paper} className="access-control-table">
          {this.renderTable()}
        </TableContainer>
        {this.renderComponentTablePagination()}
        {this.renderOtherComponents()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { removeRole, userPermissionData } = state.settings;
  return {
    removeRole,
    userPermissionData,
  };
};

const mapDispatchToProps = {
  deleteRole,
  getUserPermissionData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleControl);
