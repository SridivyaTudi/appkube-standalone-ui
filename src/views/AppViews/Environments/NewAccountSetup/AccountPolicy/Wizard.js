import React, { Component } from "react";
import { ToastMessage } from "Toast/ToastMessage";
import { withRouter } from "views/AppViews/Environments/NewAccountSetup/AccountPolicy/withRouter";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { addCloudEnv } from "Redux/NewAccountSetup/NewAccountSetupThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Box from "@mui/material/Box";
class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      departmentId: false,
      redirectToEnviroment: false,
    };
  }

  onClickStepButton = (activeStep) => {
    this.setState({
      currentStep: activeStep,
    });
  };

  setActiveStep = (step) => {
    this.setState({
      currentStep: step,
    });
  };

  createStepLine = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-button ${
              currentStep === i ? "active" : ""
            }`}
          >
            {step.name}
          </div>
        );
      }
    }
    return retData;
  };

  createStepContainer = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-component ${
              currentStep === i ? "" : "d-none"
            }`}
          >
            {step.component()}
          </div>
        );
      }
    }
    return retData;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.addCloudEnvState.status !==
        this.props.addCloudEnvState.status &&
      this.props.addCloudEnvState.status === status.SUCCESS
    ) {
      ToastMessage.success("Successfully new account created");
      this.props.navigate("/app/environments");
    }
    if (this.props.finishPrevious && this.state.currentStep === 3) {
      this.onClickStepButton(this.state.currentStep - 1);
      this.props.previousStep("finishPrevStep");
    }
  }

  createSubmit = () => {
    const { formData } = this.props;
    let accountId = formData.roleArn
      .match(/arn:aws:iam::([0-9]+(:user)+)\/[A-Za-z0-9]+/i)[1]
      .replace(":user", "");
    let sendData = {
      cloud: "AWS",
      displayName: formData.displayName,
      roleArn: formData.roleArn,
      externalId: formData.externalId,
      status: "active",
      accountId: accountId,
      departmentId: Number(this.props.departmentId),
    };
    this.props.addCloudEnv(sendData);
  };

  render() {
    const { currentStep } = this.state;
    const { steps } = this.props;
    return (
      <>
        <Box className="new-account-tab-container">
          <Box className="wizard-tab-line-container">
            {this.createStepLine()}
          </Box>
          <Box className="wizard-step-component-container">
            {this.createStepContainer()}
          </Box>
        </Box>
        <Box className="d-flex justify-content-end align-items-center wizard-step-button">
          {currentStep < steps.length - 1 && (
            <Button
              className="primary-outline-btn m-r-2"
              onClick={(e) => {
                if (currentStep === 0) {
                  this.props.previousStep();
                } else {
                  this.onClickStepButton(currentStep - 1);
                }
              }}
              variant="outlined"
            >
              Previous
            </Button>
          )}
          {currentStep >= steps.length + 1 && (
            <Button className="primary-outline-btn m-r-2" variant="outlined">
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              className="primary-btn m-r-2"
              onClick={() => {
                if (this.state.currentStep === 1) {
                  this.props.setIsSubmit(true);
                  this.setState({ isSubmit: true }, () => {
                    if (this.state.isSubmit) {
                      let { isValid } = this.props.validateCreateRoleForm();
                      if (isValid) {
                        this.onClickStepButton(currentStep + 1);
                      }
                    }
                  });
                } else if (this.state.currentStep === 2) {
                  if (!this.props.departmentId) {
                    ToastMessage.error(
                      "Please select any Organizational Unit."
                    );
                  } else {
                    this.onClickStepButton(currentStep + 1);
                  }
                } else {
                  this.onClickStepButton(currentStep + 1);
                }
              }}
              variant="contained"
            >
              Next
            </Button>
          )}
          {currentStep >= steps.length - 1 && (
            <>
              <Button
                onClick={(e) => {
                  this.onClickStepButton(currentStep - 1);
                }}
                className="primary-outline-btn m-r-2"
                variant="outlined"
              >
                Previous
              </Button>
              <LoadingButton
                onClick={this.createSubmit}
                disabled={
                  this.props.addCloudEnvState.status === status.IN_PROGRESS
                    ? true
                    : false
                }
                loading={
                  this.props.addCloudEnvState.status === status.IN_PROGRESS
                    ? true
                    : false
                }
                loadingPosition="start"
                className="primary-btn"
                variant="contained"
              >
                Finished
              </LoadingButton>
            </>
          )}
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { newAccountSetup } = state;
  return newAccountSetup;
};

const mapDispatchToProps = {
  addCloudEnv,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wizard));
