import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Grid, Button, Box, List, ListItem } from "@mui/material";

class AccountStepsPopup extends Component {
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
    STEP4: 3,
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeStep: this.steps.STEP1,
    };
  }

  toggle = () => {
    this.props.toggleAccountStepsPopup();
  };

  setActiveStep = (e, newStep) => {
    e.preventDefault();
    this.setState({
      activeStep: newStep,
    });
  };

  render() {
    const { activeStep } = this.state;
    return (
      <>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggle}
          className="account-steps-modal-container"
        >
          <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
            {activeStep === this.steps.STEP1 && (
              <>
                <List className="steps">
                  <ListItem
                    className={activeStep === this.steps.STEP2 ? "active" : ""}
                  >
                    <span></span>
                    <p>Select your Failover AWS Account</p>
                  </ListItem>
                  <ListItem>
                    <span></span>
                    <p>Let’s Connect / Mirror your account</p>
                  </ListItem>
                  <ListItem>
                    <span></span>
                    <p>Select AWS resources to mirror</p>
                  </ListItem>
                </List>
                <div className="contents">
                  <p className="text-center">
                    Selected AWS Account & region details will displayed
                  </p>
                  <p className="text-center">
                    Where Do you want to failover your application?
                  </p>
                </div>
                <div className="account-form">
                  <Box className="form-group">
                    <label>Select AWS Account</label>
                    <input className="form-control" type="text" name="awsAccount" />
                  </Box>
                  <Box className="form-group">
                    <label>Select Region</label>
                    <input className="form-control" type="text" name="region" />
                  </Box>
                </div>
                <div className="text-center d-block">
                  <Button
                    className="primary-btn"
                    variant="contained"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP2, true)
                    }
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {activeStep === this.steps.STEP2 && (
              <>
                <List className="steps">
                  <ListItem
                    className={activeStep === this.steps.STEP2 ? "active" : ""}
                  >
                    <span></span>
                    <p>Select your Failover AWS Account</p>
                  </ListItem>
                  <ListItem
                    className={
                      activeStep === this.steps.STEP2 ? "active-25" : ""
                    }
                  >
                    <span></span>
                    <p>Let’s Connect / Mirror your account</p>
                  </ListItem>
                  <ListItem>
                    <span></span>
                    <p>Select AWS resources to mirror</p>
                  </ListItem>
                </List>
                <div className="contents">
                  <p className="text-center">
                    Account permission access using cloud formation template
                  </p>
                </div>
                <div className="account-form">
                  <Box className="d-flex align-items-center form-group-checkbox">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      name="PrimaryAccount"
                      defaultChecked="check"
                    />
                    <label for="PrimaryAccount">Primary Account: 1234</label>
                  </Box>
                  <Box className="d-flex align-items-center form-group-checkbox">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      name="FailoverAccount"
                      defaultChecked="check"
                    />
                    <label for="FailoverAccount">Failover Account: 7890</label>
                  </Box>
                </div>
                <div className="text-center d-block">
                  <Button
                    className="primary-outline-btn m-r-2"
                    variant="outlined"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP1, true)
                    }
                  >
                    Back
                  </Button>
                  <Button
                    className="primary-btn"
                    variant="contained"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP3, true)
                    }
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {activeStep === this.steps.STEP3 && (
              <>
                <List className="steps">
                  <ListItem
                    className={activeStep === this.steps.STEP3 ? "active" : ""}
                  >
                    <span></span>
                    <p>Select your Failover AWS Account</p>
                  </ListItem>
                  <ListItem
                    className={
                      activeStep === this.steps.STEP2
                        ? "active"
                        : "" || activeStep === this.steps.STEP3
                        ? "active-auto"
                        : ""
                    }
                  >
                    <span></span>
                    <p>Let’s Connect / Mirror your account</p>
                  </ListItem>
                  <ListItem>
                    <span></span>
                    <p>Select AWS resources to mirror</p>
                  </ListItem>
                </List>
                <div className="contents">
                  <p className="text-center">
                    Account permission access using cloud formation template
                  </p>
                </div>
                <div className="account-form">
                  <Box className="form-group">
                    <label>Select AWS Account</label>
                    <input className="form-control" type="text" name="awsAccount" />
                  </Box>
                  <Box className="form-group">
                    <label>Select Region</label>
                    <input className="form-control" type="text" name="region" />
                  </Box>
                  <Box className="form-group">
                    <label>Select specific resources</label>
                    <ul>
                      <li>
                        <Box className="d-flex align-items-center checkbox">
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            name="WebLayer"
                          />
                          <label for="WebLayer">Web Layer</label>
                        </Box>
                      </li>
                      <li>
                        <Box className="d-flex align-items-center checkbox">
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            name="WebLayer"
                          />
                          <label for="WebLayer">App Layer</label>
                        </Box>
                      </li>
                      <li>
                        <Box className="d-flex align-items-center checkbox">
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            name="DataLayer"
                          />
                          <label for="DataLayer">Data Layer</label>
                        </Box>
                      </li>
                    </ul>
                  </Box>
                </div>
                <div className="text-center d-block">
                  <Button
                    className="primary-outline-btn m-r-2"
                    variant="outlined"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP2, true)
                    }
                  >
                    Back
                  </Button>
                  <Button
                    className="primary-btn"
                    variant="contained"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP4, true)
                    }
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {activeStep === this.steps.STEP4 && (
              <>
                <List className="steps">
                  <ListItem className="active">
                    <span></span>
                    <p>Select your Failover AWS Account</p>
                  </ListItem>
                  <ListItem className="active">
                    <span></span>
                    <p>Let’s Connect / Mirror your account</p>
                  </ListItem>
                  <ListItem className="active">
                    <span></span>
                    <p>Select AWS resources to mirror</p>
                  </ListItem>
                </List>
                <div className="account-form">
                  <Box className="form-group">
                    <label>Define your application</label>
                    <input className="form-control" type="text" name="awsAccount" />
                  </Box>
                  <Box className="form-group">
                    <label>Select resources by tag</label>
                    <input className="form-control" type="text" name="region" />
                  </Box>
                  <Box className="form-group">
                    <label>Select specific resources</label>
                    <ul>
                      <li>
                        <Box className="d-flex align-items-center checkbox">
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            name="WebLayer"
                          />
                          <label for="WebLayer">Web Layer</label>
                        </Box>
                      </li>
                      <li>
                        <Box className="d-flex align-items-center checkbox">
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            name="WebLayer"
                          />
                          <label for="WebLayer">App Layer</label>
                        </Box>
                      </li>
                      <li>
                        <Box className="d-flex align-items-center checkbox">
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            name="DataLayer"
                          />
                          <label for="DataLayer">Data Layer</label>
                        </Box>
                      </li>
                    </ul>
                  </Box>
                </div>
                <div className="text-center d-block">
                  <Button
                    className="primary-outline-btn m-r-2"
                    variant="outlined"
                    onClick={(e) =>
                      this.setActiveStep(e, this.steps.STEP3, true)
                    }
                  >
                    Back
                  </Button>
                  <Button
                    className="primary-btn"
                    variant="contained"
                    onClick={this.props.toggleAccountStepsPopup}
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default AccountStepsPopup;
