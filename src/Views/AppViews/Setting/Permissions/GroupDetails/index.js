import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import Users from "./Components/Users";
import Allowed from "./Components/Allowed";
import Disallowed from "./Components/Disallowed";
import Roles from "./Components/Roles";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import {
  setActiveTab,
  getActiveTab,
  deleteActiveTab,
  getCurrentUser,
} from "Utils";
import status from "Redux/Constants/CommonDS";
import { getGroupById, deleteGroup } from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
import { connect } from "react-redux";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { ToastMessage } from "Toast/ToastMessage";

class GroupDetails extends Component {
  tabMapping = [
    {
      name: "Users",
      dataKey: "users",
      index: 0,
    },
    {
      name: "Roles",
      dataKey: "roles",
      index: 1,
    },
    {
      name: "Allowed permission for the group",
      dataKey: "allowed",
      index: 2,
    },
    {
      name: "Disallowed permission for the group",
      dataKey: "disallowed",
      index: 3,
    },
  ];
  user = { username: "", email: "", profileImage: "" };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      actionButton: null,
      groupDetails: {},
      removeDataDetails: null,
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.setPreviousTab();
    let groupId = this.getGroupId();
    if (groupId) {
      this.props.getGroupById({ id: groupId, userName: this.user.username });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.groupDetailsById.status !== prevProps.groupDetailsById.status
    ) {
      if (this.props.groupDetailsById.status === status.SUCCESS) {
        let groupDetails = this.props.groupDetailsById.data;
        if (groupDetails) {
          this.setState({ groupDetails });
        }
      }
    }

    if (this.props.removeGroup.status !== prevProps.removeGroup.status) {
      if (this.props.removeGroup.status === status.SUCCESS) {
        let removeGroupRes = this.props.removeGroup.data;
        if (removeGroupRes) {
          this.togglePopup();
          setActiveTab("permissions/group");
          this.props.navigate("/app/setting");
          ToastMessage.success("Group Removed Successfully");
        } else {
          ToastMessage.error("Group Deletion Failed!");
        }
      }
    }
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab, removeDataDetails: null });
  };

  setPreviousTab = () => {
    let currentTab = getActiveTab();
    if (currentTab) {
      for (let tab = 0; tab < this.tabMapping.length; tab++) {
        const element = this.tabMapping[tab];
        if (currentTab.includes(element.dataKey)) {
          this.setActiveTab(tab);
          deleteActiveTab();
          break;
        }
      }
    }
  };

  renderBtns = () => {
    let { activeTab, removeDataDetails } = this.state;
    return (
      <List>
        {[0, 1].includes(activeTab) ? (
          <Fragment>
            {removeDataDetails ? (
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
              <Link
                to={`${APP_PREFIX_PATH}/setting/group-details/${this.getGroupId()}/${
                  activeTab === 0 ? "add-users" : "add-role"
                }`}
              >
                <Button
                  className="primary-btn min-width-inherit"
                  variant="contained"
                >
                  {activeTab === 0 ? "Add Users" : "Add Role"}
                </Button>
              </Link>
            </ListItem>
          </Fragment>
        ) : (
          <></>
        )}

        <ListItem>
          <Button className="info-btn min-width-inherit" variant="contained">
            Edit
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className="danger-btn min-width-inherit"
            variant="contained"
            onClick={() => {
              this.setState({ showConfirmPopup: true });
            }}
          >
            Delete Group
          </Button>
        </ListItem>
      </List>
    );
  };

  // Move to previous page
  handlePreviousPage = (tab, url) => {
    setActiveTab(tab);
    this.props.navigate(url);
  };

  getGroupId = () => this.props.params.id;

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
  // Delete group
  handleDeleteGroup = () => {
    this.props.deleteGroup(this.getGroupId());
  };

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
    });
  };
  render() {
    const { activeTab, groupDetails, showConfirmPopup } = this.state;
    let { groupDetailsById: groupDetailsById } = this.props;
    let deleteGroupStatus =
      this.props.removeGroup?.status === status.IN_PROGRESS;
    return (
      <Box className="super-admin-container">
        {groupDetailsById.status === status.IN_PROGRESS ? (
          <Box sx={{ height: 550 }}>{this.renderLoder()}</Box>
        ) : (
          <>
            <Box className="list-heading">
              <h3>{groupDetails.name}</h3>
              <Box className="breadcrumbs">
                <ul>
                  <li
                    onClick={() =>
                      this.handlePreviousPage(
                        "permissions/group",
                        "/app/setting"
                      )
                    }
                  >
                    <Link>Users and Permissions</Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">Group Details</li>
                </ul>
              </Box>
            </Box>
            <Box className="overview-section">
              <Grid
                container
                rowSpacing={1}
                className="h-100"
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} md={6}>
                  <Box className="overview-card">
                    <h5>Overview</h5>
                    <p>{groupDetails.description}</p>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className="overview-buttons">{this.renderBtns()}</Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="tabs">
              <List className="tabs-menu">
                {this.tabMapping.map((tabData, index) => {
                  return (
                    <ListItem
                      key={`ops-tab-${index}`}
                      className={index === activeTab ? "active" : ""}
                      onClick={() => this.setActiveTab(index)}
                    >
                      {tabData.name}
                    </ListItem>
                  );
                })}
              </List>
              <Box className="tabs-content">
                {activeTab === 0 ? (
                  <Users
                    setRemoveDetails={(removeDataDetails) => {
                      this.setState({ removeDataDetails });
                    }}
                  />
                ) : activeTab === 1 ? (
                  <Roles
                    setRemoveDetails={(removeDataDetails) => {
                      this.setState({ removeDataDetails });
                    }}
                  />
                ) : activeTab === 2 ? (
                  <Allowed />
                ) : activeTab === 3 ? (
                  <Disallowed />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            {showConfirmPopup ? (
              <ConfirmationPopup
                showModal={showConfirmPopup}
                togglePopup={this.togglePopup}
                labels={{
                  btnYes: "Delete",
                  header: "Do you want to delete this Group ? ",
                  btnNo: "Cancel",
                }}
                icon={<i className="fas fa-trash-alt"></i>}
                handleCallBack={this.handleDeleteGroup}
                showLoader={deleteGroupStatus}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { groupDetailsById, removeGroup } = state.settings;
  return { groupDetailsById, removeGroup };
};

const mapDispatchToProps = { getGroupById, deleteGroup };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(GroupDetails));
