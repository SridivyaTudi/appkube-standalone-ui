import React, { Component } from "react";
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import lockImg from "../../../../../assets/img/setting/Light.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";

class DisabledAuthenticationModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        className="authDisabled-modal-container"
      >
        <ModalHeader tag="div">
          <Box className="autodisabled-info">
            <Box className="icon">
              <img src={lockImg} alt="" />
            </Box>
          </Box>

          <Box className="heading">
            <span className="d-block">You are about to disable 2FA</span>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Box className="form-group m-b-15">
            <label htmlFor="userName" className="form-label">
              Username
            </label>
            <input
              type="userName"
              className="form-control"
              id="userName"
              name="userName"
            />
          </Box>
          <Box className="form-group m-b-15">
            <label htmlFor="CurrentPassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              name="currentPassword"
              autoComplete="off"
            />
            <span className="input-group-text">
              <i className="fa-sharp fa-regular fa-eye"></i>
            </span>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box className="d-block text-center submit-btn">
            <LoadingButton
              className="primary-btn  width-75"
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DisabledAuthenticationModal;
