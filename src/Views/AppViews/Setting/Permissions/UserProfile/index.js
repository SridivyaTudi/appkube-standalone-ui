import { Box, Grid, List, ListItem, Button } from "@mui/material";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import UserImage from "assets/img/setting/user-image.png";
import Permission from "./Components/Permission";
import Group from "./Components/Group";
import SecurityCredentials from "./Components/SecurityCredentials";
import TabsMenu from "Views/AppViews/Environments/EnvironmentList/TabsMenu";
import ChangePasswordModal from "Views/AppViews/Setting/Account/Components/ChangePasswordModal";

import { v4 } from "uuid";
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
    };
  }
  tabMapping = [
    {
      name: "Permission",
    },
    {
      name: "Group",
    },
    {
      name: "Security Credentials",
    },
  ];
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleChangePasswordModal = () => {
    this.setState({
      showChangePasswordModal: !this.state.showChangePasswordModal,
    });
  };

  render() {
    const { activeTab, showChangePasswordModal } = this.state;
    return (
      <Box className="user-profile-container">
        <Box className="list-heading">
          <h3>Milena kahles</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting`}>Users and Permissions </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">User Profile</li>
            </ul>
          </Box>
        </Box>
        <Box className="user-top-section">
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <h4>Milena kahles</h4>
            </Grid>
            <Grid item xs={6}>
              <Box className="overview-buttons">
                <List>
                  <ListItem>
                    <Button
                      className="danger-btn min-width-inherit"
                      variant="contained"
                    >
                      Delete user
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
          <Box className="user-profile-details m-t-3">
            <Box className="d-flex align-items-center">
              <Box className="user-image m-r-2">
                <img src={UserImage} alt="" />
              </Box>
              <label>Milena kahles</label>
            </Box>
            <Box className="d-block">
              <List>
                <ListItem>
                  <span>Created Date and Time</span>
                  <strong>Dec 01,2023 14:30</strong>
                </ListItem>
                <ListItem>
                  <span>Last Activity</span>
                  <strong>
                    <Box className="green d-block">1 hour Ago</Box>
                  </strong>
                </ListItem>
                <ListItem>
                  <span>Application Access</span>
                  <strong>Enabled with MFA</strong>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>
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
                md={6}
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
              <Grid item xl={3} lg={3} md={4} sm={4} xs={4}>
                <Box className="overview-buttons">
                  <List>
                    {activeTab === 1 ? (
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
                          <Link to={`/app/setting/user-profile/add-user-group`}>
                            <Button
                              className="primary-btn min-width-inherit"
                              variant="contained"
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
              <Group />
            ) : activeTab === 2 ? (
              <SecurityCredentials />
            ) : (
              <></>
            )}
          </Box>
        </Box>
        {showChangePasswordModal ? (
          <ChangePasswordModal
            showModal={showChangePasswordModal}
            handleChangePasswordModal={this.handleChangePasswordModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default UserProfile;
