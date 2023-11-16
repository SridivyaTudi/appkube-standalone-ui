import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component } from "react";

class SetTransitions extends Component {
  render() {
    return (
      <Box className="set-transitions-container">
        <Box className="heading">
          <Box className="breadcrumbs">
            <List>
              <ListItem>
                <span>Rbac</span>
              </ListItem>
              <ListItem>
                <i className="fa-solid fa-chevron-right"></i>
              </ListItem>
              <ListItem>
                <span>Set Transitions</span>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box className="overview-cards">
          <Grid container>
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
          <h3>Set Policy and Permission</h3>
          <Box className="policy-permission">
            <Box className="policy-permission-head">
              <Box className="title">Policy</Box>
              <Box className="title">Permission</Box>
            </Box>
            <Box className="policy-permission-content">
              <Box className="policy-text">Environment</Box>
              <Box className="edit-policy">
                <List>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                </List>
                <span>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </Box>
            </Box>
            <Box className="policy-permission-content">
              <Box className="policy-text">Product</Box>
              <Box className="edit-policy">
                <List>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                </List>
                <span>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </Box>
            </Box>
            <Box className="policy-permission-content">
              <Box className="policy-text">SRE</Box>
              <Box className="edit-policy">
                <List>
                  <ListItem>
                    <Button>Delete</Button>
                  </ListItem>
                  <ListItem>
                    <Button>Edit</Button>
                  </ListItem>
                </List>
                <span>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </Box>
            </Box>
            <Box className="policy-permission-content">
              <Box className="policy-text">DevSecOps</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SetTransitions;
