import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { createGroup } from "Redux/Settings/SettingsThunk";
import { ToastMessage } from "Toast/ToastMessage";

class CreateGroupControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isSubmit: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.groupCreation.status !== prevProps.groupCreation.status) {
      if (this.props.groupCreation.status === status.SUCCESS) {
        if (this.props.groupCreation.data) {
          ToastMessage.success("Group Created Successfully");
          this.handleCloseModal();
        } else {
          ToastMessage.error("Group Creation Failed!");
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
        errors.name = "Group Name is required!";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!description) {
        errors.description = "Group Description is required!";
        isValid = false;
      } else {
        errors.description = "";
      }
    }
    return { isValid, errors };
  };

  // Call API create group
  handleCreateGroup = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    this.setState({ isSubmit: true });
    const { isValid } = this.validateForm(true);

    if (isValid) {
      this.props.createGroup({
        version: 1,
        name,
        description,
        grp: true,
      });
    }
  };

  //  Reset state and close modal
  handleCloseModal = () => {
    this.setState({ name: "", description: "", isSubmit: false });
    this.props.handleCreateGroupControlModal();
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
            Add New Group
            <button onClick={this.handleCloseModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
        <form onSubmit={this.handleCreateGroup}>
          <ModalBody>
            <Box className="form-group">
              <label htmlFor="name" className="form-label">
                Group Name
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
              <label htmlFor="description" className="form-label">
                Group Description
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
                  e.key === "Enter" ? this.handleCreateGroup(e) : <></>
                }
              />
              {errors.description ? (
                <span className="red">{errors.description}</span>
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
                  this.props.groupCreation?.status === status.IN_PROGRESS
                }
                loading={
                  this.props.groupCreation?.status === status.IN_PROGRESS
                }
                onClick={this.handleCreateGroup}
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
  const { groupCreation } = state.settings;
  return {
    groupCreation,
  };
};

const mapDispatchToProps = {
  createGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroupControlModal);
