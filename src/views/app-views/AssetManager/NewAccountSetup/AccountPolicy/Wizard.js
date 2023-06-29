import React, { Component } from "react";
import { ToastMessage } from "Toast/ToastMessage";
import { withRouter } from "views/app-views/AssetManager/NewAccountSetup/AccountPolicy/withRouter";
import Button from "@mui/material/Button";
import { addCloudEnv } from "redux/assetManager/newAccountSetup/newAccountSetupThunk";
import { connect } from "react-redux";
import status from "redux/constants/commonDS";

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
      prevProps.addCloudEnvState.status !== this.props.addCloudEnvState.status &&
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
    let sendData = {
      cloud: "AWS",
      displayName: formData.displayName,
      roleArn: formData.roleArn,
      externalId: formData.externalId,
      status: "active",
      departmentId: Number(this.props.departmentId),
    };
    this.props.addCloudEnv(sendData);
    // RestService.postData(config.ADD_CLOUD_ENV, sendData).then((response) => {
    //   if (response.status === 500) {
    //     ToastMessage.error(response.title);
    //     return 1;
    //   }
    //   ToastMessage.success("Successfully new account created");
    //   this.props.navigate("/app/environments");
    // });
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
            <Button className="primary-outline-btn" variant="outlined">
              Previous
            </Button>
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
                className="primary-btn previous-button"
              >
                Previous
              </Button>
              <Button
                onClick={this.createSubmit}
                className={
                  this.props.addCloudEnv.status === status.IN_PROGRESS
                    ? "primary-btn disabled"
                    : "primary-btn"
                }
                disabled={
                  this.props.addCloudEnv.status === status.IN_PROGRESS
                    ? true
                    : false
                }
              >
                {this.props.addCloudEnv.status === status.IN_PROGRESS ? (
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

const mapStateToProps = (state) => {
  const { newAccountSetup } = state;
  return newAccountSetup;
};

const mapDispatchToProps = {
  addCloudEnv,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wizard));
