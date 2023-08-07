import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class CreateUserControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCreateUserControlModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            Add New User
            <button onClick={this.props.handleCreateUserControlModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Box className="form-group">
            <label htmlFor="roleName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="roleName"
              name="roleName"
              placeholder="Director"
            />
          </Box>
          <Box className="form-group">
            <label htmlFor="roleDescription" className="form-label">
              User Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="roleDescription"
              name="roleDescription"
              style={{
                height: "120px",
                lineHeight: "18px",
                paddingRight: "15px",
              }}
              placeholder="director is a senior executive responsible for overseeing the strategic department."
            />
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right">
            <LoadingButton
              className="primary-outline-btn min-width m-r-2"
              variant="outlined"
              onClick={this.props.handleCreateUserControlModal}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              variant="contained"
              onClick={this.props.handleCreateUserControlModal}
            >
              Create
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateUserControlModal;
