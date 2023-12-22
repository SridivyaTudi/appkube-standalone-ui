import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import Users from "./Components/Users";
import Allowed from "./Components/Allowed";
import Disallowed from "./Components/Disallowed";
import Roles from "./Components/Roles";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { setActiveTab } from "Utils";
import status from "Redux/Constants/CommonDS";
import { getRoleById } from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
import { connect } from "react-redux";

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

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      actionButton: null,
      groupDetails: {},
    };
  }

  componentDidMount = () => {
    let groupId = this.getGroupId();
    if (groupId) {
      this.props.getRoleById(groupId);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.roleDetailsById.status !== prevProps.roleDetailsById.status
    ) {
      if (this.props.roleDetailsById.status === status.SUCCESS) {
        let groupDetails = this.props.roleDetailsById.data;
        if (groupDetails) {
          this.setState({ groupDetails });
        }
      }
    }
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  renderBtns = () => {
    let { activeTab } = this.state;
    return (
      <List>
        {[0, 1].includes(activeTab) ? (
          <Fragment>
            <ListItem>
              <Button
                className="danger-btn min-width-inherit"
                variant="contained"
              >
                Remove
              </Button>
            </ListItem>
            <ListItem>
              <Link
                to={`${APP_PREFIX_PATH}/setting/${
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
          <Button className="danger-btn min-width-inherit" variant="contained">
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
      <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  render() {
    const { activeTab, groupDetails } = this.state;
    let { roleDetailsById: groupDetailsById } = this.props;
    return (
      <Box className="super-admin-container">
        {groupDetailsById.status === status.IN_PROGRESS ? (
          this.renderLoder()
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
                  <Users />
                ) : activeTab === 1 ? (
                  <Roles />
                ) : activeTab === 2 ? (
                  <Allowed />
                ) : activeTab === 3 ? (
                  <Disallowed />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { roleDetailsById } = state.settings;
  return { roleDetailsById };
};

const mapDispatchToProps = { getRoleById };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(GroupDetails));
