import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { setActiveTab } from "Utils";

class SetPolicy extends Component {
  render() {
    return (
      <Box className="set-policy-container">
        <Box className="list-heading">
          <h3>Administrator View Policy </h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link
                  to={`/app/setting`}
                  onClick={() => setActiveTab("permissions")}
                >
                  Users and Permissions{" "}
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Set Policy</li>
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
          </Grid>
        </Box>
        <Box className="policy-section">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <h4>Allowed Policy set</h4>
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
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      <i className="p-r-10 fas fa-trash-alt"></i>
                      Delete
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      <i className="p-r-10 fas fa-trash-alt"></i>
                      Delete Role
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>

          <Box className="policy-permission">
            <Box className="policy-permission-head">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Box className="title"> <input type="checkbox" /> Policy Name</Box>
                </Grid>
              </Grid>
            </Box>
            {/* <Box className="policy-permission-content">
              <Grid
                container
                rowSpacing={1}
                alignItems={"center"}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <Box className="policy-text">Environment</Box>
                </Grid>
                <Grid item xs={7}>
                  <Box className="edit-policy">
                    <List>
                      <ListItem>
                        <p>Create Landing Zone</p>
                      </ListItem>
                      <ListItem>
                        <p>Edit Landing Zone</p>
                      </ListItem>
                      <ListItem>
                        <p>Clone Landing Zone</p>
                      </ListItem>
                      <ListItem>
                        <p>Migrate Landing Zone</p>
                      </ListItem>
                      <ListItem>
                        <p>Delete Landing Zone</p>
                      </ListItem>
                      <ListItem>
                        <p>Create Product Enclave</p>
                      </ListItem>
                      <ListItem>
                        <p>Replicate Landing Zone</p>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className="manage-btn text-right ">
                    <Button
                      className="secondary-btn min-width"
                      variant="contained"
                    >
                      <Link to={`${APP_PREFIX_PATH}/setting/settransitions`}>
                        Manage
                      </Link>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="policy-permission-content">
              <Grid
                container
                rowSpacing={1}
                alignItems={"center"}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <Box className="policy-text">Product</Box>
                </Grid>
                <Grid item xs={7}>
                  <Box className="edit-policy">
                    <List>
                      <ListItem>
                        <p>Create Product Environment</p>
                      </ListItem>
                      <ListItem>
                        <p>Edit Product Environment</p>
                      </ListItem>
                      <ListItem>
                        <p>Clone Product Environment</p>
                      </ListItem>
                      <ListItem>
                        <p>Migrate Product Environment</p>
                      </ListItem>
                      <ListItem>
                        <p>Delete Product Environment</p>
                      </ListItem>
                      <ListItem>
                        <p>Replicate Product Environment</p>
                      </ListItem>
                      <ListItem>
                        <p>Add Service in Product Environment</p>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box className="manage-btn text-right ">
                    <Button
                      className="secondary-btn min-width"
                      variant="contained"
                    >
                      <Link to={`${APP_PREFIX_PATH}/settings/settransitions`}>
                        Manage
                      </Link>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box> */}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SetPolicy;
