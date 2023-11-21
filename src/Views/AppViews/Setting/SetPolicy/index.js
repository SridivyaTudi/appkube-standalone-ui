import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class SetPolicy extends Component {
  render() {
    return (
      <Box className="set-policy-container">
        <Box className="list-heading">
          <h3>Admin Set Policy </h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`#`}>Users and Permissions </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Set Policy</li>
            </ul>
          </Box>
        </Box>

        <Box className="policy-section">
          <h4>Set Policy and Permission</h4>
          <Box className="policy-permission">
            <Box className="policy-permission-head">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={3}>
                  <Box className="title">Policy</Box>
                </Grid>
                <Grid item xs={7}>
                  <Box className="title">Permission</Box>
                </Grid>
                <Grid item xs={2} className="text-right">
                  <Box className="title">Action</Box>
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
                      <Link to={`${APP_PREFIX_PATH}/settransitions`}>
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
                      <Link to={`${APP_PREFIX_PATH}/settransitions`}>
                        Manage
                      </Link>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default SetPolicy;
