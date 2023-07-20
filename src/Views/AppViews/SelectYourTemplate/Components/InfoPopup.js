import React, { Component } from "react";
import { Box } from "@mui/material/";
import LoadingButton from "@mui/lab/LoadingButton";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import GoImg from "assets/img/assetmanager/go-logo.png";

export class InfoPopup extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container info-modal"
      >
        <ModalHeader style={{ borderBottom: "none" }}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => {
              this.props.handleInfoPopup();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "300px" }}
        >
          <Box className="body0-contant">
            <Box className="Language-logo">
              <img src={GoImg} alt="" />
            </Box>
            <Box className="overview-contant">
              <h5>Overview</h5>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </Box>
            <Box className="overview-contant">
              <h5>Features</h5>
              <List>
                <ListItem>Go 1.15</ListItem>
                <ListItem>MariaDB 10.4</ListItem>
                <ListItem>TLS Certificates</ListItem>
                <ListItem>Git Module-based buils</ListItem>
              </List>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-right" style={{ display: "none" }}>
            <LoadingButton className="secondary-btn m-r-2" variant="contained">
              Cancel
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
            >
              Apply
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default InfoPopup;
