import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, FormControlLabel } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export class ChangePasswordModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container change-password-modal"
      >
        <ModalHeader style={{ borderBottom: "none" }} tag="div">
          <h5>Change Password</h5>
          <p>
            Password Must Contain at least 1 letter, 1 number, and 1 symbol.
            Minimum length is 12 characters.
          </p>
        </ModalHeader>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
              onClick={() => {
                this.props.handleChangePasswordModal();
              }}
            >
              Submit New Password
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ChangePasswordModal;
