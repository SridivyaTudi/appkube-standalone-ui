import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "../../../../../assets/img/setting/default-icon.png";
import CancelGroupControlModal from "../Components/CancelGroupControlModal";
import {
  getUserPermissionData,
  createGroup,
} from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { setActiveTab, getCurrentUser, getFormattedDate } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
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
export class CreateGroup extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      showCancelGroupControlModal: false,
      users: [],
      roles: [],
      pg: 0,
      rpg: 10,
      rolePG: 0,
      roleRPG: 10,
      showCreateUserControlModal: false,
      actionButton: null,
      formData: {
        name: "",
        description: "",
        users: [],
        roles: [],
      },
      searchedUser: "",
      searchedRole: "",
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
        if (this.props.userPermissionData?.data) {
          let { roles, users } = this.props.userPermissionData?.data;
          this.setState({ roles, users });
        }
      }
    }

    if (this.props.groupCreation.status !== prevProps.groupCreation.status) {
      if (this.props.groupCreation.status === status.SUCCESS) {
        if (this.props.groupCreation.data) {
          ToastMessage.success(` Group Created Successfully`);
          this.handlePreviousPage();
        } else {
          ToastMessage.error(`Group Creation Failed!`);
        }
      }
    }
  };

  handleChangePage = (event, newpage, isRole) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event, isRole) => {
    this.setState({
      [`${isRole ? "roleRPG" : "rpg"}`]: parseInt(event.target.value, 10),
      [`${isRole ? "rolePG" : "pg"}`]: 0,
    });
  };

  handleCancelGroupControlModal = () => {
    this.setState({
      showCancelGroupControlModal: !this.state.showCancelGroupControlModal,
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
  renderRoleTable = () => {
    const { status: rolesStatus } = this.props.userPermissionData;
    const { roles, formData } = this.state;

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
              <TableCell>
                <Checkbox
                  size="small"
                  className="check-box"
                  disabled={roles?.length ? false : true}
                  checked={
                    roles?.length > 0 && formData.roles.length === roles.length
                  }
                  onChange={(e) => this.handleSelectAllCheckBox(e, 1)}
                />
                Role Name
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderRoles()}</TableBody>
        </Table>
      );
    }
  };

  // render Roles data
  renderRoles = () => {
    const { roles, pg, rpg, formData } = this.state;
    const { status: rolesStatus } = this.props.userPermissionData;
    if (roles?.length) {
      return roles.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            <Checkbox
              size="small"
              className="check-box"
              id={`${row.id}`}
              checked={formData.roles.includes(row.id)}
              onChange={(e) => this.handleCheckBox(e, 1)}
            />
            {row.name}
            {row.default ? (
              <Box className="d-flex roles-box">
                <HtmlTooltip
                  className="table-tooltip-dark d-flex"
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
          <TableCell>{row.description}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell colSpan={12}>
            <Box className="d-blck text-center w-100 h-100 ">
              <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                <h5 className="m-t-0 m-b-0">
                  {rolesStatus === status.FAILURE
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

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { name, description } = this.state.formData;
    const errors = {
      name: "",
      description: "",
      roles: "",
      users: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!name) {
        errors.name = "Group Name is required!";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!description) {
        errors.description = "Group Description is required!";
        isValid = false;
      } else if (description.length > 255) {
        errors.description =
          "Group Description should be a maximum of 255 characters.";
        isValid = false;
      } else {
        errors.description = "";
      }
    }
    return { isValid, errors };
  };

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  // Call API create group
  handleGroupSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);
    const { users, roles, name, description } = this.state.formData;

    if (isValid) {
      if (!users.length) {
        ToastMessage.error("Please select user!");
        return 0;
      }

      if (!roles.length) {
        ToastMessage.error("Please select role!");
        return 0;
      }
      let params = {
        name,
        description,
        grp: true,
        createdBy: this.user.username,
        roles: roles.map((value) => ({ id: value })),
        users: users.map((value) => ({ id: value })),
      };
      this.props.createGroup(params);
    }
  };

  // render User Table
  renderUserTable = () => {
    let { users, pg, rpg, formData } = this.state;
    const { status: usersStatus } = this.props.userPermissionData;
    if (usersStatus === status.IN_PROGRESS) {
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
              <TableCell>
                <Checkbox
                  className="check-box"
                  size="small"
                  id="all"
                  disabled={users?.length ? false : true}
                  checked={
                    users?.length > 0 && formData.users.length === users?.length
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
          <TableBody>
            {users?.length ? (
              users.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      className="check-box"
                      size="small"
                      id={`${row.id}`}
                      checked={formData.users.includes(row.id)}
                      onChange={(e) => this.handleCheckBox(e)}
                    />{" "}
                    {row.username}
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
                      <h5 className="m-t-0 m-b-0">
                        {usersStatus === status.FAILURE
                          ? API_ERROR_MESSAGE
                          : NO_DATA_FOUND}
                      </h5>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  };

  // render Pagination component
  renderPaginationComponent = (dataLength, rowPerPage, page, isRole = 0) => {
    return dataLength ? (
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={dataLength}
        rowsPerPage={rowPerPage}
        page={page}
        className="access-control-pagination"
        onPageChange={(event, newpage) =>
          this.handleChangePage(event, newpage, isRole)
        }
        onRowsPerPageChange={(event) =>
          this.handleChangeRowsPerPage(event, isRole)
        }
      />
    ) : (
      <></>
    );
  };

  // Render search input for role or user
  renderSearchInput = (isRole = 0) => {
    let { searchedUser, searchedRole } = this.state;
    return (
      <Grid
        container
        className="h-100"
        alignItems={"center"}
        columns={{ xs: 4, md: 12 }}
      >
        <Grid item xs={6}>
          <Box className="top-search">
            <input
              type="text"
              className="form-control"
              placeholder={`Search ${isRole ? "Roles" : "Users"}`}
              value={isRole ? searchedRole : searchedUser}
              onChange={(e) => this.handleSearchChange(e, isRole)}
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </Grid>
      </Grid>
    );
  };

  //  serach role and user
  handleSearchChange = (e, isRole) => {
    let value = e.target.value;
    let { roles: rolesData, users: userData } =
      this.props.userPermissionData.data;
    let data = isRole ? rolesData || [] : userData || [];
    let { users, roles, searchedUser, searchedRole } = this.state;

    if (data?.length) {
      if (value) {
        data = data.filter((row) => {
          let name = isRole ? row.name : row.username;
          if (name?.toLowerCase().includes(value.toLowerCase())) {
            return row;
          } else {
            return null;
          }
        });
      }

      if (isRole) {
        roles = data;
        searchedRole = value;
      } else {
        users = data;
        searchedUser = value;
      }

      this.setState({ users, roles, searchedRole, searchedUser });
    }
  };

  // Handle check box
  handleCheckBox = (event, isRole = 0) => {
    let { formData } = this.state;
    let data = formData[isRole ? "roles" : "users"];
    let { id, checked } = event.target;

    if (checked) {
      data.push(+id);
      formData[isRole ? "roles" : "users"] = data;
    } else {
      formData[isRole ? "roles" : "users"] = data.filter(
        (value) => value !== +id
      );
    }

    this.setState({ formData });
  };

  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { roles, users, formData } = this.state;

    let data = isRole ? roles : users;
    let { checked } = event.target;
    let key = isRole ? "roles" : "users";

    if (checked) {
      formData[key] = data.map((value) => value.id);
    } else {
      formData[key] = [];
    }

    this.setState({ formData });
  };

  // Move to previous page
  handlePreviousPage = () => {
    setActiveTab("permissions/group");
    this.props.navigate(`${APP_PREFIX_PATH}/setting`);
  };
  render() {
    const {
      users,
      roles,
      pg,
      rpg,
      showCancelGroupControlModal,
      isSubmit,
      formData,
      roleRPG,
      rolePG,
    } = this.state;
    let { name, description } = formData;
    let groupCreationStatus =
      this.props.groupCreation?.status === status.IN_PROGRESS;
    const { errors } = this.validateForm(isSubmit);
    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Create Group</h3>
          <Box className="breadcrumbs">
            <ul>
              <li onClick={this.handlePreviousPage}>
                <Link>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Create Group</li>
            </ul>
          </Box>
        </Box>
        <Box className="setting-common-searchbar">
          <Grid
            container
            alignItems={"center"}
            columns={{ xs: 4, sm: 12, md: 12 }}
          >
            <Grid item xs={6}>
              <h4 className="m-t-0 m-b-0">Name of the group</h4>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <Button
                    onClick={this.handleCancelGroupControlModal}
                    className="danger-outline-btn min-width-inherit"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </ListItem>
                <ListItem>
                  <LoadingButton
                    className="primary-btn min-width-inherit"
                    variant="contained"
                    disabled={groupCreationStatus}
                    loading={groupCreationStatus}
                    onClick={this.handleGroupSubmit}
                  >
                    Create Group
                  </LoadingButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        <Box className="grop-description-section">
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, md: 12 }}
          >
            <Grid item xs={6}>
              <Box className="form-group">
                <label htmlFor="roleName" className="form-label d-block">
                  Group Name
                </label>
                <span className="D-block">
                  Enter a meaningful name to identify this group.
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="name"
                  placeholder="Infra Team"
                  value={name}
                  onChange={this.handleInputChange}
                  autoFocus={"autoFocus"}
                />
                {errors.name ? (
                  <span style={{ color: "red" }}>{errors.name}</span>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="form-group">
                <label htmlFor="roleDescription" className="form-label d-block">
                  Group Description
                </label>

                <textarea
                  type="text"
                  className="form-control"
                  id="roleDescription"
                  name="description"
                  style={{
                    maxWidth: "100%",
                    height: "60px",
                    lineHeight: "18px",
                    paddingRight: "15px",
                  }}
                  maxlength="255"
                  placeholder="pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia "
                  value={description}
                  onChange={this.handleInputChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handleGroupSubmit(e) : <></>
                  }
                />
                {errors.description ? (
                  <span style={{ color: "red" }}>{errors.description}</span>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="setting-common-searchbar">
          <h5>Add users to the group({formData?.users?.length})</h5>
          {this.renderSearchInput()}
        </Box>
        <TableContainer component={Paper} className="access-control-table">
          {errors.users ? (
            <span style={{ color: "red" }}>{errors.users}</span>
          ) : (
            <></>
          )}
          {this.renderUserTable()}
        </TableContainer>
        {this.renderPaginationComponent(users?.length, rpg, pg)}
        <Box className="setting-common-searchbar">
          <h5>Add Role ({formData?.roles?.length})</h5>
          {this.renderSearchInput(1)}
        </Box>
        <TableContainer component={Paper} className="access-control-table">
          {this.renderRoleTable()}
        </TableContainer>
        {this.renderPaginationComponent(
          roles?.length || [],
          roleRPG,
          rolePG,
          1
        )}
        {showCancelGroupControlModal ? (
          <CancelGroupControlModal
            showModal={showCancelGroupControlModal}
            handleCancelGroupControlModal={this.handleCancelGroupControlModal}
            previousTab={"permissions/group"}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userPermissionData, groupCreation } = state.settings;
  return {
    userPermissionData,
    groupCreation,
  };
};

const mapDispatchToProps = {
  getUserPermissionData,
  createGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(CreateGroup));
