import { Box, Grid, List, ListItem, Button } from "@mui/material";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import UserImage from "assets/img/setting/user-image.png";
import Permission from "./Components/Permission";
import Group from "./Components/Group";
import SecurityCredentials from "./Components/SecurityCredentials";
import TabsMenu from "Views/AppViews/Environments/EnvironmentList/TabsMenu";
import ChangePasswordModal from "Views/AppViews/Setting/Account/Components/ChangePasswordModal";
import { v4 } from "uuid";
import avatar from "assets/img/avatar.png";
import {
  getActiveTab,
  deleteActiveTab,
  setActiveTab,
  getFormattedDate,
} from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { getUserById, deleteUser } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { ToastMessage } from "Toast/ToastMessage";
import AddUserGroup from "./AddUserGroup";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

let HEADER = {
  0: "Assign Permission",
  1: "Assign Groups",
  2: "Security Credentials",
};

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      showChangePasswordModal: false,
      userDetails: {},
      selectedGroup: [],
      showAddUserToGroupComponent: false,
    };
  }
  tabMapping = [
    {
      name: "Permission",
      key: "permission",
    },
    {
      name: "Group",
      key: "group",
    },
    {
      name: "Security Credentials",
      key: "securityCredentials",
    },
  ];

  componentDidMount = () => {
    this.setPreviousTab();
    let id = this.getUserId();
    if (id) {
      this.props.getUserById(id);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userDetailsById.status !== prevProps.userDetailsById.status
    ) {
      if (this.props.userDetailsById.status === status.SUCCESS) {
        let userDetails = this.props.userDetailsById.data;
        if (userDetails) {
          this.setState({ userDetails });
        }
      }
    }

    if (this.props.removeUser.status !== prevProps.removeUser.status) {
      if (this.props.removeUser.status === status.SUCCESS) {
        let removeUserRes = this.props.removeUser.data;
        if (removeUserRes) {
          this.togglePopup();
          setActiveTab("permissions/user");
          this.props.navigate(`${APP_PREFIX_PATH}/setting`);
          ToastMessage.success("User being successfully disabled.");
        } else {
          ToastMessage.error(removeUserRes?.message || "User Disable action Failed!");
        }
      }
    }
  };
  setActiveTab = (activeTab) => {
    this.setState({ activeTab, selectedGroup: [] });
  };

  handleChangePasswordModal = () => {
    this.setState({
      showChangePasswordModal: !this.state.showChangePasswordModal,
    });
  };

  setPreviousTab = () => {
    let currentTab = getActiveTab();
    if (currentTab) {
      for (let tab = 0; tab < this.tabMapping.length; tab++) {
        const element = this.tabMapping[tab];
        if (currentTab.includes(element.key)) {
          this.setActiveTab(tab);
          deleteActiveTab();
          break;
        }
      }
    }
  };

  // Move to previous page
  handlePreviousPage = (tab, url) => {
    setActiveTab(tab);
    this.props.navigate(url);
  };

  getUserId = () => this.props.params.id;

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
    });
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
  // Delete user API
  handleDeleteUser = () => {
    let id = this.getUserId();
    if (id) {
      this.props.deleteUser(id);
    }
  };
  render() {
    const {
      activeTab,
      showChangePasswordModal,
      userDetails,
      selectedGroup,
      showConfirmPopup,
      showAddUserToGroupComponent,
    } = this.state;
    let userStatus = this.props.userDetailsById?.status === status.IN_PROGRESS;
    let userDeleteStatus = this.props.removeUser?.status === status.IN_PROGRESS;
    return (
      <Box className="user-profile-container">
        {userStatus ? (
          <Box sx={{ height: 550 }}>{this.renderLoder()}</Box>
        ) : (
          <>
            <Box className="list-heading">
              <h3>{userDetails.username || "-"}</h3>
              <Box className="breadcrumbs">
                <ul>
                  <li
                    onClick={() =>
                      this.handlePreviousPage(
                        "permissions/user",
                        "/app/setting"
                      )
                    }
                  >
                    <Link>Users and Permissions</Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">User Profile</li>
                </ul>
              </Box>
            </Box>
            <Box className="setting-common-searchbar">
              <Grid container alignItems={"center"}>
                <Grid item xs={6}>
                  <h4>{userDetails.username || "-"}</h4>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    <ListItem>
                      <Button
                        className="danger-btn min-width-inherit"
                        variant="contained"
                        onClick={() => {
                          this.setState({ showConfirmPopup: true });
                        }}
                      >
                        Disable user
                      </Button>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
            <Box className="user-profile-details">
              <Box className="d-flex align-items-center">
                <Box className="user-image m-r-2">
                  <img
                    src={
                      userDetails.profileImage
                        ? userDetails.profileImage
                        : avatar
                    }
                    alt=""
                  />
                </Box>
                <label>{userDetails.username || "-"}</label>
              </Box>
              <Box className="d-block">
                <List>
                  <ListItem>
                    <span>Created Date and Time</span>
                    <strong>
                      {" "}
                      {userDetails.createdAt
                        ? getFormattedDate(userDetails.createdAt)
                        : "-"}
                    </strong>
                  </ListItem>
                  <ListItem>
                    <span>Last Activity</span>
                    <strong>
                      <Box className="green d-block">
                        {userDetails.lastLoginAt
                          ? getFormattedDate(userDetails.lastLoginAt)
                          : "-"}
                      </Box>
                    </strong>
                  </ListItem>
                  <ListItem>
                    <span>Application Access</span>
                    <strong>
                      {" "}
                      {userDetails.isMfaEnable ? "Enabled with MFA" : "-"}
                    </strong>
                  </ListItem>
                </List>
              </Box>
            </Box>
            {showAddUserToGroupComponent ? (
              <AddUserGroup
                hideComponent={() =>
                  this.setState({ showAddUserToGroupComponent: false })
                }
                selectedGroup={userDetails.roles || []}
                username={userDetails.username}
              />
            ) : (
              <Box className="services-panel-tabs ">
                <Box className="tabs-head ">
                  <Grid container alignItems={"center"} rowSpacing={0}>
                    <Grid item xl={3} lg={3} md={2} sm={4} xs={4}>
                      <h4>{HEADER[activeTab]}</h4>
                    </Grid>
                    <Grid
                      item
                      xl={6}
                      lg={6}
                      md={7}
                      sm={4}
                      xs={4}
                      className="text-center"
                    >
                      <TabsMenu
                        tabs={this.tabMapping}
                        setActiveTab={this.setActiveTab}
                        activeTab={activeTab}
                        breakWidth={992}
                        key={v4()}
                      />
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
                      <Box className="overview-buttons">
                        <List>
                          {activeTab === 1 ? (
                            <Fragment>
                              {selectedGroup.length ? (
                                <ListItem>
                                  <Button
                                    className="danger-btn min-width-inherit"
                                    variant="contained"
                                  >
                                    Remove
                                  </Button>
                                </ListItem>
                              ) : (
                                <></>
                              )}

                              <ListItem>
                                <Link>
                                  <Button
                                    className="primary-btn min-width-inherit"
                                    variant="contained"
                                    onClick={() => {
                                      this.setState({
                                        showAddUserToGroupComponent: true,
                                      });
                                    }}
                                  >
                                    Add user to Groups
                                  </Button>
                                </Link>
                              </ListItem>
                            </Fragment>
                          ) : activeTab === 2 ? (
                            <ListItem>
                              <Button
                                className="primary-btn min-width-inherit"
                                variant="contained"
                                onClick={this.handleChangePasswordModal}
                              >
                                Reset Password
                              </Button>
                            </ListItem>
                          ) : (
                            <></>
                          )}
                        </List>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box className="permission-tabs-content">
                  {activeTab === 0 ? (
                    <Permission />
                  ) : activeTab === 1 ? (
                    <Group
                      setGroup={(selectedGroup) => {
                        this.setState({ selectedGroup });
                      }}
                    />
                  ) : activeTab === 2 ? (
                    <SecurityCredentials />
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            )}
          </>
        )}
        {showChangePasswordModal ? (
          <ChangePasswordModal
            showModal={showChangePasswordModal}
            handleChangePasswordModal={this.handleChangePasswordModal}
            isCurrentPasswordHide={1}
          />
        ) : (
          <></>
        )}
        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={this.togglePopup}
            labels={{
              btnYes: "Disable",
              header: "Do you want to disable this User ? ",
              btnNo: "Cancel",
            }}
            icon={<i className="fas fa-trash-alt"></i>}
            handleCallBack={this.handleDeleteUser}
            showLoader={userDeleteStatus}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userDetailsById, removeUser } = state.settings;
  return { userDetailsById, removeUser };
};

const mapDispatchToProps = { getUserById, deleteUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(UserProfile));
