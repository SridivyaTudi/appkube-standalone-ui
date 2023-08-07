import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Grid, Button, Box, List, ListItem } from "@mui/material";
import AccountStepsPopup from "./AccountStepsPopup";

class StepsStartedPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showAccountStepsPopup: false,
    };
  }

  toggle = () => {
    this.props.toggleStepsStartedPopup();
  };

  toggleAccountStepsPopup = () => {
    this.setState({
      showAccountStepsPopup: !this.state.showAccountStepsPopup,
    });
  };

  render() {
    const { showAccountStepsPopup } = this.state;
    return (
      <>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggle}
          className="steps-started-modal-container"
        >
          <ModalHeader className="m-b-1 border-bottom">
            Steps to getting started
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => {
                this.props.toggleStepsStartedPopup();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </ModalHeader>
          <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
            <List>
              <ListItem>
                <Box className="number-box">1</Box>
                <span>Select your Failover AWS Account</span>
              </ListItem>
              <ListItem>
                <Box className="number-box">2</Box>
                <span>Let’s Connect / Mirror your account</span>
              </ListItem>
              <ListItem>
                <Box className="number-box">3</Box>
                <span>Select AWS resources to mirror</span>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button
              className="primary-btn min-width"
              variant="contained"
              onClick={this.toggleAccountStepsPopup}
            >
              Start
            </Button>
          </ModalFooter>
        </Modal>
        {showAccountStepsPopup ? (
          <AccountStepsPopup
            showModal={showAccountStepsPopup}
            toggleAccountStepsPopup={this.toggleAccountStepsPopup}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default StepsStartedPopup;
