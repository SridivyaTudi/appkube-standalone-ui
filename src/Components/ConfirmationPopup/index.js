import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

class ConfirmationPopup extends Component {
  toggle = () => {
    this.props.togglePopup();
  };

  onClickYes = () => {
    this.props.handleCallBack();
  };

  onClickNo = () => {
    this.props.togglePopup();
  };

  render() {
    const { showLoader, showModal, labels, icon } = this.props;
    return (
      <Modal
        isOpen={showModal}
        toggle={this.toggle}
        className="setting-modal-container delete-policy-modal"
      >
        <ModalBody>
          <Box className="delete-policy-content text-center">
            <Box className="delete-icon">{icon}</Box>
            <h5>{labels?.header}</h5>
            <p> {labels?.description}</p>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="danger-btn   m-r-2"
              variant="contained"
              disabled={showLoader}
              loading={showLoader}
              onClick={this.onClickYes}
            >
              {labels?.btnYes}
            </LoadingButton>
            <LoadingButton
              className="secondary-btn "
              variant="contained"
              onClick={this.onClickNo}
              disabled={showLoader}
            >
              {labels?.btnNo}
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmationPopup;
