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
import { getRoles } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { setActiveTab } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
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
let users = [
  {
    id: 1,
    name: "Milena Kahles",
    emailAddress: "Carolina.Patzwahl81@gmal.cm",
    groups: "02",
    date: "03/01/2023",
  },
  {
    id: 2,
    name: "Natalie Clark",
    emailAddress: "mia.johnson@example.com",
    groups: "03",
    date: "03/01/2023",
  },
  {
    id: 3,
    name: "David Garcia",
    emailAddress: "sophia.brown@example.com",
    groups: "08",
    date: "03/01/2023",
  },
  {
    id: 4,
    name: "Olivia Martin",
    emailAddress: "sarah.lee@example.com",
    groups: "03",
    date: "03/01/2023",
  },
  {
    id: 5,
    name: "William Davis",
    emailAddress: "noah.thompson@example.com",
    groups: "02",
    date: "03/01/2023",
  },
  {
    id: 6,
    name: "Ella Lewis",
    emailAddress: "bob.johnson@example.com",
    groups: "00",
    date: "03/01/2023",
  },
  {
    id: 7,
    name: "David Garcia",
    emailAddress: "emma.davis@example.com",
    groups: "04",
    date: "03/01/2023",
  },
  {
    id: 8,
    name: "William Davis",
    emailAddress: "lucas.martinez@example.com",
    groups: "06",
    date: "03/01/2023",
  },
];
export class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelGroupControlModal: false,
      userrow: users,
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
          sx={{ minWidth: 500 }}
          aria-label="custom pagination table"
          className="table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  size="small"
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
              size="small"
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
                <React.Fragment>
                  <img src={DefaultIcon} alt="" className="m-r-1" />
                  <span>Default</span>
                </React.Fragment>
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
    const { users, roles } = this.state.formData;

    if (isValid) {
      if (!users.length) {
        ToastMessage.error("Please select user!");
        return 0;
      }

      if (!roles.length) {
        ToastMessage.error("Please select role!");
        return 0;
      }
      this.handlePreviousPage();
    }
  };

  // render User Table
  renderUserTable = () => {
    let { userrow, pg, rpg, formData } = this.state;

    return (
      <Table
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
        className="table"
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                size="small"
                id="all"
                disabled={userrow?.length ? false : true}
                checked={formData.users.length === userrow?.length}
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
          {userrow.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  size="small"
                  id={`${row.id}`}
                  checked={formData.users.includes(row.id)}
                  onChange={(e) => this.handleCheckBox(e)}
                />{" "}
                {row.name}
              </TableCell>
              <TableCell>{row.emailAddress}</TableCell>
              <TableCell>{row.groups}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
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
      <Grid container className="h-100" alignItems={"center"}>
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
    let data = isRole ? [] : users;
    let { userrow, roles, searchedUser, searchedRole } = this.state;

    if (data?.length) {
      if (value) {
        data = data.filter((row) => {
          if (row?.name.toLowerCase().includes(value.toLowerCase())) {
            return row;
          } else {
            return null;
          }
        });
      } else {
        data = isRole ? [] : users;
      }

      if (isRole) {
        roles = data;
        searchedRole = value;
      } else {
        userrow = data;
        searchedUser = value;
      }

      this.setState({ userrow, roles, searchedRole, searchedUser });
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
    let { roles, userrow, formData } = this.state;

    let data = isRole ? roles : userrow;
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
      userrow,
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
          <Grid container alignItems={"center"}>
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
                  <Link onClick={this.handleGroupSubmit}>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                    >
                      Create Group
                    </Button>
                  </Link>
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
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
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
          <h5>Add users to the group(324)</h5>
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
        {this.renderPaginationComponent(userrow.length, rpg, pg)}
        <Box className="setting-common-searchbar">
          <h5>Add Role (10)</h5>
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
  const { allRoles } = state.settings;
  return {
    allRoles,
  };
};

const mapDispatchToProps = {
  getRoles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(CreateGroup));
