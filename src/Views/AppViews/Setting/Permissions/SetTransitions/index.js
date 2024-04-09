import { Box, List, ListItem, Grid, Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddPermitionControlModal from "../Components/AddPermitionControlModal";
import { setActiveTab } from "Utils";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class SetTransitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPermitionControlModal: false,
    };
  }

  handleAddPermitionControlModal = () => {
    this.setState({
      showAddPermitionControlModal: !this.state.showAddPermitionControlModal,
    });
  };
  render() {
    const { showAddPermitionControlModal } = this.state;
    return (
      <Box className="set-transitions-container">
        <Box className="list-heading">
          <h3>Set Policy</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/setting`}
                  onClick={() => setActiveTab("permissions")}
                >
                  Users and Permissions
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link to={`${APP_PREFIX_PATH}/setting/role-details`}>
                  Role Details
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Edit Policy</li>
            </ul>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }} className="search-bar">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search policy"
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="policy-section">
          {/* <h3>Set Policy and Permission</h3> */}
          <Box className="policy-permission">
            <Box className="policy-permission-head">
              <Grid
                container
                alignItems={"center"}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="title">Policy</Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="title">Permission</Box>
                </Grid>
              </Grid>
            </Box>
            <Box
              className="policy-permission-content"
              onClick={this.handleAddPermitionControlModal}
            >
              <Grid
                container
                alignItems={"center"}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="policy-text">
                    <input type="checkbox" />
                    <span>Environment</span>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="edit-policy">
                    <List>
                      <ListItem>
                        <Button>Delete</Button>
                      </ListItem>
                      <ListItem>
                        <Button>Edit</Button>
                      </ListItem>
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
                </Grid>
              </Grid>
            </Box>
            <Box
              className="policy-permission-content"
              onClick={this.handleAddPermitionControlModal}
            >
              <Grid
                container
                alignItems={"center"}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="policy-text">
                    <input type="checkbox" />
                    <span>Product</span>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="edit-policy">
                    <List>
                      <ListItem>
                        <Button>Delete</Button>
                      </ListItem>
                      <ListItem>
                        <Button>Edit</Button>
                      </ListItem>
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
                </Grid>
              </Grid>
            </Box>
            <Box
              className="policy-permission-content"
              onClick={this.handleAddPermitionControlModal}
            >
              <Grid
                container
                alignItems={"center"}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <Box className="policy-text">
                    <input type="checkbox" />
                    <span>SRE</span>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="edit-policy">
                    <List>
                      <ListItem>
                        <Button>Delete</Button>
                      </ListItem>
                      <ListItem>
                        <Button>Edit</Button>
                      </ListItem>
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
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        {showAddPermitionControlModal ? (
          <AddPermitionControlModal
            showModal={showAddPermitionControlModal}
            handleAddPermitionControlModal={this.handleAddPermitionControlModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default SetTransitions;
