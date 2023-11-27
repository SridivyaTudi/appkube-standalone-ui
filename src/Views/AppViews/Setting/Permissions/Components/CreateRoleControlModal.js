import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, MenuItem, Select } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { createRole } from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";
class CreateRoleControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isSubmit: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.roleCreation.status !== prevProps.roleCreation.status) {
      if (this.props.roleCreation.status === status.SUCCESS) {
        if (this.props.roleCreation.data) {
          ToastMessage.success("Role Created Successfully");
          this.handleCloseModal();
        } else {
          ToastMessage.error("Role Creation Failed!");
        }
      }
    }
  };

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { name, description } = this.state;
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
    }
    return { isValid, errors };
  };

  // Call API create role
  handleCreateRole = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      this.props.createRole({
        version: 1,
        name,
        description,
        grp: false,
      });
    }
  };

  //  Reset state and close modal
  handleCloseModal = () => {
    this.setState({ name: "", description: "", isSubmit: false });
    this.props.handleCreateRoleControlModal();
  };

  render() {
    let { name, description, isSubmit } = this.state;
    const { errors } = this.validateForm(isSubmit);
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            Add New Role
            <button onClick={this.handleCloseModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
        <form onSubmit={this.handleCreateRole}>
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
                  e.key === "Enter" ? this.handleCreateRole(e) : <></>
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
                  //value={age}
                 // onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Select Policy</em>
                  </MenuItem>
                  <MenuItem value={10}>All Access</MenuItem>
                  <MenuItem value={20}>Minimal Access</MenuItem>
                  <MenuItem value={30}>SRE</MenuItem>
                  <MenuItem value={40}>Dev Ops</MenuItem> 
                  <MenuItem value={50}>System Engineer</MenuItem>
                </Select>
              </FormControl>
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
                onClick={this.handleCreateRole}
              >
                Create
              </LoadingButton>
            </Box>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { roleCreation } = state.settings;
  return {
    roleCreation,
  };
};

const mapDispatchToProps = {
  createRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoleControlModal);
