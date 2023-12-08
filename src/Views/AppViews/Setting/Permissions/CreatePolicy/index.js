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

export class CreatePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelGroupControlModal: false,
      roles: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      searchedRole: "",
      formData: {
        name: "",
        description: "",
        roles: [],
      },
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
  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
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
    let { roles, formData } = this.state;
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
                  checked={
                    roles?.length && formData.roles.length === roles?.length
                  }
                  onChange={(e) => this.handleSelectAllCheckBox(e, 1)}
                />
                Permission Set
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
              id={row.id}
              checked={formData.roles.includes(row.id)}
              onChange={this.handleCheckBox}
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
                <img src={DefaultIcon} alt="" className="m-r-1" />
                Default
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

  // Search  Roles Inputs
  renderSearchInput = () => {
    let { searchedRole } = this.state;
    return (
      <Grid container className="h-100" alignItems={"center"}>
        <Grid item xs={6}>
          <Box className="top-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search Permission here"
              value={searchedRole}
              onChange={(e) => this.handleSearchChange(e)}
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </Grid>
      </Grid>
    );
  };

  //  Serach role
  handleSearchChange = (e) => {
    let value = e.target.value;
    let data = this.props.allRoles.data || [];
    let { roles, searchedRole } = this.state;

    if (data?.length) {
      searchedRole = value;

      if (value) {
        roles = data.filter((row) => {
          if (row?.name.toLowerCase().includes(value.toLowerCase())) {
            return row;
          } else {
            return null;
          }
        });
      } else {
        roles = data;
      }

      this.setState({ roles, searchedRole });
    }
  };

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { name, description } = this.state.formData;
    const errors = {
      name: "",
      description: "",
      roles: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!name) {
        errors.name = "Policy Name is required!";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!description) {
        errors.description = "Policy Description is required!";
        isValid = false;
      } else {
        errors.description = "";
      }
    }
    return { isValid, errors };
  };

  // Call API create policy
  handlePolicySubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);
    let { roles } = this.state.formData;

    if (isValid) {
      if (!roles.length) {
        ToastMessage.error("Please select role!");
        return 0;
      }
      this.handlePreviousPage();
    }
  };

  // Move to previous page
  handlePreviousPage = () => {
    setActiveTab("permissions/policies");
    this.props.navigate("/app/setting");
  };

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  // Render Other components
  renderOtherComponents = () => {
    const { roles, pg, rpg, showCancelGroupControlModal } = this.state;
    return (
      <>
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
        {showCancelGroupControlModal ? (
          <CancelGroupControlModal
            showModal={showCancelGroupControlModal}
            handleCancelGroupControlModal={this.handleCancelGroupControlModal}
            previousTab={"permissions/policies"}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { formData } = this.state;
    let data = formData["roles"];
    let { id, checked } = event.target;

    if (checked) {
      data.push(+id);
      formData["roles"] = data;
    } else {
      formData["roles"] = data.filter((value) => value !== +id);
    }

    this.setState({ formData });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { roles, formData } = this.state;

    let { checked } = event.target;

    if (checked) {
      formData["roles"] = roles.map((value) => value.id);
    } else {
      formData["roles"] = [];
    }

    this.setState({ formData });
  };

  render() {
    const { isSubmit, formData } = this.state;
    let { name, description } = formData;
    const { errors } = this.validateForm(isSubmit);
    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Create policy</h3>
          <Box className="breadcrumbs">
            <ul>
              <li onClick={this.handlePreviousPage}>
                <Link>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Create policy</li>
            </ul>
          </Box>
        </Box>
        <Box className="setting-common-searchbar">
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
              <h4 className="m-t-0 m-b-0">Name of the policy</h4>
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
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    <Link onClick={this.handlePolicySubmit}>Create policy</Link>
                  </Button>
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
                  policy Name
                </label>
                <span className="D-block">
                  Enter a meaningful name to identify this policy.
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="name"
                  placeholder="Src-core"
                  value={name}
                  onChange={this.handleInputChange}
                  autoFocus={"autoFocus"}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handlePolicySubmit(e) : <></>
                  }
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
                  policy Description
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
                    e.key === "Enter" ? this.handlePolicySubmit(e) : <></>
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
          <h5>Add Permissions to the Policy(68)</h5>
          {this.renderSearchInput()}
        </Box>
        <TableContainer component={Paper} className="access-control-table">
          {errors.roles ? (
            <span style={{ color: "red" }}>{errors.roles}</span>
          ) : (
            <></>
          )}
          {this.renderRoleTable()}
        </TableContainer>
        {this.renderOtherComponents()}
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
)(navigateRouter(CreatePolicy));
