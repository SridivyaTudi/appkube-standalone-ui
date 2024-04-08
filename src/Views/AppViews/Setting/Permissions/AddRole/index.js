import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Grid, Button } from "@mui/material";
import DefaultIcon from "assets/img/setting/default-icon.png";
import React, { Component } from "react";
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
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { setActiveTab, getCurrentUser } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import CancelGroupControlModal from "../Components/CancelGroupControlModal";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import { getUserPermissionData } from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

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
class AddRole extends Component {
  user = { username: "" };
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 10,
      showCreateUserControlModal: false,
      actionButton: null,
      showCancelRoleControlModal: false,
      searchedKey: "",
      selectedRoles: [],
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
        let userPermissionData = this.props.userPermissionData.data;
        if (userPermissionData) {
          let { roles } = userPermissionData;
          this.setState({ rows: roles });
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

  handlePreviousPage = () => {
    setActiveTab("permissions/group");
    this.props.navigate(`${APP_PREFIX_PATH}/setting`);
  };

  handleCancelRoleControlModal = () => {
    this.setState({
      showCancelRoleControlModal: !this.state.showCancelRoleControlModal,
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

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedRoles } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedRoles.push(+id);
    } else {
      selectedRoles = selectedRoles.filter((value) => value !== +id);
    }

    this.setState({ selectedRoles });
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;
    let data = this.props.userPermissionData.data?.roles || [];

    if (data?.length) {
      if (value) {
        rows = data.filter((user) => {
          if (user?.name?.toLowerCase().includes(value.toLowerCase())) {
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
  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedRoles, rows } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedRoles = rows.map((value) => value.id);
    } else {
      selectedRoles = [];
    }
    this.setState({ selectedRoles });
  };
  getGroupId = () => this.props.params.id;

  render() {
    const {
      rows,
      pg,
      rpg,
      showCancelRoleControlModal,
      searchedKey,
      selectedRoles,
    } = this.state;
    let userStatus =
      this.props.userPermissionData.status === status.IN_PROGRESS;
    return (
      <Box className="add-users-container">
        <Box className="setting-common-searchbar">
          {/* <h5>Add users to infra team</h5> */}
          <Grid container className="h-100" alignItems={"center"}>
            <Grid item xs={6}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search roles"
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
        {userStatus ? (
          this.renderLoder()
        ) : (
          <TableContainer component={Paper} className="access-control-table">
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
                      disabled={rows?.length ? false : true}
                      checked={
                        rows?.length > 0 &&
                        rows?.length === selectedRoles?.length
                      }
                      onChange={(e) => this.handleSelectAllCheckBox(e)}
                    />{" "}
                    Roles
                  </TableCell>

                  <TableCell>Role Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length ? (
                  rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          className="check-box"
                          size="small"
                          id={`${row.id}`}
                          checked={selectedRoles.includes(row.id)}
                          onChange={this.handleCheckBox}
                        />
                        <span
                          onClick={(e) => {
                            this.handleCheckBox({
                              target: {
                                id: row.id,
                                checked: !selectedRoles.includes(row.id),
                              },
                            });
                          }}
                        >
                          {row?.name}
                        </span>
                        {row.default ? (
                          <Box className="d-flex roles-box">
                            <HtmlTooltip
                              className="table-tooltip-dark"
                              title={
                                <React.Fragment>
                                  <span>
                                    This role created by default by the system
                                  </span>
                                </React.Fragment>
                              }
                            >
                              <span className=" m-r-0">
                                <img
                                  src={DefaultIcon}
                                  alt=""
                                  className="p-r-5"
                                />{" "}
                                Default
                              </span>
                            </HtmlTooltip>
                          </Box>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Box className="d-blck text-center w-100 h-100 ">
                        <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                          <h5 className="m-t-0 m-b-0">
                            There are no data available.
                          </h5>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {rows?.length ? (
          <>
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
            <Box className="d-flex justify-content-end m-t-1">
              <Link onClick={this.handleCancelRoleControlModal}>
                <Button
                  className="danger-btn min-width-inherit m-r-2"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Link>
              <Link onClick={this.props.hideComponent}>
                <Button
                  className="primary-btn min-width-inherit"
                  variant="contained"
                  onClick={() => setActiveTab("roles")}
                >
                  Add role
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <></>
        )}
        {showCancelRoleControlModal ? (
          <CancelGroupControlModal
            showModal={showCancelRoleControlModal}
            handleCancelGroupControlModal={(event, isClickOnContinueBtn) => {
              if (isClickOnContinueBtn) {
                try {
                  this.props.hideComponent();
                } catch (e) {
                  console.log(e);
                }
              }
              this.handleCancelRoleControlModal();
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
  const { userPermissionData } = state.settings;
  return {
    userPermissionData,
  };
};

const mapDispatchToProps = { getUserPermissionData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AddRole));
