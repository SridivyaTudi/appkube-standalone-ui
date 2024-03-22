import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";

class AddNewModulePopup extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isSubmit: false,
    };
  }

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Validate form input fields
  validateForm = (isSubmit) => {
    const { name } = this.state;
    const errors = {
      name: "",
    };
    let isValid = true;
    if (isSubmit) {
      if (!name) {
        errors.name = "Module name is required!";
        isValid = false;
      } else {
        errors.name = "";
      }
    }
    return { isValid, errors };
  };

  handleAddModuleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      this.props.setModuleName(name);
    }
  };

  //  Reset state and close modal
  handleCloseModal = () => {
    this.setState({
      name: "",

      isSubmit: false,
    });
    this.props.handleCreateModuleModal();
  };

  render() {
    let { name, isSubmit } = this.state;
    const { errors } = this.validateForm(isSubmit);

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            New Module
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

        <form onSubmit={this.handleAddModuleSubmit}>
          <ModalBody>
            <Box className="form-group">
              <label htmlFor="roleName" className="form-label">
                Module Name
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
          </ModalBody>

          <ModalFooter className="footer-top-br">
            <Box className="d-block text-right">
              <LoadingButton
                className="primary-btn min-width  m-r-2"
                variant="contained"
                onClick={this.handleAddModuleSubmit}
              >
                Add
              </LoadingButton>
              <LoadingButton
                className="danger-btn min-width-inherit"
                variant="outlined"
                onClick={this.handleCloseModal}
              >
                Cancel
              </LoadingButton>
            </Box>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default AddNewModulePopup;
