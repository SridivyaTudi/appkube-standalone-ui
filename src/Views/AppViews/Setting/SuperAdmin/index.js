import { Box, List, ListItem, Grid, Button, IconButton } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CreateUserControlModal from "../Permissions/Components/CreateUserControlModal";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { setActiveTab } from "Utils";
import Users from "./Users";
import Allowed from "./Allowed";
import Disallowed from "./Disallowed";
import Roles from "./Roles";

class SuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      actionButton: null,
      showCreateUserControlModal: false,
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

  handleCreateUserControlModal = () => {
    this.setState({
      showCreateUserControlModal: !this.state.showCreateUserControlModal,
    });
  };
  render() {
    const { showCreateUserControlModal, activeTab } = this.state;
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
                The super admin is the highest level of administrative authority within a system or platform, possessing unparalleled control and access to all features, settings, and user data Super admins hold the key to managing and overseeing the entire infrastructure, making critical decisions, and implementing security measures to protect the system from unauthorized access and potential breaches.
                </p>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="overview-buttons">
                <List>
                  <ListItem>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                      onClick={this.handleCreateUserControlModal}
                    >
                      Add Users
                    </Button>
                  </ListItem>
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
                      className="info-btn min-width-inherit"
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="danger-btn min-width-inherit"
                      variant="contained"
                    >
                      Delete Group
                    </Button>
                  </ListItem>
                </List>
              </Box>
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

        {showCreateUserControlModal ? (
          <CreateUserControlModal
            showModal={showCreateUserControlModal}
            handleCreateUserControlModal={this.handleCreateUserControlModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default navigateRouter(SuperAdmin);
