import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CancelGroupControlModal from "../Components/CancelGroupControlModal";
import {
  getUserPermissionData,
  createPolicy,
} from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { getCurrentUser, setActiveTab } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
import AccordionView from "Views/AppViews/Setting/Components/AccordionView";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(11),
  },
}));

let searchedData = [];
export class CreatePolicy extends Component {
  user = { id: "", username: "", email: "", profileImage: "" };
  constructor(props) {
    super(props);
    this.state = {
      showCancelGroupControlModal: false,
      permissions: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      searchedPermission: "",
      formData: {
        name: "",
        description: "",
      },
      selectedActiveData: [],
      selectedCheckBoxData: { permissionsParams: [], viewData: [] },
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    this.props.getUserPermissionData(this.user.username);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userPermissionData.status !==
      prevProps.userPermissionData.status
    ) {
      if (this.props.userPermissionData.status === status.SUCCESS) {
        let permissions =
          this.props.userPermissionData.data?.permissionCategories || [];
        if (permissions?.length) {
          permissions = this.setPermissionAccordingToFormat(
            JSON.parse(JSON.stringify(permissions))
          );

          this.setState({ permissions });
        }
      }
    }

    if (this.props.policyCreation.status !== prevProps.policyCreation.status) {
      if (this.props.policyCreation.status === status.SUCCESS) {
        if (this.props.policyCreation.data) {
          ToastMessage.success(`Policy Created Successfully`);
          this.handlePreviousPage();
        } else {
          ToastMessage.error(`Policy Creation Failed!`);
        }
      }
    }
  };

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleCancelGroupControlModal = () => {
    this.setState({
      showCancelGroupControlModal: !this.state.showCancelGroupControlModal,
    });
  };

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
  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  // Search  permission Inputs
  renderSearchInput = () => {
    let { searchedPermission } = this.state;
    return (
      <Grid
        container
        className="h-100"
        alignItems={"center"}
        columns={{ xs: 4, md: 12 }}
      >
        <Grid item xs={6}>
          <Box className="top-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search Permission here"
              value={searchedPermission}
              onChange={this.handleSearchChange}
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </Grid>
      </Grid>
    );
  };

  //  Serach policy
  handleSearchChange = (e) => {
    let searchedPermission = e.target.value;
    let { selectedActiveData } = this.state;
    searchedData = [];
    selectedActiveData = [];

    let data = this.setPermissionStateOrReturnData(0);
    if (data?.length) {
      if (searchedPermission) {
        this.searchRecursiveLogic(searchedPermission, data);
        selectedActiveData = this.getParentElement(searchedData);
      } else {
        selectedActiveData = [];
      }

      this.setState({ selectedActiveData, searchedPermission });
    }
  };

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { name, description } = this.state.formData;
    const errors = {
      name: "",
      description: "",
      roles: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!name) {
        errors.name = "Policy Name is required!";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!description) {
        errors.description = "Policy Description is required!";
        isValid = false;
      } else if (description.length > 255) {
        errors.description =
          "Policy Description should be a maximum of 255 characters.";
        isValid = false;
      } else {
        errors.description = "";
      }
    }
    return { isValid, errors };
  };

  // Call API create policy
  handlePolicySubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);
    let {
      formData: { name, description },
      selectedCheckBoxData: { permissionsParams },
    } = this.state;

    if (isValid) {
      if (!permissionsParams.length) {
        ToastMessage.error("Please select permission!");
        return 0;
      } else {
        let params = {
          version: 1,
          name,
          description,
          permissions: permissionsParams,
          createdBy: this.user.username,
        };
        this.props.createPolicy(params);
      }
    }
  };

  // Move to previous page
  handlePreviousPage = () => {
    setActiveTab("permissions/policies");
    this.props.navigate(`${APP_PREFIX_PATH}/setting`);
  };

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  // Render Other components
  renderOtherComponents = () => {
    const { showCancelGroupControlModal } = this.state;

    return (
      <>
        {showCancelGroupControlModal ? (
          <CancelGroupControlModal
            showModal={showCancelGroupControlModal}
            handleCancelGroupControlModal={this.handleCancelGroupControlModal}
            previousTab={"permissions/policies"}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  // set policy state according format
  setPermissionAccordingToFormat = (policies, categoryId) => {
    return policies.map((policy) => {
      policy["name"] = policy.name || policy.permissionId;
      policy["isCheckBoxShow"] = true;

      if (policy["permissions"]) {
        policy["subName"] = this.getStatusHtml(policy["status"]);
      }

      if (categoryId) {
        policy["permissionCategoryId"] = categoryId;
      }
      if (policy?.permissions?.length) {
        policy["chlidren"] = this.setPermissionAccordingToFormat(
          policy.permissions,
          policy.id
        );
        return policy;
      } else {
        return policy;
      }
    });
  };

  getStatusHtml = (status) => {
    return (
      <Box className="status-btn">
        <HtmlTooltip
          className="table-tooltip-dark d-flex"
          title={
            <React.Fragment>
              <span>This role created by default by the system</span>
            </React.Fragment>
          }
        >
          <span>{status}</span>
        </HtmlTooltip>
      </Box>
    );
  };

  //  Search recursive logic
  searchRecursiveLogic = (value, policyData, parentIndex) => {
    policyData.forEach((data, index) => {
      let currentNode = `${parentIndex ? `${parentIndex}_` : ""}${index}`;

      if (
        data?.name
          ?.toString()
          ?.toLowerCase()
          .includes(value?.toString()?.toLowerCase())
      ) {
        searchedData.push(currentNode);
      }
      if (data?.chlidren?.length) {
        return this.searchRecursiveLogic(value, data?.chlidren, currentNode);
      }
    });
  };

  // Set state of permission
  setPermissionStateOrReturnData = (isStateSet = 1) => {
    let permissions =
      this.props.userPermissionData.data.permissionCategories || [];
    if (permissions?.length) {
      permissions = this.setPermissionAccordingToFormat(
        JSON.parse(JSON.stringify(permissions))
      );
      if (isStateSet) {
        this.setState({ permissions });
      } else {
        return permissions;
      }
    }
  };

  //  Get parent element from child element
  getParentElement = (data) => {
    let parentElement = [];

    data.forEach((value) => {
      let currentVal = value;
      let currentValToArr = value.split("_");
      if (currentValToArr.length) {
        for (let index = 0; index < currentValToArr.length; index = index + 2) {
          parentElement.push(currentVal.slice(0, index + 1));
        }
      }
    });

    return [...new Set(parentElement)].concat(data);
  };

  // On Checkbox check or uncheck data
  onChangeCheckbox = (data) => {
    let { selectedCheckBox: checkbox, extraData, checked, uniqueID } = data;
    let {
      selectedCheckBoxData: { permissionsParams, viewData },
    } = this.state;

    if (extraData) {
      let { permissionCategoryId, id, chlidren } = extraData;
      let uniqueIDToArr = uniqueID.split("_");
      viewData = checkbox;

      if (checked) {
        if (permissionCategoryId) {
          permissionsParams.push({ permissionCategoryId, permissionId: id });
        } else {
          if (chlidren.length) {
            let permissions = chlidren.map((permission, index) => {
              viewData.push(`${uniqueIDToArr[0]}_${index}`);
              return {
                permissionId: permission.id,
                permissionCategoryId: permission.permissionCategoryId,
              };
            });
            permissionsParams = permissionsParams.concat(permissions);
          }
        }
      } else {
        if (permissionCategoryId) {
          permissionsParams = permissionsParams.filter(
            (value) => value.permissionId !== id
          );
          viewData = viewData.filter((tempId) => tempId !== uniqueID[0]);
        } else {
          if (chlidren.length) {
            permissionsParams = permissionsParams.filter(
              (value) => value.permissionCategoryId !== id
            );
            viewData = viewData.filter(
              (tempId) => !tempId.startsWith(uniqueID[0])
            );
          }
        }
      }

      this.setState({ selectedCheckBoxData: { permissionsParams, viewData } });
    }
  };
  render() {
    let {
      isSubmit,
      formData,
      permissions,
      selectedActiveData,
      selectedCheckBoxData,
    } = this.state;
    let { name, description } = formData;
    const { errors } = this.validateForm(isSubmit);
    let policyStatus = this.props.policyCreation?.status;
    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Create policy</h3>
          <Box className="breadcrumbs">
            <ul>
              <li onClick={this.handlePreviousPage}>
                <Link>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Create policy</li>
            </ul>
          </Box>
        </Box>
        <Box className="setting-common-searchbar">
          <Grid
            container
            alignItems={"center"}
            columns={{ xs: 4, sm: 12, md: 12 }}
          >
            <Grid item xs={6}>
              <h4 className="m-t-0 m-b-0">Name of the policy</h4>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <Button
                    onClick={this.handleCancelGroupControlModal}
                    className="danger-outline-btn min-width-inherit"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </ListItem>
                <ListItem>
                  <LoadingButton
                    className="primary-btn min-width-inherit"
                    variant="contained"
                    disabled={policyStatus === status.IN_PROGRESS}
                    loading={policyStatus === status.IN_PROGRESS}
                    onClick={this.handlePolicySubmit}
                  >
                    Create policy
                  </LoadingButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        <Box className="grop-description-section">
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, md: 12 }}
          >
            <Grid item xs={6}>
              <Box className="form-group">
                <label htmlFor="roleName" className="form-label d-block">
                  Policy Name
                </label>
                <span className="D-block">
                  Enter a meaningful name to identify this policy.
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="roleName"
                  name="name"
                  placeholder="Src-core"
                  value={name}
                  onChange={this.handleInputChange}
                  autoFocus={"autoFocus"}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handlePolicySubmit(e) : <></>
                  }
                />
                {errors.name ? (
                  <span style={{ color: "red" }}>{errors.name}</span>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="form-group">
                <label htmlFor="roleDescription" className="form-label d-block">
                  Policy Description
                </label>

                <textarea
                  type="text"
                  className="form-control"
                  id="roleDescription"
                  name="description"
                  maxlength="255"
                  style={{
                    maxWidth: "100%",
                    height: "60px",
                    lineHeight: "18px",
                    paddingRight: "15px",
                  }}
                  placeholder="pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia "
                  value={description}
                  onChange={this.handleInputChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handlePolicySubmit(e) : <></>
                  }
                />
                {errors.description ? (
                  <span style={{ color: "red" }}>{errors.description}</span>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="setting-common-searchbar">
          <h5>Add Permissions to the Policy({selectedActiveData.length})</h5>
          {this.renderSearchInput()}
        </Box>
        <Box className="permission-table">
          {this.props.userPermissionData?.status === status.IN_PROGRESS ? (
            this.renderLoder()
          ) : permissions.length ? (
            <AccordionView
              data={permissions}
              selectedData={selectedActiveData}
              selectedCheckBoxData={selectedCheckBoxData}
              headers={[
                { name: "Permission set", styled: { width: 105 } },
                { name: "Status", styled: { width: 105 } },
              ]}
              isSingleChecked={false}
              setSelectedViewData={(data) => this.onChangeCheckbox(data)}
            />
          ) : (
            <></>
          )}
        </Box>

        {this.renderOtherComponents()}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userPermissionData, policyCreation } = state.settings;
  return {
    userPermissionData,
    policyCreation,
  };
};

const mapDispatchToProps = {
  getUserPermissionData,
  createPolicy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(CreatePolicy));
