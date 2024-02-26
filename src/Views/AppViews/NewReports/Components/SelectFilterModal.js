import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, MenuItem, Select, IconButton,  Checkbox, } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import status from "Redux/Constants/CommonDS";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentUser } from "Utils";
import { v4 } from "uuid";
import Loader from "Components/Loader";
let dropDownData = [
  {
    name: "Select All Regions",
    value: "1",
  },
  {
    name: "eu-east-1",
    value: "2",
  },
  {
    name: "eu-west-2",
    value: "3",
  },
  {
    name: "ap-south-1",
    value: "3",
  },
  {
    name: "ap-south-2",
    value: "3",
  },
];
class SelectFilterModal extends Component {
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
    this.props.handleSelectFilterModal();
  };

  renderPolicies = () => {
    if (dropDownData.length) {
      return dropDownData.map((policy) => (
        <MenuItem value={policy.value} key={v4()}>
          <Checkbox
            className="check-box"
            size="small"
            // onChange={this.handleCheckBox}
          />
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
            Filter
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
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Regions</em>;
                      }
                      let labels = [];
                      dropDownData.forEach((policy) => {
                        if (selected.includes(policy.value)) {
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
                      <em>Select Regions</em>
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
              <Box className="form-group">
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select VPCs</em>;
                      }
                      let labels = [];
                      dropDownData.forEach((policy) => {
                        if (selected.includes(policy.value)) {
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
                      <em>Select VPCs</em>
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
              <Box className="form-group">
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Tagname</em>;
                      }
                      let labels = [];
                      dropDownData.forEach((policy) => {
                        if (selected.includes(policy.value)) {
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
                      <em>Select Tagname</em>
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
              <Box className="form-group">
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Accounts</em>;
                      }
                      let labels = [];
                      dropDownData.forEach((policy) => {
                        if (selected.includes(policy.value)) {
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
                      <em>Select Accounts</em>
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
              <Box className="form-group">
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Products</em>;
                      }
                      let labels = [];
                      dropDownData.forEach((policy) => {
                        if (selected.includes(policy.value)) {
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
                      <em>Select Products</em>
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
              <Box className="form-group">
                <FormControl className="select-policy">
                  <Select
                    labelId="demo-multiple-name-label"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select Regions</em>;
                      }
                      let labels = [];
                      dropDownData.forEach((policy) => {
                        if (selected.includes(policy.value)) {
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
                      <em>Select Regions</em>
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
                  Apply
                </LoadingButton>
              </Box>
            </ModalFooter>
          </form>
        )}
      </Modal>
    );
  }
}

export default SelectFilterModal;
