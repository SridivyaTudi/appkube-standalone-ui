import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SuccessfullyIcon from "assets/img/assetmanager/successfully-icon.png";

export class ApplicationSuccessfullyPopup extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container appliction-successfully-modal"
      >
        <ModalHeader style={{ borderBottom: "none" }}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.handleApplictionPopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          className="appliction-contant"
          style={{ overflowY: "auto", overflowX: "hidden", height: "200px" }}
        >
          <Box className="body-contant">
            <Box className="successfully-logo text-center ">
              <img src={SuccessfullyIcon} alt="" />
            </Box>
            <h3 className="m-t-3">
              Your Application has been successfully created
            </h3>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton className="secondary-btn m-r-2" variant="contained">
              Back to Dashboard
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
            >
              Open in browser
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ApplicationSuccessfullyPopup;
