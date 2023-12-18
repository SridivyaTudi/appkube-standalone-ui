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
import { getRoles, getUsers, createGroup } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { setActiveTab, getCurrentUser } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";

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
    padding: "4px 8px",
    fontSize: "11px",
  },
}));
const getCurrentUserInfo = () => {
  return getCurrentUser()
    ? getCurrentUser()?.info?.user
      ? getCurrentUser().info.user
      : { id: "", username: "", email: "", profileImage: "" }
    : { id: "", username: "", email: "", profileImage: "" };
};

let getFormattedDate = (dateString) => {
  try {
    let date = new Date(dateString);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelGroupControlModal: false,
      users: [],
      roles: [],
      pg: 0,
      rpg: 5,
      rolePG: 0,
      roleRPG: 5,
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
  }

  componentDidMount = () => {
    this.props.getRoles(getCurrentUserInfo().username);
    this.props.getUsers(getCurrentUserInfo().id);
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

    if (this.props.allUsers.status !== prevProps.allUsers.status) {
      if (this.props.allUsers.status === status.SUCCESS) {
        let users = this.props.allUsers.data;
        if (users?.length) {
          this.setState({ users });
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
    const { status: rolesStatus } = this.props.allRoles;
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
                  size="small" className="check-box"
                  disabled={roles?.length ? false : true}
                  checked={formData.roles.length === roles?.length}
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

    if (roles?.length) {
      return roles.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            <Checkbox
              size="small" className="check-box"
              id={`${row.id}`}
              checked={formData.roles.includes(row.id)}
              onChange={(e) => this.handleCheckBox(e, 1)}
            />
            {row.name}
            <Box className="d-flex roles-box">
              <HtmlTooltip
                className="table-tooltip d-flex"
                title={
                  <React.Fragment>
                    <span>This role created by default by the system</span>
                  </React.Fragment>
                }
              >
                <span>
                  <img src={DefaultIcon} alt="" className="m-r-1" /> Default
                </span>
              </HtmlTooltip>
            </Box>
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
                <h5 className="m-t-0 m-b-0">There are no roles available.</h5>
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
        createdBy: getCurrentUserInfo().username,
        roles: roles.map((value) => ({ id: value })),
        users: users.map((value) => ({ id: value })),
      };
      this.props.createGroup(params);
    }
  };

  // render User Table
  renderUserTable = () => {
    let { users, pg, rpg, formData } = this.state;
    const { status: usersStatus } = this.props.allUsers;
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
                <Checkbox className="check-box"
                  size="small"
                  id="all"
                  disabled={users?.length ? false : true}
                  checked={formData.users.length === users?.length}
                  onChange={(e) => this.handleSelectAllCheckBox(e)}
                />
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
          <TableBody>
            {users.length ? (
              users.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox className="check-box"
                      size="small"
                      id={`${row.id}`}
                      checked={formData.users.includes(row.id)}
                      onChange={(e) => this.handleCheckBox(e)}
                    />{" "}
                    {row.username}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.groups}</TableCell>
                  <TableCell>{getFormattedDate(row.createdAt)}</TableCell>
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
                      <h5 className="m-t-0 m-b-0">
                        There are no users available.
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
              placeholder="Search policy"
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
    let { allRoles, allUsers } = this.props;
    let data = isRole ? allRoles.data || [] : allUsers.data || [];
    let { users, roles, searchedUser, searchedRole } = this.state;

    if (data?.length) {
      if (value) {
        data = data.filter((row) => {
          let name = isRole ? row.name : row.username;
          if (name.toLowerCase().includes(value.toLowerCase())) {
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
    this.props.navigate("/app/setting");
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
          <h5>Add users to the group({formData?.users.length})</h5>
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
        {this.renderPaginationComponent(users.length, rpg, pg)}
        <Box className="setting-common-searchbar">
          <h5>Add Role ({formData?.roles.length})</h5>
          {this.renderSearchInput(1)}
        </Box>
        <TableContainer component={Paper} className="access-control-table">
          {this.renderRoleTable()}
        </TableContainer>
        {this.renderPaginationComponent(roles.length, roleRPG, rolePG, 1)}
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
  const { allRoles, allUsers, groupCreation } = state.settings;
  return {
    allRoles,
    allUsers,
    groupCreation,
  };
};

const mapDispatchToProps = {
  getRoles,
  getUsers,
  createGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(CreateGroup));
