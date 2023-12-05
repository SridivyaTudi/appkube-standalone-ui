import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import Users from "./Components/Users";
import Allowed from "./Components/Allowed";
import Disallowed from "./Components/Disallowed";
import Roles from "./Components/Roles";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class SuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      actionButton: null,
    };
  }
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
              <Button
                className="primary-btn min-width-inherit"
                variant="contained"
              >
                <Link
                  to={`${APP_PREFIX_PATH}/setting/${
                    activeTab === 0 ? "add-users" : "add-role"
                  }`}
                >
                  {activeTab === 0 ? "Add Users" : "Add Role"}
                </Link>
              </Button>
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

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="super-admin-container">
        <Box className="list-heading">
          <h3>Group Default User</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting/setpolicy`}>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Super Admin Group</li>
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
            <Grid item xs={6}>
              <Box className="overview-card">
                <h5>Overview</h5>
                <p>
                  The super admin is the highest level of administrative
                  authority within a system or platform, possessing unparalleled
                  control and access to all features, settings, and user data
                  Super admins hold the key to managing and overseeing the
                  entire infrastructure, making critical decisions, and
                  implementing security measures to protect the system from
                  unauthorized access and potential breaches.
                </p>
              </Box>
            </Grid>
            <Grid item xs={6}>
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
      </Box>
    );
  }
}

export default navigateRouter(SuperAdmin);
