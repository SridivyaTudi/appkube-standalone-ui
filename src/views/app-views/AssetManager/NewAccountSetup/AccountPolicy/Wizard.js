import React, { Component } from "react";
import { ToastMessage } from "../../../../../Toast/ToastMessage";
import config from "../../../config";
import { RestService } from "./../../../Services/RestService";
import { withRouter } from "./withRouter";
import Button from '@mui/material/Button';

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      departmentId: false,
      redirectToEnviroment: false,
      loadingData: false,
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
            className={`wizard-step-button ${currentStep === i ? "active" : ""
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
            className={`wizard-step-component ${currentStep === i ? "" : "d-none"
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
      JSON.stringify(prevProps.departmentId) !==
      JSON.stringify(prevState.departmentId)
    ) {
      this.setState({
        departmentId: this.props.departmentId,
      });
    }
    if (
      JSON.stringify(prevProps.roleDetails) !==
      JSON.stringify(prevState.roleDetails)
    ) {
      this.setState({ roleDetails: this.props.roleDetails });
    }
    if (this.props.finishPrevious && this.state.currentStep === 3) {
      this.onClickStepButton(this.state.currentStep - 1);
      this.props.previousStep("finishPrevStep");
    }
  }

  createSubmit = () => {
    const { formData } = this.props;
    let sendData = {
      cloud: "AWS",
      displayName: formData.displayName,
      roleArn: formData.roleArn,
      externalId: formData.externalId,
      status: "active",
      departmentId: Number(this.props.departmentId),
    };
    this.setState({ loadingData: true });
    RestService.postData(config.ADD_CLOUD_ENV, sendData).then((response) => {
      this.setState({ loadingData: false });
      if (response.status == 500) {
        ToastMessage.error(response.title);
        return 1;
      }
      ToastMessage.success("Successfully new account created");
      this.props.navigate("/app/environments");
    });
  };

  render() {
    const { currentStep } = this.state;
    const { steps } = this.props;
    return (
      <>
        <div className="new-account-tab-container">
          <div className="wizard-tab-line-container">
            {this.createStepLine()}
          </div>
          <div className="wizard-step-component-container">
            {this.createStepContainer()}
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center wizard-step-button">
          {currentStep < steps.length - 1 && (
            <Button
              className="primary-outline-btn"
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
            <Button className="primary-outline-btn" variant="outlined">Previous</Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              className="primary-btn"
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
                    ToastMessage.error("Please select any Organizational Unit.");
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
                className="primary-btn previous-button"
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (!this.state.loadingData) {
                    this.createSubmit();
                  }
                }}
                className={
                  this.state.loadingData
                    ? "primary-btn disabled"
                    : "primary-btn"
                }
                disabled={this.state.loadingData ? true : false}
              >
                {this.state.loadingData ? (
                  <i className="fa-solid fa-spinner fa-spin" />
                ) : (
                  ""
                )}
                Finished
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Wizard);
