import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

class ConfirmationPopup extends Component {
  constructor(props) {
    super(props);
  }

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
    const {
      showLoader,
      showModal,
      labels,
    } = this.props;
    return (
      <Modal
        isOpen={showModal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader className="m-b-1 border-bottom">
          Confirmation
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.togglePopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }}
        >
          <h4 className="text-left m-b-1 m-t-0 ">{labels?.description}</h4>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={this.onClickNo}
            >
              {labels?.btnNo}
            </LoadingButton>

            <LoadingButton
              disabled={showLoader}
              loading={showLoader}
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
              onClick={this.onClickYes}
            >
              {labels?.btnYes}
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmationPopup;
