import React, { Component } from "react";
import { ToastMessage } from "../../../../../Toast/ToastMessage";
import config from "../../../config";
import { RestService } from "./../../../Services/RestService";
import { withRouter } from "./withRouter";

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      rolesDetails: this.props.rolesDetails ? this.props.rolesDetails : null,
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
            className={`wizard-step-button ${
              currentStep === i ? "active" : ""
            }`}
            // onClick={(e) => this.onClickStepButton(i)}
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

  validateCreateRoleForm = () => {
    let { name, role, externalId } = this.props.rolesDetails;
    if (!name || name == "") {
      this.props.validateCreateRoleForm({
        name: true,
        role: true,
        externalId: true,
      });
      return false;
    } else if (!role || role == "") {
      this.props.validateCreateRoleForm({
        name: false,
        role: true,
        externalId: true,
      });
      return false;
    } else if (!externalId || externalId == "") {
      this.props.validateCreateRoleForm({
        name: false,
        role: false,
        externalId: true,
      });
      return false;
    } else {
      this.props.validateCreateRoleForm({
        name: false,
        role: false,
        externalId: false,
      });
      return true;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.departmentId) !==
      JSON.stringify(prevState.departmentId)
    ) {
      this.setState({
        departmentId: this.props.departmentId,
      });
      // if (this.state.currentStep == 2) {
      // this.onClickStepButton(this.state.currentStep + 1)
      // }
    }
    if (
      JSON.stringify(prevProps.roleDetails) !==
      JSON.stringify(prevState.roleDetails)
    ) {
      this.setState({ roleDetails: this.props.roleDetails });
    }
    if (this.props.finishPrevious && this.state.currentStep == 3) {
      this.onClickStepButton(this.state.currentStep - 1);
      this.props.previousStep("finishPrevStep");
    }
  }

  createSubmit = () => {
    let postData = {
      displayName: this.props.rolesDetails.name,
      roleArn: this.props.rolesDetails.role || "",
      cloud: "AWS",
      externalId: this.props.rolesDetails.externalId,
      department: {
        id: this.state.departmentId,
      },
    };
    this.setState({ loadingData: true });
    RestService.postData(config.ADD_CLOUD_ENV, postData).then((response) => {
      this.setState({ loadingData: false });
      if (response.status == 500) {
        ToastMessage(response.title, "unsuccess");
        return 1;
      }
      ToastMessage("Successfully new account created", "success");
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
            <button
              onClick={(e) => {
                if (currentStep == 0) {
                  this.props.previousStep();
                } else {
                  this.onClickStepButton(currentStep - 1);
                }
              }}
              className="white-outline previous-button"
            >
              Previous
            </button>
          )}
          {currentStep >= steps.length + 1 && (
            <button className="white-outline previous-button">Previous</button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={(e) => {
                if (this.state.currentStep == 1) {
                  if (this.validateCreateRoleForm()) {
                    this.onClickStepButton(currentStep + 1);
                  }
                } else if (this.state.currentStep == 2) {
                  if (!this.props.departmentId) {
                    ToastMessage(
                      "Please select any Organizational Unit.",
                      "unsuccess"
                    );
                  } else {
                    this.onClickStepButton(currentStep + 1);
                  }
                } else {
                  this.onClickStepButton(currentStep + 1);
                }
              }}
              className="blue-button"
            >
              Next
            </button>
          )}
          {currentStep >= steps.length - 1 && (
            <>
              <button
                onClick={(e) => {
                  this.onClickStepButton(currentStep - 1);
                }}
                className="blue-button previous-button"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (!this.state.loadingData) {
                    this.createSubmit();
                  }
                }}
                className={
                  this.state.loadingData
                    ? "blue-button disabled"
                    : "blue-button"
                }
                disabled={this.state.loadingData ? true : false}
              >
                {this.state.loadingData ? (
                  <i className="fa-solid fa-spinner fa-spin" />
                ) : (
                  ""
                )}
                Finished
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Wizard);
