import {
  Box,
  List,
  ListItem,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import { setActiveTab, getCurrentUser } from "Utils";
import CreateAddPolicyControlModal from "../Components/CreateAddPolicyControlModal";
import AccordionView from "../../Components/AccordionView";
import ConfirmationPopup from "Components/ConfirmationPopup";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { getRoleById, deleteRole } from "Redux/Settings/SettingsThunk";
import Loader from "Components/Loader";
import { ToastMessage } from "Toast/ToastMessage";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class RoleDetails extends Component {
  user = { username: "", email: "", profileImage: "" };
  constructor(props) {
    super(props);
    this.state = {
      showCreateAddPolicyControlModal: false,
      showConfirmPopup: false,
      currentDeleteFlag: "",
      roleDetails: {},
      policyList: [],
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    let roleId = this.getRoleId();
    if (roleId) {
      this.props.getRoleById(roleId);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.roleDetailsById.status !== prevProps.roleDetailsById.status
    ) {
      if (this.props.roleDetailsById.status === status.SUCCESS) {
        let roleDetails = this.props.roleDetailsById.data;
        if (roleDetails) {
          this.setState({ roleDetails });
          this.setPolicyStateOrReturnData();
        }
      }
    }

    if (this.props.removeRole.status !== prevProps.removeRole.status) {
      if (this.props.removeRole.status === status.SUCCESS) {
        let removeRoleRes = this.props.removeRole.data;
        if (removeRoleRes) {
          ToastMessage.success("Role Removed Successfully");
          setActiveTab("permissions/role");
          this.props.navigate(`${APP_PREFIX_PATH}/setting`);
        } else {
          ToastMessage.error("Role Deletion Failed!");
        }
      }
    }
  };
  handleCreateAddPolicyControlModal = () => {
    this.setState({
      showCreateAddPolicyControlModal:
        !this.state.showCreateAddPolicyControlModal,
    });
  };
  // toggle confirmation popup
  togglePopup = (name) => {
    let { showConfirmPopup } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
    });
  };

  getRoleId = () => this.props.params.id;

  // set policy state according format
  setPolicyAccordingToFormat = (policies) => {
    return policies.map((policy) => {
      if (policy.version) {
        policy["isCheckBoxShow"] = true;
      }

      let permissions = policy?.permissions;
      if (permissions?.length) {
        let categories = [];
        permissions.forEach((permission) => {
          let { permissionCategoryId, permissionCategoryName } = permission;
          let isExistCategory = categories.filter(
            (category) => category.id === permissionCategoryId
          ).length;

          if (!isExistCategory) {
            categories.push({
              id: permissionCategoryId,
              name: permissionCategoryName,
            });
          }
        });

        let permissionList = categories.map((category) => {
          let childData = [];
          permissions.forEach((permission) => {
            if (permission.permissionCategoryId === category.id) {
              let obj = {
                id: permission.permissionId,
                name: permission.permissionName,
                permissionCategoryId: category.id,
              };
              childData.push(obj);
            }
          });

          category["chlidren"] = childData;
          return category;
        });

        policy["chlidren"] = permissionList;
        return policy;
      } else {
        return policy;
      }
    });
  };

  // Set state of policies
  setPolicyStateOrReturnData = (isStateSet = 1) => {
    let data = this.props.roleDetailsById?.data || {};
    if (data?.policies) {
      let policyList = this.setPolicyAccordingToFormat(
        JSON.parse(JSON.stringify(data.policies))
      );

      if (isStateSet) {
        this.setState({ policyList });
      } else {
        return policyList;
      }
    }
  };

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

  // Delete role
  handleDeleteRole = () => {
    let { roleDetails } = this.state;
    if (roleDetails.id) {
      this.props.deleteRole(roleDetails.id);
    }
  };
  render() {
    const {
      showCreateAddPolicyControlModal,
      showConfirmPopup,
      roleDetails,
      policyList,
    } = this.state;
    let { roleDetailsById, removeRole } = this.props;
    let deleteRoleStatus = removeRole.status === status.IN_PROGRESS;
    return (
      <Box className="set-policy-container">
        {roleDetailsById.status === status.IN_PROGRESS ? (
          <Box sx={{ height: 550 }}>{this.renderLoder()}</Box>
        ) : (
          <>
            <Box className="list-heading">
              <h3>{roleDetails.name} </h3>
              <Box className="breadcrumbs">
                <ul>
                  <li>
                    <Link
                      to={`${APP_PREFIX_PATH}/setting`}
                      onClick={() => setActiveTab("permissions")}
                    >
                      Users and Permissions{" "}
                    </Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">Role Details</li>
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
                <Grid item xs={12} md={8} lg={6}>
                  <Box className="overview-card">
                    <h5>Overview</h5>
                    <p>{roleDetails.description}</p>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="policy-section">
              <Box className="setting-common-searchbar">
                <Grid container alignItems={"center"}>
                  <Grid item xs={4} md={4}>
                    <h4 className="m-t-0 m-b-0">Allowed Policy set</h4>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <List>
                      <ListItem>
                        <Button
                          className="primary-btn min-width-inherit"
                          variant="contained"
                          onClick={this.handleCreateAddPolicyControlModal}
                        >
                          Update Policies
                        </Button>
                      </ListItem>

                      <ListItem>
                        <Button
                          onClick={() =>
                            this.setState({
                              currentDeleteFlag: "role",
                              showConfirmPopup: true,
                            })
                          }
                          className="danger-outline-btn min-width-inherit"
                          variant="outlined"
                        >
                          <i className="p-r-10 fas fa-trash-alt"></i>
                          Delete
                        </Button>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
              <Box className="policy-permission">
                <Box
                  className="policy-permission-head"
                  style={{ display: "none" }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12}>
                      <Box className="title">
                        <FormControlLabel
                          control={<Checkbox className="check-box" />}
                          label="Policy Name"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="setting-table">
                  <AccordionView data={policyList} />
                </Box>
              </Box>
            </Box>
          </>
        )}

        {showCreateAddPolicyControlModal ? (
          <CreateAddPolicyControlModal
            showModal={showCreateAddPolicyControlModal}
            handleCreateAddPolicyControlModal={
              this.handleCreateAddPolicyControlModal
            }
            selectedPolicies={policyList}
          />
        ) : (
          <></>
        )}

        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={() => this.togglePopup()}
            labels={{
              btnYes: "Delete",
              header: `Do you want to delete this  Role ? `,
              description: "This action can’t be undone",
              btnNo: "Cancel",
            }}
            icon={<i className="fas fa-trash-alt"></i>}
            handleCallBack={this.handleDeleteRole}
            showLoader={deleteRoleStatus}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { roleDetailsById, removeRole } = state.settings;
  return { roleDetailsById, removeRole };
};

const mapDispatchToProps = { getRoleById, deleteRole };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(RoleDetails));
