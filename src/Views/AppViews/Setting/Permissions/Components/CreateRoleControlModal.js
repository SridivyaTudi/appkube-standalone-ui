import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, MenuItem, Select, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import {
  createRole,
  getRoleById,
  updateRole,
  getUserPermissionData,
} from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentUser } from "Utils";
import { v4 } from "uuid";
import Loader from "Components/Loader";

class CreateRoleControlModal extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isSubmit: false,
      policyList: [],
      selectedPolicy: [],
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidMount = () => {
    if (this.props.roleId > 0) {
      this.props.getRoleById(this.props.roleId);
    }
    this.setStatePolicies();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.roleCreation.status !== prevProps.roleCreation.status) {
      if (this.props.roleCreation.status === status.SUCCESS) {
        if (this.props.roleCreation.data) {
          ToastMessage.success(` Role Created Successfully`);
          this.props.getUserPermissionData(this.user.username);
          this.handleCloseModal();
        } else {
          ToastMessage.error(`Role Creation Failed!`);
        }
      }
    }

    if (
      this.props.roleDetailsById.status !== prevProps.roleDetailsById.status
    ) {
      if (this.props.roleDetailsById.status === status.SUCCESS) {
        let roleDetails = this.props.roleDetailsById.data;
        if (roleDetails) {
          let { name, description, policies } = roleDetails;
          let selectedPolicy = this.getSelectedPolicies(policies);
          this.setState({ name, description, selectedPolicy });
        }
      }
    }

    if (this.props.roleUpdation.status !== prevProps.roleUpdation.status) {
      if (this.props.roleUpdation.status === status.SUCCESS) {
        if (this.props.roleUpdation.data) {
          ToastMessage.success(` Role Updated Successfully`);
          this.props.getUserPermissionData(this.user.username);
          this.handleCloseModal();
        } else {
          ToastMessage.error(`Role Updation Failed!`);
        }
      }
    }
  };

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelectboxChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ selectedPolicy: value });
  };

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { name, description, selectedPolicy } = this.state;
    const errors = {
      name: "",
      description: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!name) {
        errors.name = "Role Name is required!";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!description) {
        errors.description = "Role Description is required!";
        isValid = false;
      } else if (description.length > 255) {
        errors.description =
          "Role Description should be a maximum of 255 characters.";
        isValid = false;
      } else {
        errors.description = "";
      }

      if (!selectedPolicy.length) {
        errors.policy = "Policy is required!";
        isValid = false;
      } else {
        errors.policy = "";
      }
    }
    return { isValid, errors };
  };

  // Call API create role
  handleRoleSubmit = (e) => {
    e.preventDefault();
    const { name, description, selectedPolicy } = this.state;
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      let params = {
        version: 1,
        name,
        description,
        grp: false,
        policies: selectedPolicy.map((policy) => ({ id: policy })),
        createdBy: this.user.username,
      };

      if (this.props.roleId > 0) {
        params["id"] = this.props.roleId;
        this.props.updateRole(params);
      } else {
        this.props.createRole(params);
      }
    }
  };

  //  Reset state and close modal
  handleCloseModal = () => {
    this.setState({
      name: "",
      description: "",
      isSubmit: false,
      selectedPolicy: [],
    });
    this.props.handleCreateRoleControlModal();
  };

  renderPolicies = () => {
    let { policyList } = this.state;
    if (policyList.length) {
      return policyList.map((policy) => (
        <MenuItem value={policy.id} key={v4()}>
          {policy.name}
        </MenuItem>
      ));
    }
  };

  // Get selected policy
  getSelectedPolicies = (policies) => {
    let selectedPolicy = [];
    if (policies.length) {
      let { policyList } = this.state;
      policies.forEach((value) => {
        let isExist = false;

        for (let index = 0; index < policyList.length; index++) {
          const element = policyList[index];
          if (element.id === value.id) {
            isExist = true;
          }
        }

        if (isExist) {
          selectedPolicy.push(value.id);
        }
      });
    }
    return selectedPolicy;
  };
  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  };

  setStatePolicies = () => {
    let policyList = this.props.userPermissionData.data?.policies || [];
    if (policyList.length) {
      this.setState({ policyList });
    } else {
      this.setState({ policyList: [] });
    }
  };
  render() {
    let { name, description, isSubmit, selectedPolicy, policyList } =
      this.state;
    const { errors } = this.validateForm(isSubmit);
    let { roleUpdation, roleCreation, roleDetailsById } = this.props;
    let createOrUpdateStatus = [
      roleCreation?.status,
      roleUpdation?.status,
    ].includes(status.IN_PROGRESS);

    let roleDetailsStatus = [roleDetailsById?.status].includes(
      status.IN_PROGRESS
    );

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            {this.props.roleId > 0 ? "Edit" : "Add New"} Role
            <IconButton
              onClick={this.handleCloseModal}
              variant="outlined"
              aria-label="delete"
              size="small"
              className="close-btn"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </h5>
        </ModalHeader>
        {roleDetailsStatus ? (
          this.renderLoder()
        ) : (
          <form onSubmit={this.handleRoleSubmit}>
            <ModalBody>
              <Box className="form-group">
                <label htmlFor="roleName" className="form-label">
                  Role Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Director"
                  value={name}
                  onChange={this.handleInputChange}
                  autoFocus={"autoFocus"}
                />
                {errors.name ? (
                  <span className="red">{errors.name}</span>
                ) : (
                  <></>
                )}
              </Box>

              <Box className="form-group">
                <label htmlFor="roleDescription" className="form-label">
                  Role Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  style={{
                    height: "120px",
                    lineHeight: "18px",
                    paddingRight: "15px",
                  }}
                  placeholder="director is a senior executive responsible for overseeing the strategic department."
                  value={description}
                  onChange={this.handleInputChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.handleRoleSubmit(e) : <></>
                  }
                />
                {errors.description ? (
                  <span className="red">{errors.description}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="form-group">
                <label htmlFor="roleDescription" className="form-label">
                  Add Policy
                </label>
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Policy</em>;
                      }
                      let labels = [];
                      policyList.forEach((policy) => {
                        if (selected.includes(+policy.id)) {
                          labels.push(policy.name);
                        }
                      });
                      return labels.join(", ");
                    }}
                    value={selectedPolicy}
                    onChange={this.handleSelectboxChange}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Policy</em>
                    </MenuItem>
                    {this.renderPolicies()}
                  </Select>
                </FormControl>
                {errors.policy ? (
                  <span className="red">{errors.policy}</span>
                ) : (
                  <></>
                )}
              </Box>
            </ModalBody>

            <ModalFooter className="footer-top-br">
              <Box className="d-block text-right">
                <LoadingButton
                  className="danger-btn min-width-inherit m-r-2"
                  variant="outlined"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="primary-btn min-width"
                  variant="contained"
                  disabled={createOrUpdateStatus}
                  loading={createOrUpdateStatus}
                  onClick={this.handleRoleSubmit}
                >
                  {this.props.roleId > 0 ? "Update" : "Create"}
                </LoadingButton>
              </Box>
            </ModalFooter>
          </form>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { roleCreation, roleDetailsById, roleUpdation, userPermissionData } =
    state.settings;
  return {
    roleCreation,
    userPermissionData,
    roleDetailsById,
    roleUpdation,
  };
};

const mapDispatchToProps = {
  createRole,
  getRoleById,
  updateRole,
  getUserPermissionData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoleControlModal);
