import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import featuredIcon from "assets/img/featured-icon.png";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

class AssociatedAccountPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      link: "",
    };
  }

  onClickCreateNewOu = () => {
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const state = this.state;
    return (
      <>
        <Modal
          isOpen={state.modal}
          toggle={this.toggle}
          className="select-account-modal-container"
        >
          <ModalHeader>
            <IconButton
             variant="outlined"
             aria-label="delete"
             size="small"
             className="close-btn"
              onClick={this.toggle}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </ModalHeader>
          <ModalBody>
            <p className="text-center m-b-0" style={{ marginTop: "-30px" }}>
              <img src={featuredIcon} alt="" />
            </p>
            <h4 className="text-center m-b-0 m-t-2">
              You don't have any associated OU account
            </h4>
            <p className="text-center">
              It seems that we do not currently have any associated OU account
              in our records. if you require further assistance, please reach
              out to our customer support team.
            </p>
          </ModalBody>
          <ModalFooter className="footer-top-bar">
            <div className="d-block text-center">
              <Button className="primary-outline-btn" variant="outlined">
                Contact Support
              </Button>
              <Button
                className="primary-btn"
                onClick={this.onClickCreateNewOu}
                variant="contained"
              >
                Create New OU
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default AssociatedAccountPopup;
