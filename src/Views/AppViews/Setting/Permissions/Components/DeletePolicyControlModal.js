import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
class DeletePolicyControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleDeletePolicyControlModal}
        className="setting-modal-container delete-policy-modal"
      >
        <ModalBody>
          <Box className="delete-policy-content text-center">
            <Box className="delete-icom">
              <i class="fas fa-trash-alt"></i>
            </Box>
            <h5>Do you want to delete this Policy?</h5>
            <p>This action can’t be undone</p>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="danger-btn   m-r-2"
              variant="contained"
              onClick={this.props.handleDeletePolicyControlModal}
            >
              Delete
            </LoadingButton>
            <LoadingButton
              className="secondary-btn "
              variant="contained"
              onClick={this.handleCloseModal}
            >
              Cancel
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeletePolicyControlModal;
