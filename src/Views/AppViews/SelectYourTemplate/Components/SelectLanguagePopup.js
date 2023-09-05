import React, { Component } from "react";
import { Box } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class SelectLanguagePopup extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container select-language-modal"
      >
        <ModalHeader style={{ borderBottom: "none" }}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.handleLanguagePopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "auto",
            maxHeight: "250px",
          }}
        >
          <h4 className="text-left m-b-1 m-t-0 ">Select Language</h4>
          <Box className="checkbox-group">
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="all" />
              <label>All</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="net" />
              <label>.NET</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="search" />
              <label>Search</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="go" />
              <label>GO</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="gttp" />
              <label>HTTP</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="java" />
              <label>Java</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="lisp" />
              <label>LISP</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="node" />
              <label>Nodejs</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="php" />
              <label>PHP</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="python" />
              <label>Python</label>
            </Box>
            <Box className="d-flex align-items-center check-box">
              <input type="checkbox" name="ruby" />
              <label>Ruby</label>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right">
            <LoadingButton
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={() => {
                this.props.handleLanguagePopup();
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
              onClick={() => {
                this.props.handleLanguagePopup();
              }}
            >
              Apply
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SelectLanguagePopup;
