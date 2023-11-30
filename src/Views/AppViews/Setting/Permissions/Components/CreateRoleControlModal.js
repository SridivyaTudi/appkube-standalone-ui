import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, MenuItem, Select } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import {
  createRole,
  getPolicies,
  getRoleById,
  updateRole,
} from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

class CreateRoleControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isSubmit: false,
      policyList: [],
      selectedPolicy: [],
    };
  }

  componentDidMount = () => {
    this.props.getPolicies();
    if (this.props.roleId > 0) {
      this.props.getRoleById(this.props.roleId);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.roleCreation.status !== prevProps.roleCreation.status) {
      if (this.props.roleCreation.status === status.SUCCESS) {
        let label = this.props.roleId > 0 ? "Update" : "Creation";
        if (this.props.roleCreation.data) {
          ToastMessage.success(` Role ${label} Successfully`);
          this.handleCloseModal();
        } else {
          ToastMessage.error(`Role ${label} Failed!`);
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
          this.setState({ name, description, selectedPolicy: policies });
        }
      }
    }

    if (this.props.allPolicy.status !== prevProps.allPolicy.status) {
      if (this.props.allPolicy.status === status.SUCCESS) {
        let policyList = this.props.allPolicy.data;
        if (policyList) {
          this.setState({ policyList });
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
    this.setState({ name: "", description: "", isSubmit: false,selectedPolicy:[] });
    this.props.handleCreateRoleControlModal();
  };

  renderPolicies = () => {
    let { policyList } = this.state;
    if (policyList.length) {
      return policyList.map((policy) => (
        <MenuItem value={policy.id}>{policy.name}</MenuItem>
      ));
    }
  };

  render() {
    let { name, description, isSubmit, selectedPolicy } = this.state;
    const { errors } = this.validateForm(isSubmit);
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            {this.props.roleId > 0 ? "Edit" : "Add New"} Role
            <button onClick={this.handleCloseModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
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
              {errors.name ? <span className="red">{errors.name}</span> : <></>}
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
                <InputLabel id="demo-multiple-name-label">
                  Select Policy
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  multiple
                  value={selectedPolicy}
                  onChange={this.handleSelectboxChange}
                  input={<OutlinedInput label={"Select Policy"} />}
                  inputProps={{ "aria-label": "Without label" }}
                >
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
                className="primary-outline-btn min-width m-r-2"
                variant="outlined"
                onClick={this.handleCloseModal}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                className="primary-btn min-width"
                variant="contained"
                disabled={
                  this.props.roleCreation?.status === status.IN_PROGRESS
                }
                loading={this.props.roleCreation?.status === status.IN_PROGRESS}
                onClick={this.handleRoleSubmit}
              >
                {this.props.roleId > 0 ? "Edit" : "Create"}
              </LoadingButton>
            </Box>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { roleCreation, allPolicy, roleDetailsById } = state.settings;
  return {
    roleCreation,
    allPolicy,
    roleDetailsById,
  };
};

const mapDispatchToProps = {
  createRole,
  getPolicies,
  getRoleById,
  updateRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoleControlModal);
