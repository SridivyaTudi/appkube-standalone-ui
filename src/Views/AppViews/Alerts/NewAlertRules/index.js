import React, { Component } from "react";
import { Box } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class NewAlertRules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
        };
      }

      onClickStepButton = (activeStep: any) => {
        this.setState({
          currentStep: activeStep,
        });
        this.props.nextClick(activeStep);
      };
    
      setActiveStep = (step: any) => {
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
                onClick={(e) => this.onClickStepButton(i)}
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
  render() {
    const { currentStep } = this.state;
    const { steps, isDisabled } = this.props;
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Alerts Rule builder</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts`)}
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(`${APP_PREFIX_PATH}alert-rules`)
                }
              >
                Alerts Rules
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">New Alert Rules</li>
            </ul>
          </Box>
        </Box>
        <Box className="wizard-container">
          <Box className="wizard-step-line-container">
          {this.createStepLine()}
          </Box>
          <Box className="wizard-step-component-container">
            {this.createStepContainer()}
            <Box className="d-block text-right next">
              <button
                onClick={(e) => this.onClickStepButton(currentStep - 1)}
                className="asset-blue-button m-b-0"
                disabled={currentStep == 0}
              >
                Previous
              </button>
              {/* {currentStep >= steps.length + 1 && (
              <button className="blue-button m-b-0">Previous</button>
            )} */}
              {currentStep < steps.length - 1 && (
                <button
                  onClick={(e) => this.onClickStepButton(currentStep + 1)}
                  className="asset-blue-button m-r-0 m-b-0"
                >
                  Next
                </button>
              )}
              {currentStep >= steps.length - 1 && (
                <button
                  disabled={isDisabled ? true : false}
                  onClick={this.props.submitPage}
                  className={
                    isDisabled
                      ? "asset-blue-button asset-disabled m-r-0 m-b-0 "
                      : "asset-blue-button m-r-0 m-b-0"
                  }
                >
                  Submit
                </button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default NewAlertRules;
