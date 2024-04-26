import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, MenuItem, Select, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import {
  getCurrentRole,
  getRoleList,
  setAllowedRbacPermissions,
  setCurrentRole,
} from "Utils";

class RbacPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      roleList: [],
      selectedRole: "",
    };
  }
  role = getCurrentRole();
  componentDidMount = () => {
    let roleList = getRoleList();

    this.setState({
      roleList,
      selectedRole: this.role?.id || roleList?.[0]?.id,
    });
  };

  handleSelectboxChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ selectedRole: value });
  };

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { selectedRole } = this.state;
    const errors = {
      role: "",
    };
    let isValid = true;

    if (isSubmit) {
      if (!selectedRole) {
        errors.role = "Role is required!";
        isValid = false;
      } else {
        errors.role = "";
      }
    }
    return { isValid, errors };
  };

  handleRoleSubmit = (e) => {
    e.preventDefault();
    let { selectedRole, roleList } = this.state;
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      if (this.role?.id !== selectedRole) {
        setAllowedRbacPermissions(selectedRole);
        let currentRole = roleList.find((role) => role.id === selectedRole);
        setCurrentRole(currentRole);
        window.location.reload();
      }

      this.handleCloseModal();
     
    }
  };

  renderRoles = () => {
    let { roleList } = this.state;
    if (roleList.length) {
      return roleList.map((role) => (
        <MenuItem value={role.id} key={v4()}>
          {role.name}
        </MenuItem>
      ));
    }
  };

  handleCloseModal = () => {
    this.props.handleRbacModal();
  };
  render() {
    let { isSubmit, selectedRole } = this.state;
    const { errors } = this.validateForm(isSubmit);

    return (
      <Modal
        isOpen={this.props.showModal}
        // toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            Update the Role
            {this.role?.id > 0 ? (
              <IconButton
                onClick={this.handleCloseModal}
                variant="outlined"
                aria-label="delete"
                size="small"
                className="close-btn"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <></>
            )}
          </h5>
        </ModalHeader>

        <form onSubmit={this.handleRoleSubmit}>
          <ModalBody>
            <Box className="form-group">
              <label htmlFor="roleDescription" className="form-label">
                Role
              </label>
              <FormControl className="select-policy">
                <Select
                  labelId="demo-multiple-name-label"
                  displayEmpty
                  value={selectedRole}
                  onChange={this.handleSelectboxChange}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Select Role</em>
                  </MenuItem>
                  {this.renderRoles()}
                </Select>
              </FormControl>
              {errors.role ? <span className="red">{errors.role}</span> : <></>}
            </Box>
          </ModalBody>

          <ModalFooter className="footer-top-br">
            <Box className="d-block text-right">
              {this.role?.id > 0 ? (
                <LoadingButton
                  className="danger-btn min-width-inherit m-r-2"
                  variant="outlined"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </LoadingButton>
              ) : (
                <></>
              )}

              <LoadingButton
                className="primary-btn min-width"
                variant="contained"
                onClick={this.handleRoleSubmit}
              >
                Update
              </LoadingButton>
            </Box>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default RbacPopup;
