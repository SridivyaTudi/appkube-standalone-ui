import React, { Component } from "react";
import { Box, Grid } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class SelectLanguagePopup extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Select Language
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
          style={{ overflowY: "auto", overflowX: "hidden", height: "300px" }}
        ></ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton className="secondary-btn m-r-2" variant="contained">
              Clear
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
            >
              Add
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SelectLanguagePopup;
