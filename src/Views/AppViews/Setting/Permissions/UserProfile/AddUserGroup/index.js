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
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "assets/img/setting/default-icon.png";
import { v4 } from "uuid";
import { getCurrentUser, setActiveTab } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import {
  getUserPermissionData,
  addUserToGroups,
  getUserById,
} from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelGroupControlModal from "../../Components/CancelGroupControlModal";
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

class AddUserGroup extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedGroup: [],
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
        this.setStateOrReturnData();
      }
    }

    if (
      this.props.userToGroupsCreation.status !==
      prevProps.userToGroupsCreation.status
    ) {
      if (this.props.userToGroupsCreation.status === status.SUCCESS) {
        let data = this.props.userToGroupsCreation.data;
        if (data) {
          this.props.hideComponent();
          let id = this.getUserId();
          if (id) {
            this.props.getUserById(id);
          }
          ToastMessage.success("Added user to group successfully.");
        } else {
          ToastMessage.error("User to group creation failed!");
        }
      }
    }

    if (this.props.selectedGroup !== prevProps.selectedGroup) {
      let selectedGroup = this.props.selectedGroup;

      if (selectedGroup.length) {
        this.setState({
          selectedGroup: selectedGroup.map((group) => group.id),
        });
      }
    }
  };

  // Render table header
  renderTableHeader = () => {
    const { rows, selectedGroup } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell width={100}>
            <Checkbox
              size="small"
              className="check-box"
              disabled={rows?.length ? false : true}
              checked={
                rows?.length > 0 && rows?.length === selectedGroup?.length
              }
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />
            Group Name
          </TableCell>
          <TableCell width={200}>Attached Policies</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render table body
  renderTableBody = () => {
    const { rows, selectedGroup } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.map((row, index) => (
            <TableRow key={v4()}>
              <TableCell
                onClick={(e) => {
                  this.handleCheckBox({
                    target: {
                      id: row.id,
                      checked: !selectedGroup.includes(row.id),
                    },
                  });
                }}
              >
                <Checkbox
                  size="small"
                  className="check-box"
                  id={`${row.id}`}
                  checked={selectedGroup.includes(row.id)}
                  // onChange={(e) => {
                  //   this.handleCheckBox(e);
                  //   e.stopPropagation();
                  // }}
                />
                {row.name}
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
                      <Box className="d-inline-block default-Icon">
                        <img src={DefaultIcon} alt="" /> Default
                      </Box>
                    </HtmlTooltip>
                  </Box>
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell>
                {row.roles ? this.calculateAttachedPolicies(row.roles) : ""}
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

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedGroup } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedGroup.push(+id);
    } else {
      selectedGroup = selectedGroup.filter((value) => value !== +id);
    }
    this.setState({ selectedGroup });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedGroup } = this.state;

    let { checked } = event.target;
    let data = this.setStateOrReturnData(0);
    if (checked) {
      selectedGroup = data.map((value) => value.id);
    } else {
      selectedGroup = [];
    }
    this.setState({ selectedGroup });
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;
    let data = this.setStateOrReturnData(0);
    if (data?.length) {
      if (value) {
        rows = data.filter((group) => {
          if (group?.name.toLowerCase().includes(value.toLowerCase())) {
            return group;
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

  // Move to previous page
  handlePreviousPage = (tab, url) => {
    setActiveTab(tab);
    this.props.navigate(url);
  };

  getUserId = () => this.props.params.id;

  calculateAttachedPolicies = (data) => {
    if (data.length) {
      let policies = [];
      data.forEach((policy) => {
        policies = policies.concat(policy.policies);
      });
      return policies.length
        ? policies.length > 1
          ? "Multiple"
          : "Single"
        : "None";
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box
        sx={{ height: "100%" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        className="width-100"
      >
        <Loader sx={{ height: "100%" }} />
      </Box>
    );
  }

  setStateOrReturnData = (isSetState = 1) => {
    let userPermissionData = this.props.userPermissionData.data || [];

    if (userPermissionData) {
      if (isSetState) {
        this.setState({
          rows: userPermissionData.roleGroups,
          selectedGroup: this.props.selectedGroup.map((group) => group.id),
        });
      } else {
        return userPermissionData.roleGroups;
      }
    }
  };

  onClickAddUserGroups = () => {
    let { selectedGroup } = this.state;

    if (selectedGroup?.length) {
      this.props.addUserToGroups({
        userName: this.props.username,
        roleIds: selectedGroup.toString(),
      });
    } else {
      ToastMessage.error("Please select groups!");
    }
  };

  handleCancelUserControlModal = () => {
    let { showCancelUserControlModal } = this.state;

    this.setState({
      showCancelUserControlModal: !showCancelUserControlModal,
    });
  };
  render() {
    let { searchedKey, showCancelUserControlModal } = this.state;
    let { userPermissionData, userToGroupsCreation } = this.props;
    let userStatus = userPermissionData.status === status.IN_PROGRESS;
    let userToGroupsCreationStatus =
      userToGroupsCreation.status === status.IN_PROGRESS;
    return (
      <Box className="m-t-2">
        {userStatus ? (
          this.renderLoder()
        ) : (
          <>
            <Box className="setting-common-searchbar">
              <Grid container className="h-100" alignItems={"center"}>
                <Grid item xs={6}>
                  <Box className="top-search">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search groups here"
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
            <TableContainer component={Paper} className="access-control-table">
              <Table
                sx={{ minWidth: 800 }}
                aria-label="custom pagination table"
                className="table"
              >
                {this.renderTableHeader()}
                {this.renderTableBody()}
              </Table>
            </TableContainer>
            <Box className="overview-buttons d-flex justify-content-end  m-t-4">
              <List>
                <ListItem>
                  <Button
                    onClick={() => {
                      this.handleCancelUserControlModal();
                    }}
                    className="danger-outline-btn min-width-inherit m-r-2"
                    variant="outlined"
                  >
                    Cancel
                  </Button>

                  <LoadingButton
                    className="primary-btn min-width-inherit"
                    variant="contained"
                    onClick={this.onClickAddUserGroups}
                    disabled={userToGroupsCreationStatus}
                    loading={userToGroupsCreationStatus}
                  >
                    Add user to groups
                  </LoadingButton>
                </ListItem>
              </List>
            </Box>
          </>
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
            label={"Cancel the action now"}
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
  const { userPermissionData, userToGroupsCreation } = state.settings;
  return {
    userPermissionData,
    userToGroupsCreation,
  };
};

const mapDispatchToProps = {
  getUserPermissionData,
  addUserToGroups,
  getUserById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AddUserGroup));
