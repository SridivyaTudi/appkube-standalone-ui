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
        className="setting-modal-container"
      >
        <ModalHeader tag="div">
          <h5>Change Password</h5>
          <p>
            Password Must Contain at least 1 letter, 1 number, and 1 symbol.
            Minimum length is 12 characters.
          </p>
        </ModalHeader>
        <ModalBody>
          <Box className="form-group">
            <label for="CurrentPassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              className="form-control"
              id="CurrentPassword"
              value={"CurrentPassword"}
            />
            <span className="input-group-text">
              <i className="fa-regular fa-eye-slash"></i>
            </span>
          </Box>
          <Box className="form-group">
            <label for="NewPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="NewPassword"
              value={"NewPassword"}
            />
            <span className="input-group-text rotate">
              <i class="fa-solid fa-arrows-rotate"></i>
            </span>
            <span className="input-group-text">
              <i className="fa-regular fa-eye-slash"></i>
            </span>
          </Box>
          <Box className="form-group">
            <label for="Confirm Password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="ConfirmPassword"
              value={"ConfirmPassword"}
            />
            <span className="input-group-text">
              <i className="fa-regular fa-eye-slash"></i>
            </span>
          </Box>
          <Box className="password-strength-group m-b-10">
            <span className="good"></span>
            <span className="good"></span>
            <span className="strong"></span>
            <span></span>
          </Box>
          <p className="strength-text">
            We Strongly suggest that you create strong password
          </p>
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
