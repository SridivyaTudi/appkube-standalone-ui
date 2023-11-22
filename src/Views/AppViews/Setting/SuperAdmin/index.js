import { Start } from "@mui/icons-material";
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

class SuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionButton: null,
      showCreateUserControlModal: false,
      groupControlData: [
        {
          name: "Richard Thompson",
          admin: "Admin",
          she: "SHE",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Robert Johnson",
          admin: "Admin",
          she: "SHE",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Ella Lewis",
          admin: "Admin",
          she: "SHE",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Sophia Hernandez",
          admin: "Admin",
          she: "SHE",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
        {
          name: "Isabella Anderson",
          admin: "Admin",
          she: "SHE",
          description:
            "Active The super admin is the highest level of administrative authority within a system",
        },
      ],
    };
  }
  handleActionButton = (index) => {
    const { actionButton } = this.state;
    if (actionButton === null) {
      this.setState({
        actionButton: index,
      });
    } else {
      this.setState({
        actionButton: null,
      });
    }
  };

  redirectToSettingPage = () => {
    this.props.navigate("/app/setting");
    setActiveTab("permissions");
  };

  renderGroupControlData = () => {
    const { groupControlData, actionButton } = this.state;
    let retData = [];
    if (groupControlData?.length > 0) {
      groupControlData.forEach((groupData, index) => {
        retData.push(
          <Box className="group-box" key={groupData.name}>
            <Box className="heading">
              <h4 onClick={() => this.redirectToSettingPage()}>
                {groupData.name}
              </h4>
              <IconButton
                className="action-btn"
                aria-label="morevertIcon"
                size="small"
                onClick={() => this.handleActionButton(index)}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
              {actionButton === index && (
                <>
                  <Box className="action-buttons">
                    <Button
                      startIcon={<DeleteOutlineOutlinedIcon className="icon" />}
                      className="secondary-text-btn"
                    >
                      Delete Role
                    </Button>
                    <Button
                      startIcon={<ContentCopyIcon className="icon" />}
                      className="secondary-text-btn"
                    >
                      Duplicate Group
                    </Button>
                  </Box>
                  <Box
                    className="action-buttons-bg"
                    onClick={() => this.handleActionButton(index)}
                  ></Box>
                </>
              )}
            </Box>
            <Box
              className="group-data"
              onClick={() => this.redirectToSettingPage()}
            >
              <Box className="data">
                <label>Roles Assigned</label>
                <span>{groupData.admin}</span>
                <span>{groupData.she}</span>
              </Box>
            </Box>
            <Box
              className="description-text"
              onClick={() => this.redirectToSettingPage()}
            >
              <label>Group Description</label>
              <p>{groupData.description}</p>
            </Box>
          </Box>
        );
      });
    } else {
      retData = (
        <Box className="group-loader text-center w-100">
          There are no data available.
        </Box>
      );
    }
    return retData;
  };

  handleCreateUserControlModal = () => {
    this.setState({
      showCreateUserControlModal: !this.state.showCreateUserControlModal,
    });
  };
  render() {
    const { showCreateUserControlModal } = this.state;
    return (
      <Box className="super-admin-container">
        <Box className="list-heading">
          <h3>Super Admin Group</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting/setpolicy`}> Set Policy </Link>
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
                      className="primary-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      View All
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
        <Box className="group-control-boxs">
          {this.renderGroupControlData()}
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
                      <Link to={`${APP_PREFIX_PATH}/setting/settransitions`}>
                        Manage
                      </Link>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
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
